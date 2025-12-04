export default async function handler(req, res) {
  const BASE_URL = "https://e-commarce-website-eight.vercel.app/api/v1";

  // remove "/api" from the beginning of req.url
  const path = req.url.replace(/^\/api/, "");

  const targetURL = BASE_URL + path;

  try {
    const response = await fetch(targetURL, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...req.headers,
        host: "",
      },
      body: req.method !== "GET" ? req.body : undefined,
    });

    const text = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    res.status(response.status).send(text);
  } catch (error) {
    res.status(500).json({
      error: "Proxy failed",
      detail: error.message,
    });
  }
}
