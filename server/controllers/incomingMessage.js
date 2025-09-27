const { parseIncomingMessage, delayMsg } = require("../lib/helper");
const {
  isExistsEqualCommand,
  isExistsContainCommand,
  getUrlWebhook,
  getDevice,
  getActivePluginsByDevice,
} = require("../database/model");
const {
  handleMediaReply,
  handleButtonReply,
  handleListReply,
  handleTextReply,
  getPpUrlFromSock,
} = require("../service/replyHandler");
const { sendWebhook } = require("../service/webhook");
const { runPlugins } = require("../plugins/pluginManager");

const IncomingMessage = async (msg, sock) => {
  try {
    if (!msg.messages) return;
    msg = msg.messages[0];

    if (msg.key.fromMe || msg.key.remoteJid === "status@broadcast") return;

    const senderName = msg?.pushName || "";
    const numberWa = sock.user.id.split(":")[0];
    const { command, media, from } = await parseIncomingMessage(msg, sock);
    const participant = msg.key.participant;
    const device = await getDevice(numberWa);
    let quoted = false;

    if (device.length > 0 && device[0].wh_read === 1) {
      sock.readMessages([msg.key]);
    }

    const pluginContext = {
      msg,
      sock,
      command,
      from,
      senderName,
      numberWa,
      device,
      participant,
    };

    // === PARALLEL PROMISES ===
    const webhookPromise = (async () => {
      const url = await getUrlWebhook(numberWa);
      if (!url) return null;

      const ppUrl = await getPpUrlFromSock(sock, msg);
      const response = await sendWebhook({
        device: numberWa,
        command,
        media,
        from,
        name: senderName,
        url,
        participant,
        ppUrl,
      });

      return typeof response === "object" ? response : null;
    })();

    const autoreplyPromise = (async () => {
      let result = await isExistsEqualCommand(command, numberWa);
      if (!result.length)
        result = await isExistsContainCommand(command, numberWa);
      if (!result.length) return null;

      const matched = result[0];
      const isReplyNeeded =
        matched.reply_when === "All" ||
        (matched.reply_when === "Group" &&
          msg.key.remoteJid.includes("@g.us")) ||
        (matched.reply_when === "Personal" &&
          !msg.key.remoteJid.includes("@g.us"));

      if (!isReplyNeeded) return null;

      return typeof matched.reply === "object" ? matched.reply : matched.reply;
    })();

    const pluginsPromise = runPlugins(pluginContext); // bisa async internalnya

    // === RUN ALL IN PARALLEL ===
    const [webhookResult, autoreplyResult, pluginResult] =
      await Promise.allSettled([
        webhookPromise,
        autoreplyPromise,
        pluginsPromise,
      ]);

    // === PICK REPLY IF ANY ===
    let reply = null;

    if (autoreplyResult.status === "fulfilled" && autoreplyResult.value) {
      reply = autoreplyResult.value;
    } else if (webhookResult.status === "fulfilled" && webhookResult.value) {
      reply = webhookResult.value;
      quoted = webhookResult.value?.quoted || false;
    } else if (
      pluginResult.status === "fulfilled" &&
      pluginResult.value?.handled
    ) {
      const typeBot = pluginResult.value.typeBot || "all";

      const isGroup = msg.key.remoteJid.includes("@g.us");

      const isReplyNeeded =
        typeBot === "all" ||
        (typeBot === "group" && isGroup) ||
        (typeBot === "personal" && !isGroup);

      if (isReplyNeeded) {
        reply = pluginResult.value.reply;
        quoted = pluginResult.value.quoted || false;
      }
    }

    // === SEND REPLY IF EXISTS ===

    if (reply) {
      if (device.length > 0 && device[0].wh_typing === 1) {
        await delayMsg(2 * 1000, sock, msg.key.remoteJid, true);
      }
      if (typeof reply === "string") reply = JSON.parse(reply);
      if (typeof reply === "object" && reply?.text?.includes("{name}")) {
        reply = JSON.parse(
          JSON.stringify(reply).replace(/{name}/g, senderName)
        );
      }

      if (reply.type) {
        return await handleMediaReply(reply, sock, msg, quoted);
      } else if (reply.buttons) {
        return await handleButtonReply(reply, sock, msg);
      } else if (reply.sections) {
        return await handleListReply(reply, sock, msg);
      } else {
        return await handleTextReply(reply, sock, msg, quoted);
      }
    }
  } catch (e) {
    console.log("IncomingMessage error:", e);
  }
};

module.exports = { IncomingMessage };
