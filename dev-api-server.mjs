// Local-only test server for the Dropbox upload function.
// NOT part of the deployed site — just lets us test /api locally.
import express from "express";
import cors from "cors";
import "dotenv/config";

// Import your real serverless function.
const mod = await import("./api/upload-media-kit.js");
const handler = mod.default;

const app = express();
app.use(cors());

// Route /api/upload-media-kit to the function, mimicking Vercel.
app.all("/api/upload-media-kit", (req, res) => handler(req, res));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Local API server running at http://localhost:${PORT}`);
});