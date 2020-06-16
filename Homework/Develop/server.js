// Dependencies
// ==================================================

const express = require("express");
const path = require("path");
const { get } = require("http");
const fs = require("fs");

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

const note = require("./db/db.json");



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
  
    var randomID = Math.floor(Math.random() * 1000)

  
    var new_note = {
        title: req.body.title,
        text: req.body.text,
        id: randomID
    }

    fs.readFile('./db/db.json', 'utf-8', function(err, data) {
        if (err) throw err
    
        var arrayOfObjects = JSON.parse(data)
        arrayOfObjects.push(new_note)
    
        fs.writeFile('./db/db.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
            if (err) throw err
            console.log('Done!')
        
        })
    })
    
});

// Delete a note

app.delete("/api/notes/:id", function (req, res) {

    var noteID = req.params.id
    fs.readFile('./db/db.json', 'utf-8', function(err, data) {
        if (err) throw err
    
        var arrayOfObjects = JSON.parse(data)
        

        console.log(arrayOfObjects)

        var filteredData = arrayOfObjects.filter(note => note.id != noteID);
        console.log(filteredData)
    
        fs.writeFile('./db/db.json', JSON.stringify(filteredData), 'utf-8', function(err) {
            if (err) throw err
            console.log('Done!')
             
        })
    })
 
});

// Start the server to begin listening
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}, follow: http://localhost:${PORT}/`));