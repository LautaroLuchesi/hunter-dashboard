const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

let auth;

// Si existe credentials.json (desarrollo local)
const credentialsPath = path.join(
    __dirname,
    "../../credentials/credentials.json"
);

console.log("Ruta credentials:", credentialsPath);
console.log("¿Existe credentials?", fs.existsSync(credentialsPath));

if (fs.existsSync(credentialsPath)) {
    console.log("➡️ Usando credentials.json");
    auth = new google.auth.GoogleAuth({
        keyFile: credentialsPath,
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
} else {
    console.log("➡️ Usando variables de entorno");
    auth = new google.auth.GoogleAuth({
        credentials: {
            type: process.env.GOOGLE_TYPE,
            project_id: process.env.GOOGLE_PROJECT_ID,
            private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            client_id: process.env.GOOGLE_CLIENT_ID,
            auth_uri: process.env.GOOGLE_AUTH_URI,
            token_uri: process.env.GOOGLE_TOKEN_URI,
            auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
            client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
            universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
}

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