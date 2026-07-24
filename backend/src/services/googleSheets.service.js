const { google } = require("googleapis");
const path = require("path");

const credentialsPath = path.join(
    __dirname,
    "../../credentials/credentials.json"
);

const auth = new google.auth.GoogleAuth({
    keyFile: credentialsPath,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({
    version: "v4",
    auth,
});

const readSheet = async (range) => {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range,
    });

    return response.data.values || [];
};

module.exports = {
    readSheet,
};