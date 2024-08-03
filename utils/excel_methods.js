const XLXS = require("xlsx");

const headerTest = [
    'Item',
    'Qty',
    'Cat No',
    'Supplier',
    // 'Grade (optional)',
    // 'Pack size (optional)',
    // 'GIX No (optional)',
    'Cost per Unit'
];

// const headersArray = Object.keys(arrItems[0])

let generateHeaders = function (arrayItems) {
    return Object.keys(arrayItems[0])
}

let checkHeaders = (parentArray, subsetArray) => {
    return parentArray.every((el) => {
        return subsetArray.includes(el)
    })
}

// console.log(checkHeaders(headerTest, headersArray));


// check to see if there is data
let emptyDataCheck = (array) => {
    if (!array.length) return false;
    return true
}




const readFile = async function (file) {
    const workbook = XLXS.readFile(file);
    return workbook
}



const makeJson = async function (workbook) {
    const worksheet = await workbook.Sheets["Sheet1"];

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


// Test area

// const headerTest = [
//     'Item',
//     'Qty',
//     'Cat No',
//     'Supplier',
//     'Grade (optional)',
//     'Pack size (optional)',
//     'GIX No (optional)',
//     'Cost per Unit'
// ];
// const newHeaders = [
//     'Item', 'Supplier',
//     'Cat No', 'Pack size (optional)',
//     '__EMPTY', '__EMPTY_1',
//     'Qty', '__EMPTY_2',
//     '__EMPTY_3', '__EMPTY_4',
//     'GIX No (optional)', '__EMPTY_5',
//     '__EMPTY_6', '__EMPTY_10',
//     'Cost per Unit', '__EMPTY_12'
// ]

// let test = async function () {
//     let file = await readFile("../Excel_files/Input_file_remaining.xlsx");
//     console.log(file);
//     let json = await makeJson(file);
//     console.log(json);
//     let headers = generateHeaders(json);
//     console.log(headerTest);
//     console.log(headers);
//     console.log(checkHeaders(headerTest, headers))
// }

// test();
// console.log(checkHeaders(headerTest, newHeaders));



// End test area



// readFile_async("../Excel_files/Input_file.xlsx");
exports.readFile = readFile;
exports.makeJson = makeJson;
exports.readFile_async = readFile_async;
exports.headerTest = headerTest;
exports.generateHeaders = generateHeaders;
exports.checkHeaders = checkHeaders;
exports.emptyDataCheck = emptyDataCheck;