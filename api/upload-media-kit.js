// =============================================================
// SERVERLESS FUNCTION — Dropbox media-kit upload
// Runs on Vercel's server (NOT the browser). Receives a file
// from the form, uploads it to Dropbox, returns a shareable link.
// The Dropbox token stays server-side via process.env.
// =============================================================

import { Dropbox } from "dropbox";
import formidable from "formidable";
import fs from "fs";

// Tell Vercel NOT to auto-parse the body — we need the raw file,
// which formidable will handle instead.
export const config = {
  api: {
    bodyParser: false,
  },
};

// Basic safety limits.
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_EXT = /\.(pdf|png|jpe?g|webp|zip|pptx)$/i;

export default async function handler(req, res) {
  // Only allow POST (the form sends a POST request).
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (
    !process.env.DROPBOX_APP_KEY ||
    !process.env.DROPBOX_APP_SECRET ||
    !process.env.DROPBOX_REFRESH_TOKEN
  ) {
    return res.status(500).json({ error: "Server not configured." });
  }

  try {
    // 1) Parse the incoming file from the form.
    const form = formidable({ maxFileSize: MAX_BYTES, keepExtensions: true });
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const uploaded = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!uploaded) {
      return res.status(400).json({ error: "No file received." });
    }

    // 2) Validate extension.
    const originalName = uploaded.originalFilename || "media-kit";
    if (!ALLOWED_EXT.test(originalName)) {
      return res.status(400).json({ error: "File type not allowed." });
    }

    // 3) Build a safe, unique filename (so uploads don't overwrite).
    const applicant = (fields.applicant || "applicant")
      .toString()
      .replace(/[^a-z0-9]+/gi, "-")
      .slice(0, 40);
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const safeName = `/${applicant}_${stamp}_${originalName}`.replace(/\s+/g, "_");

    // 4) Read the temp file and upload to Dropbox.
    const contents = fs.readFileSync(uploaded.filepath);
    const dbx = new Dropbox({
      clientId: process.env.DROPBOX_APP_KEY,
      clientSecret: process.env.DROPBOX_APP_SECRET,
      refreshToken: process.env.DROPBOX_REFRESH_TOKEN,
    });

    await dbx.filesUpload({
      path: safeName,
      contents,
      mode: { ".tag": "add" },
      autorename: true,
    });

    // 5) Create a shareable link to the uploaded file.
    let link = "";
    try {
      const shared = await dbx.sharingCreateSharedLinkWithSettings({
        path: safeName,
      });
      link = shared.result.url;
    } catch (e) {
      // If a link already exists, Dropbox throws — fetch the existing one.
      const existing = await dbx.sharingListSharedLinks({ path: safeName });
      link = existing.result.links?.[0]?.url || "";
    }

    return res.status(200).json({ url: link });
  } catch (err) {
    console.error("Dropbox upload error:", err);
    return res.status(500).json({ error: "Upload failed." });
  }
}