// Dependencies
// ==================================================

const express = require("express");
const path = require("path");
const { get } = require("http");

// Setup Express app
// ==================================================

const app = express();
const PORT = process.env.PORT || 3000;

// Setup the Express app to handle data parsing
// ==================================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// === Notes data ===
// =================================================

// const note = require("./db/db.json");

let note = [];

// Routes
// ==================================================
// Basic route that sends user first to the AJAX page


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    return res.json(note);
});

// Creates a new note - takes in JSON input

app.post("/api/notes", function (req, res) {
    // function Note(title, text, id) {
    //     this.title = title,
    //     this.text = text,
    //     this.id = id
    // };
    // for (i = 0; i < note.length; i++) {
    //     // Note.id = i;
    //     let note = new Note(req.body, req.body, i);
    //     console.log(note);
    // };
    note.id = 0;
    note.push(req.body);
    console.log(note);

    res.json(note);
});

// Delete a note

app.delete("/api/notes/:id", function (req, res) {
    note.findOneAndRemove({ _id: req.params.id }, (err, note) => {
        if (err) {
            res.send('error removing')
        } else {
            console.log(note);
            res.status(204);
        }
    });
    // res.send("Delete request to homepage.")
});

// Start the server to begin listening
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}, follow: http://localhost:${PORT}/`));