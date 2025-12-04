export default async function handler(req, res) {
  const BASE_URL = "https://e-commarce-website-eight.vercel.app/api/v1";

  const path = req.url.replace("/api", "");
  const targetURL = BASE_URL + path;

  try {
    const response = await fetch(targetURL, {
      method: req.method,
      headers: {
        "Content-Type": req.headers["content-type"] || "application/json",
        Authorization: req.headers.authorization || "",
      },
      body: req.method !== "GET" ? req.body : undefined,
    });

    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "*");

    return res.status(response.status).send(data);
  } catch (err) {
    return res.status(500).json({ error: "Proxy Failed", detail: err.message });
  }
}
