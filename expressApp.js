const express = require("express");
const path = require("path");
const app = express();
const multer = require('multer');
const xlsx = require('xlsx');

const excel = require("./utils/excel_methods");
const fileWriter = require("./utils/file_writer");

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
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const workbook = xlsx.read(req.file.buffer, {
            type: 'buffer'
        });

        // const workbook = await excel.readFile(req.file.buffer, {
        //     type: "buffer"
        // });

        // const sheetName = workbook.SheetNames[0];
        // const sheet = workbook.Sheets[sheetName];
        // const jsonData = xlsx.utils.sheet_to_json(sheet);


        let arrItems = await excel.makeJson(workbook);
        // let arrItems = excel.makeJson(workbook);
        // console.log(arrItems);

        // try {
        //     if (!excel.emptyDataCheck(arrItems)) {
        //         throw new Error("Data is empty")
        //     }
        // } catch (e) {
        //     console.log(e)
        // }

        if (!excel.emptyDataCheck(arrItems)) {
            throw new Error("Data is empty")
        }
        // Check headers first as the major check


        let headers = excel.generateHeaders(arrItems);
        // console.log(headers);


        // if (!await excel.checkHeaders(excel.headerTest, headers)) {
        if (!excel.checkHeaders(excel.headerTest, headers)) {
            console.log(excel.checkHeaders(excel.headerTest, headers));
            // res.redirect("/");
            throw new Error("headers don't match");
        }

        // Taking code below out of try catch block.

        let uniqueSuppliers = fileWriter.getUniqueSuppliers(arrItems);
        let data = fileWriter.makeContent(uniqueSuppliers, arrItems);

        let newFileName;
        let outputFolder;
        // try {
        //     console.log(fileWriter.dateNamer());
        //     newFileName = fileWriter.dateNamer();
        //     outputFolder = path.join(__dirname, "/outputs");
        //     fileWriter.deleteOldFiles(outputFolder);



        //     fileWriter.makeFile(`${outputFolder}/${newFileName}.txt`, data);
        // } catch (e) {
        //     console.log("Problem writing file");
        // }
        // make an async iife here instead of try catch



        (async () => {
            try {

                newFileName = fileWriter.dateNamer();
                outputFolder = path.join(__dirname, "/outputs");
                fileWriter.deleteOldFiles(outputFolder);
                await fileWriter.makeFile(`${outputFolder}/${newFileName}.txt`, data)
                    .then(() => res.download(path.join(outputFolder + "/" + newFileName + ".txt")))

            } catch (e) {
                // this should catch all exceptions
                console.log("Problem writing file");
            }
        })();

        console.log(path.join(outputFolder + "/" + newFileName + ".txt"));
        console.log(path.join("./outputs/" + newFileName + ".txt"));

        // setTimeout(() => {
        //     res.download(path.join(outputFolder + "/" + newFileName + ".txt"));
        // }, 2000)

        // res.download(path.join(outputFolder + "/" + newFileName + ".txt"))



    } catch (error) {
        console.error(error);
        console.log("Problem reading file");
        res.redirect("/");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});