const XLXS = require("xlsx");

headerTest = [
    'Item',
    'Qty',
    'Cat No',
    'Supplier',
    'Grade (optional)',
    'Pack size (optional)',
    'GIX No (optional)',
    'Cost per Unit'
];

// const headersArray = Object.keys(arrItems[0])

let generateHeaders = function (arrayItems) {
    return Object.keys(arrayItems[0])
}

let checkHeaders = (parentArray, subsetArray) => {
    return subsetArray.every((el) => {
        return parentArray.includes(el)
    })
}

// console.log(checkHeaders(headerTest, headersArray));






const readFile = async function (file) {
    const workbook = XLXS.readFile(file);
    return workbook
}



const makeJson = function (workbook) {
    const worksheet = workbook.Sheets["Sheet1"];

    const arrItems = XLXS.utils.sheet_to_json(worksheet);

    return arrItems
}


async function readFile_async(file) {
    try {
        await readFile(file);
        console.log("working")
    } catch (e) {
        console.log("Couldn't read the file");
        // console.log(e)
    }
}


// readFile_async("../Excel_files/Input_file.xlsx");
exports.readFile = readFile;
exports.makeJson = makeJson;
exports.readFile_async = readFile_async;
exports.headerTest = headerTest;
exports.generateHeaders = generateHeaders;
exports.checkHeaders = checkHeaders;