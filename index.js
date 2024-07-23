const XLXS = require("xlsx");

const workbook = XLXS.readFile("./Excel_files/Input_file_data.xlsx");

const worksheet = workbook.Sheets["Sheet1"];

const arrItems = XLXS.utils.sheet_to_json(worksheet);

const fs = require("fs");

// console.log(arrItems);
const headersArray = Object.keys(arrItems[0])
console.log(headersArray);
// [ 'Item', 'Cat no', 'Qty', 'Key' ]


// Get the unique suppliers

let findUniqueSuppliers = (arrItems) => {
    let unique_values = arrItems
        .map((item) => item.Supplier)
        .filter(
            (value, index, current_value) => current_value.indexOf(value) === index
        );
    return unique_values;
};

let uniqueSuppliers = findUniqueSuppliers(arrItems);

let final = "";
for (let supplier of uniqueSuppliers) {
    // Makes heading for the supplier
    let supplierText = "";
    let supplierName = String(`${supplier} \n`)
    supplierText += supplierName;
    // Makes heading for the supplier
    for (let row of arrItems) {
        if (row.Supplier === supplier) {
            console.log("********");
            // console.log(row)
            console.log("********");
        }
    }
    console.log(supplierText)
    // Add to the overall file
    final += supplierText

}

console.log(`${final}`)

// let final = "";
// for (let item of arrItems) {
//     // console.log(`Cat number ${item["Cat no"]} is a ${item.Item} with key value of ${item.Key}`)
//     final += `Cat number ${item["Cat no"]} is a ${item.Item} with key value of ${item.Key}\n`
// }

// console.log(final)

// fs.writeFile("./output.txt", final, (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("file written")
//     }
// })