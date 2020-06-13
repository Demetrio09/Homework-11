// Dependencies
// ==================================================

const express = require("express");
const path = require("path");

// Setup Express app
// ==================================================

const app = express();
const PORT = process.env.PORT || 3000;

// Setup the Express app to handle data parsing
// ==================================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// === NOtes data ===
// =================================================

let notes = [];

// Routes
// ==================================================
// Basic route that sends user first to the AJAX page

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Start the server to begin listening
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}, follow: http://localhost:${PORT}/`));