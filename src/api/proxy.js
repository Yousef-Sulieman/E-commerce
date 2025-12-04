// /api/proxy.js
export default async function handler(req, res) {
  const { method } = req;

  // API BASE URL اللي انت بتكلّم منه
  const targetUrl =
    "https://e-commarce-website-eight.vercel.app" +
    req.url.replace("/api/proxy", "");

  // Copy headers
  const requestHeaders = { ...req.headers };
  delete requestHeaders.host;

  try {
    const response = await fetch(targetUrl, {
      method,
      headers: requestHeaders,
      body: method === "GET" ? null : JSON.stringify(req.body),
    });

    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return res.status(response.status).send(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Proxy error", error: err });
  }
}
