const XLXS = require("xlsx");

const workbook = XLXS.readFile("./Excel_files/Input_file_data.xlsx");

const worksheet = workbook.Sheets["Sheet1"];

const arrItems = XLXS.utils.sheet_to_json(worksheet);

const fs = require("fs");

// console.log(arrItems);
const headersArray = Object.keys(arrItems[0])
console.log(headersArray);
// [ 'Item', 'Cat no', 'Qty', 'Key' ]

// console.log(headersArray.includes("Item", "Qty", "Cat No", "Supplier", "Grade (optional)", "Pack size (optional)", "GIX No (optional)", "Cost per Unit"));


// This section will check to Excel header tampering*******

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

let checkHeaders = (parentArray, subsetArray) => {
    return subsetArray.every((el) => {
        return parentArray.includes(el)
    })
}

console.log(checkHeaders(headerTest, headersArray));

// Tampering code end *************


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
    // let supplierText = "";
    let supplierName = String(`\n****** ${supplier} ******\n\n\n`)
    // supplierText += supplierName;
    final += supplierName;
    // Heading finishes here
    // Get a total of the supplier
    let total = 0;
    for (let row of arrItems) {
        if (row.Supplier === supplier) {
            console.log("********");

            let newInfo = `${row["Qty"]} x Cat No: ${row["Cat No"]}, Item: ${row["Item"]}`
            let gradeInfo = row["Grade (optional)"] ? `, Grade: ${row["Grade (optional)"]}` : "";
            newInfo += gradeInfo;
            let packInfo = row["Pack size (optional)"] ? `, Pack size: ${row["Pack size (optional)"]}` : "";
            // console.log(packInfo);
            newInfo += packInfo;
            let gixInfo = row["GIX No (optional)"] ? `, GIX No: ${row["GIX No (optional)"]}` : "";
            // console.log(gixInfo);
            newInfo += gixInfo;
            let unitCost = `, Cost per unit: £${parseFloat(row["Cost per Unit"])}`;
            newInfo += unitCost;
            console.log(unitCost);
            let subtotalCost = `, Subtotal = £${parseFloat(row["Cost per Unit"]) * parseInt(row["Qty"])}`;
            newInfo += subtotalCost;
            console.log(subtotalCost);

            total += parseFloat(row["Cost per Unit"]) * parseInt(row["Qty"])

            console.log(newInfo);
            console.log("********");
            final += newInfo;
            final += "\n\n"
        }
    }
    final += `Total is: £${total}\n\n\n\n`
    // console.log(supplierText)
    // Add to the overall file
    // final += supplierText

}

console.log(`${final}`)


// OLD CODE WRITER DON'T USE
// let final = "";
// for (let item of arrItems) {
//     console.log(`Cat number ${item["Cat no"]} is a ${item.Item} with key value of ${item.Key}`)
//     final += `Cat number ${item["Cat no"]} is a ${item.Item} with key value of ${item.Key}\n`
// }

// console.log(final)

// **********File writing code

fs.writeFile("./output.txt", final, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("file written")
    }
})

// **********File writing code