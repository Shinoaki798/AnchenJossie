export async function onRequest(context) {
  return new Response(JSON.stringify({ message: "Test successful" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
