const express = require("express");
const path = require("path");
const app = express();
const multer = require('multer');
const xlsx = require('xlsx');

const PORT = process.env.port || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));
app.use(express.static("public"));

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
});




app.get("/", (req, res) => {
    // res.sendFile(__dirname + '/views/index.html');
    res.render("index");
})

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        const workbook = xlsx.read(req.file.buffer, {
            type: 'buffer'
        });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(sheet);
        res.json(jsonData);
    } catch (error) {
        console.error(error);
        // res.status(500).json({
        //     error: 'Failed to process the uploaded file'
        // });
        console.log("Going back");
        res.redirect("/");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});