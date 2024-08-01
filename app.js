const excel = require("./utils/excel_methods");
const fileWriter = require("./utils/file_writer");
const path = require("path");

console.log(path.join(__dirname, "/views"));

async function test() {
    try {
        const workbook = await excel.readFile("./Excel_files/Input_file_data.xlsx");
        console.log("working");
        let arrItems = excel.makeJson(workbook);
        console.log(arrItems)
        let headers = excel.generateHeaders(arrItems);



        try {
            if (excel.checkHeaders(excel.headerTest, headers)) {
                console.log("headers working")

                // put in file writing code now
                // console.log(fileWriter.getUniqueSuppliers(arrItems));
                let uniqueSuppliers = fileWriter.getSuppliers(arrItems);
                console.log(uniqueSuppliers);
                let data = fileWriter.makeContent(uniqueSuppliers, arrItems);
                console.log(data);

                try {
                    console.log(fileWriter.dateNamer());
                    let newFileName = fileWriter.dateNamer();
                    let outputFolder = path.join(__dirname, "/outputs");
                    fileWriter.deleteOldFiles(outputFolder);
                    fileWriter.makeFile(`${outputFolder}/${newFileName}.txt`, data);
                } catch (e) {
                    console.log("Problem writing file");
                }


            } else {
                throw new Error;
            }
        } catch (e) {
            console.log("Headers wrong")
        }


    } catch (e) {
        console.log("Couldn't read the file")
    }
}

test()

// excel.readFile_async("./Excel_files/Input_file_data.xls");