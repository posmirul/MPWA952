const axios = require("axios");

async function googleSheetSearchPlugin(context) {
  const { command, plugin } = context;

  const message = command.slice(6).trim();
  const sheetUrl = plugin.main_data;
  const extra = JSON.parse(plugin.extra_data || "{}");
  const googleKey = extra.google_key;
  if (!sheetUrl) {
    return {
      handled: false,
    };
  }

  try {
    //get spreatid from url
    const spreadsheetIdMatch = sheetUrl.match(/\/d\/(.*?)\//);
    console.log("disini", spreadsheetIdMatch);
    if (!spreadsheetIdMatch) {
      return { handled: false };
    }

    const spreadsheetId = spreadsheetIdMatch[1];
    const range = "Sheet1!A:E"; // bisa diubah jika perlu
    const key = googleKey;

    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${key}`;

    const response = await axios.get(apiUrl);

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return { handled: false };
    }

    for (const row of rows) {
      if (row[0] === command) {
        let responseText = row[1] || "";
        // change placeholder {{var1}}, {{var2}}, ...if exists
        for (let i = 0; i < 5; i++) {
          const placeholder = `{{var${i + 1}}}`;
          if (row[i + 2]) {
            responseText = responseText.replace(
              new RegExp(placeholder, "g"),
              row[i + 2]
            );
          }
        }

        return {
          handled: true,
          reply: { text: responseText },
        };
      }
    }

    return {
      handled: false,
    };
  } catch (error) {
    console.error(
      "Error fetching data from sheet:",
      error.response?.data || error.message
    );
    return {
      handled: false,
    };
  }
}

module.exports = googleSheetSearchPlugin;
