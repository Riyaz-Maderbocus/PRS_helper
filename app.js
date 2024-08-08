const excel = require("./utils/excel_methods");
const fileWriter = require("./utils/file_writer");
const path = require("path");

console.log(path.join(__dirname, "/views"));

async function test() {
    try {



        const workbook = await excel.readFile("./Excel_templates/Input_file_template.xlsx");




        console.log("working");
        let arrItems = await excel.makeJson(workbook);
        // console.log(arrItems)

        // check empty data can be optional as the first try catch is working


        // try {
        //     if (!excel.emptyDataCheck(arrItems)) {
        //         throw new Error("Data is empty")
        //     }
        // } catch (e) {
        //     console.log(e)
        // }


        // end empty data check

        let headers = excel.generateHeaders(arrItems);
        console.log(headers);




        // Was working

        try {
            if (await excel.checkHeaders(excel.headerTest, headers)) {

                console.log(excel.checkHeaders(excel.headerTest, headers))
                console.log("headers working");



                // put in file writing code now
                console.log(fileWriter.getUniqueSuppliers(arrItems));
                let uniqueSuppliers = await fileWriter.getUniqueSuppliers(arrItems);



                console.log(uniqueSuppliers);
                let data = await fileWriter.makeContent(uniqueSuppliers, arrItems);
                console.log(data);

                try {
                    console.log(fileWriter.dateNamer());
                    let newFileName = await fileWriter.dateNamer();
                    let outputFolder = path.join(__dirname, "/outputs");
                    await fileWriter.deleteOldFiles(outputFolder);
                    await fileWriter.makeFile(`${outputFolder}/${newFileName}.txt`, data);
                } catch (e) {
                    console.log("Problem writing file");
                }


            } else {
                throw new Error;
            }
        } catch (e) {
            console.error(e);
            console.log(excel.checkHeaders(excel.headerTest, headers));
            console.log(excel.headerTest);
            console.log(headers);
            console.log("Headers wrong");

        }

        // Was working

        // Duplicate code
        // works but you can get away with dodgy headers

        // try {

        //     let uniqueSuppliers = await fileWriter.getSuppliers(arrItems);



        //     console.log(uniqueSuppliers);
        //     let data = await fileWriter.makeContent(uniqueSuppliers, arrItems);
        //     console.log(data);

        //     try {
        //         console.log(fileWriter.dateNamer());
        //         let newFileName = await fileWriter.dateNamer();
        //         let outputFolder = path.join(__dirname, "/outputs");
        //         await fileWriter.deleteOldFiles(outputFolder);
        //         await fileWriter.makeFile(`${outputFolder}/${newFileName}.txt`, data);
        //     } catch (e) {
        //         console.log("Problem writing file");
        //     }



        // } catch (e) {
        //     console.error(e);
        //     console.log("Headers wrong")
        // }

        // Duplicate code

    } catch (e) {
        console.log("problem reading file");
        // console.error(e);

    }
}

test()

// excel.readFile_async("./Excel_files/Input_file_data.xls");