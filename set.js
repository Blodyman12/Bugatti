const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUNsK3dkVFNnQnM1Q2tNLy9vams3WFZtSC9kT3gxQVBDYTA3dkhDVCtVbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1dlb2pwNi9LM1ZDQllsbUNIYWVoTE5laFJvamlsUVBwa2s3NjJBdit5Yz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzQ3QvQ2hHdG00UUdGQk5FbTVzbDl5WGdwem1LbDAxMXp2bW5zd3I0eUd3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqVDJnY0xJdmovZU9rSS9EOHlMQ3dmQmhIYUlQYVJZdndaUFMxR1JWZ1ZrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFLZGsrMC9BQTc3T0l6MFZJM2VMT1J0U3A4T2V4L3VLY0ZSYUMyOHdRMVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktENTZhanp1cjlXSDdPdmJQTkNVdFF5alpacHovQUNDY1oxOWhCSldsaUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUg5Mk5nRWc1cXJXa1BWcFdQVHRjeUZoT2JHN0w4Q1JkUW1VZ1IwWGxscz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTGt6WXVIYmRNUlNkM0J1WmtGdzNlWWllQmp3ZHFBVGdBUUdrOGlrUGlRWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRCRkFwL240b0JZQ2xnbVVsazhZRVpsemp2T2ZjNG00VG9DMVdBMkoyN29VcXBPOU1GR2I5Q3hrZUNMb3duV0dBQ0EvVFlNekxnNlR5bnpSTnpFY0NnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYxLCJhZHZTZWNyZXRLZXkiOiJ6SDN6ZmZZMEJsQ2Q2bUh0T0YvM24vYTJRdHNPeVdjcVdoelp1aitoVW9VPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJOaV9nSUVQb1NoR2trSzNGR0h4VnpBIiwicGhvbmVJZCI6Ijc3Y2U1Y2Q0LTkwYzctNDFkOS1hNzhlLWViN2E0ZGE2YjU3YSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFckowL2IreldVVHhYYlpIb3QyenloY0dCZXc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1lHU3Bod09UNWxOazk0RFl3a1ZKR0ZaV1owPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlJLR042RkZFIiwibWUiOnsiaWQiOiIyMzQ5MTY0NDg4NjY1OjEyQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJV2MyVTRRc0xYQnR3WVlBeUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJVRmh6VWl0dTkrekdyS1prbmFXaEVlQWpDWGhodk1ZWHhCZk51TThlandzPSIsImFjY291bnRTaWduYXR1cmUiOiJsQWUxUnlIRHdiNkxYS1JsZFBYRDhaUXdISms4d3RxODNRUWx2WVFjSW1rcGhtZGE5a2ZnVFhwYU5VNTlEejgyVkYxS1RVUGNGT09IUXM3ZHdvekVBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVGhDQkVtMnJnV0M0VUVTbVlRNmV2OUE2M1lVV1J5WjR4UEthUGFwS2pnUm9KUmQ5bUNoV0J1Q1Jrd015VjlnU3JZR094ZkpINlRJSjJwQyt4QW9wQkE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTY0NDg4NjY1OjEyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZCWWMxSXJidmZzeHF5bVpKMmxvUkhnSXdsNFliekdGOFFYemJqUEhvOEwifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjcwMjc5MDIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTWtuIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "SD reaper",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349164488665",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || '𝐁𝐔𝐆𝐀𝐓𝐓𝐈',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0418ae5a1e6440e54652c.jpg,https://telegra.ph/file/c425b0fd9ec4ab130c8f9.jpg.https://telegra.ph/file/0d3b89f01e8fccb260b45.jpg.https://telegra.ph/file/abc304e66c2a3e8b2a557.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
                  
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
