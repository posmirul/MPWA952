const { ulid } = require("ulid");
const { formatButtonMsg, Button } = require("../dto/button");
const { formatListMsg, Section } = require("../dto/list");
const { prepareMediaMessage } = require("../lib/helper");

exports.handleMediaReply = async (reply, sock, msg, quoted) => {
  const ownerJid = sock.user.id.replace(/:\d+/, "");

  if (reply.type === "audio") {
    return sock.sendMessage(msg.key.remoteJid, {
      audio: { url: reply.url },
      ptt: true,
      mimetype: "audio/mpeg",
    });
  }

  const generate = await prepareMediaMessage(sock, {
    caption: reply.caption || "",
    fileName: reply.filename,
    media: reply.url,
    mediatype: ["video", "image"].includes(reply.type)
      ? reply.type
      : "document",
  });

  const message = { ...generate.message };

  return sock.sendMessage(
    msg.key.remoteJid,
    {
      forward: {
        key: { remoteJid: ownerJid, fromMe: true },
        message,
      },
    },
    { quoted: quoted ? msg : null }
  );
};

exports.handleButtonReply = async (reply, sock, msg) => {
  const btns = reply.buttons.map((btn) => new Button(btn));
  const message = formatButtonMsg(
    btns,
    reply.footer,
    reply.text || reply.caption,
    sock,
    reply.image?.url
  );
  const msgId = ulid(Date.now());
  return sock.relayMessage(msg.key.remoteJid, message, { messageId: msgId });
};

exports.handleListReply = async (reply, sock, msg) => {
  const sections = reply.sections.map((sect) => new Section(sect));
  const message = formatListMsg(
    sections,
    reply.footer || "..",
    reply.text || reply.caption,
    sock,
    reply.image?.url
  );
  const msgId = ulid(Date.now());
  return sock.relayMessage(msg.key.remoteJid, message, { messageId: msgId });
};

exports.handleTextReply = async (reply, sock, msg, quoted) => {
  return sock.sendMessage(msg.key.remoteJid, reply, {
    quoted: quoted ? msg : null,
  });
};

exports.getPpUrlFromSock = async (sock, msg) => {
  try {
    return await sock.profilePictureUrl(
      msg.key.participant ?? msg.key.remoteJid
    );
  } catch (error) {
    console.log("Failed to get PP:", error);
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png";
  }
};
