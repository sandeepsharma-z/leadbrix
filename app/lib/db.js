import "server-only";

import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

const globalDatabase = globalThis;

function databaseConfig() {
  const required = ["DB_HOST", "DB_NAME", "DB_USER", "DB_PASSWORD"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) throw new Error(`Missing database configuration: ${missing.join(", ")}`);

  return {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 8,
    queueLimit: 0,
    charset: "utf8mb4",
    timezone: "+00:00",
  };
}

export function getPool() {
  if (!globalDatabase.__leadbrixPool) {
    globalDatabase.__leadbrixPool = mysql.createPool(databaseConfig());
  }
  return globalDatabase.__leadbrixPool;
}

async function initializeSchema() {
  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(190) NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(40) NOT NULL DEFAULT 'admin',
      last_login_at DATETIME NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY admin_users_email_unique (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(190) NOT NULL,
      phone VARCHAR(40) NULL,
      service VARCHAR(120) NOT NULL,
      message TEXT NOT NULL,
      status ENUM('new','contacted','closed') NOT NULL DEFAULT 'new',
      source VARCHAR(80) NOT NULL DEFAULT 'contact-page',
      ip_address VARCHAR(64) NULL,
      user_agent VARCHAR(500) NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY enquiries_status_created_idx (status, created_at),
      KEY enquiries_email_idx (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  const [users] = await pool.query("SELECT id FROM admin_users LIMIT 1");
  if (!users.length && process.env.ADMIN_BOOTSTRAP_EMAIL && process.env.ADMIN_BOOTSTRAP_PASSWORD) {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_BOOTSTRAP_PASSWORD, 12);
    await pool.execute(
      "INSERT INTO admin_users (name, email, password_hash, role) VALUES (?, ?, ?, 'admin')",
      [process.env.ADMIN_BOOTSTRAP_NAME || "LeadBrix Admin", process.env.ADMIN_BOOTSTRAP_EMAIL.toLowerCase(), passwordHash]
    );
  }
}

export async function ensureSchema() {
  if (!globalDatabase.__leadbrixSchemaPromise) {
    globalDatabase.__leadbrixSchemaPromise = initializeSchema().catch((error) => {
      globalDatabase.__leadbrixSchemaPromise = null;
      throw error;
    });
  }
  return globalDatabase.__leadbrixSchemaPromise;
}

export async function findAdminByEmail(email) {
  await ensureSchema();
  const [rows] = await getPool().execute(
    "SELECT id, name, email, password_hash, role FROM admin_users WHERE email = ? LIMIT 1",
    [email.toLowerCase()]
  );
  return rows[0] || null;
}

export async function findAdminById(id) {
  await ensureSchema();
  const [rows] = await getPool().execute(
    "SELECT id, name, email, role, last_login_at FROM admin_users WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] || null;
}

export async function recordAdminLogin(id) {
  await ensureSchema();
  await getPool().execute("UPDATE admin_users SET last_login_at = UTC_TIMESTAMP() WHERE id = ?", [id]);
}

export async function createEnquiry(data) {
  await ensureSchema();
  const [result] = await getPool().execute(
    `INSERT INTO enquiries (name, email, phone, service, message, source, ip_address, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [data.name, data.email, data.phone || null, data.service, data.message, data.source || "contact-page", data.ipAddress || null, data.userAgent || null]
  );
  return result.insertId;
}

export async function listEnquiries(limit = 250) {
  await ensureSchema();
  const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 500);
  const [rows] = await getPool().query(
    `SELECT id, name, email, phone, service, message, status, source, created_at, updated_at
     FROM enquiries ORDER BY created_at DESC LIMIT ${safeLimit}`
  );
  return rows.map((row) => ({
    ...row,
    id: String(row.id),
    created_at: new Date(row.created_at).toISOString(),
    updated_at: new Date(row.updated_at).toISOString(),
  }));
}

export async function updateEnquiryStatus(id, status) {
  await ensureSchema();
  const [result] = await getPool().execute(
    "UPDATE enquiries SET status = ? WHERE id = ?",
    [status, id]
  );
  return result.affectedRows === 1;
}

