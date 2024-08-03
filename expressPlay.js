const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.port || 3000;


app.get("/", (req, res) => {
    // res.download((path.join(__dirname + '/outputs/testOut.txt')))
    res.download((path.join(__dirname + '/outputs/03_08_2024_18_05_04.txt')))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});