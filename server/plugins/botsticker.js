const { downloadMediaMessage } = require("@whiskeysockets/baileys");
const fs = require("fs");
const path = require("path");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

async function stickerPlugin(context) {
  const { msg, command, plugin } = context;
  const extra =
    typeof plugin.extra_data === "string"
      ? JSON.parse(plugin.extra_data)
      : plugin.extra_data;

  if (command != extra.command) return { handled: false };
  const messageContent =
    msg.message?.imageMessage || msg.message?.extendedImageMessage;

  if (!messageContent) {
    return {
      handled: true,
      reply: {
        text: `❌ Kirim gambar dan berikan caption ${extra.command} untuk membuat sticker.`,
      },
    };
  }

  try {
    const mediaBuffer = await downloadMediaFromMessage(msg);
    const base64Image = mediaBuffer.toString("base64");

    const tempDir = path.join(__dirname, "..", "data", "temp");
    const tempPng = path.join(tempDir, "sticker.png");
    const tempWebp = path.join(tempDir, "sticker.webp");

    // Pastikan folder temp ada
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Tulis file PNG
    fs.writeFileSync(tempPng, Buffer.from(base64Image, "base64"));

    // Hapus file WebP jika sudah ada
    if (fs.existsSync(tempWebp)) fs.unlinkSync(tempWebp);

    const sticker = new Sticker(tempPng, {
      pack: "MPedia Pack",
      author: "M Pedia",
      type: StickerTypes.CROPPED,
      categories: ["🤩", "🎉"],
      id: "mpedia-sticker",
      quality: 100,
      background: "#000000",
    });

    await sticker.toFile(tempWebp);

    return {
      handled: true,
      reply: {
        sticker: fs.readFileSync(tempWebp),
      },
    };
  } catch (err) {
    console.error("[Sticker Plugin Error]", err);
    return {
      handled: true,
      reply: { text: "❌ Gagal membuat stiker." },
    };
  }
}

// Utility: download media
async function downloadMediaFromMessage(msg) {
  const mimeType = Object.keys(msg.message)[0];
  const stream = await downloadMediaMessage(msg);
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}

module.exports = stickerPlugin;
