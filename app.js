const excel = require("./utils/excel_methods");

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