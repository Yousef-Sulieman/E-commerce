// export default async function handler(req, res) {
//   const backendURL = "https://e-commarce-website-eight.vercel.app";

//   const url = backendURL + req.url.replace("/api/proxy", "/api/v1");

//   try {
//     const response = await fetch(url, {
//       method: req.method,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: req.headers.authorization || "",
//       },
//       body: req.method !== "GET" ? req.body : undefined,
//     });

//     const data = await response.text();
//     res.status(response.status).send(data);
//   } catch (err) {
//     res.status(500).json({ error: "Proxy failed", details: err.message });
//   }
// }
