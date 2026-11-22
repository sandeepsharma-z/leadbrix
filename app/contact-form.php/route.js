export async function POST(request) {
  return Response.redirect(new URL("/thank-you.php", request.url), 303);
}
