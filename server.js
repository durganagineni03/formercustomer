require('dotenv').config({ path: __dirname + '/.env' });

const app = require("./src/app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

// Debugging: Confirm the app is loading
console.log("✅ `app.js` successfully loaded into `server.js`");
console.log(`🚀 Server running at: ${BASE_URL}`);

app.listen(PORT, () => console.log(`🌍 Open in browser: ${BASE_URL}`));
