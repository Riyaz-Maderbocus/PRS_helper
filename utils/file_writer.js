const fs = require("fs");
const path = require("path");
const findRemoveSync = require('find-remove');
// console.log("helo")

console.log(path.join(__dirname, "/views"));

// Use path.join() to make a directory

const getUniqueSuppliers = (excelJSON) => {
    let unique_values = excelJSON
        .map((item) => item.Supplier)
        .filter(
            (value, index, current_value) => current_value.indexOf(value) === index
        );
    return unique_values;
}

const makeContent = function (suppliers, excelJSON) {
    let final = "";

    for (let supplier of suppliers) {
        // Makes heading for the supplier
        // let supplierText = "";
        let supplierName = String(`\n****** ${supplier} ******\n\n\n`)
        // supplierText += supplierName;
        final += supplierName;
        // Heading finishes here
        // Get a total of the supplier
        let total = 0;
        for (let row of excelJSON) {
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
                // console.log(unitCost);
                let subtotalCost = `, Subtotal = £${parseFloat(row["Cost per Unit"]) * parseInt(row["Qty"])}`;
                newInfo += subtotalCost;
                // console.log(subtotalCost);

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
    return final
}

const makeFile = function (location, data) {
    fs.writeFile(location, data, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("file written")
        }
    })
}


const dateNamer = function () {
    const d = new Date();
    let date = d.toLocaleDateString();
    let time = d.toLocaleTimeString();
    let output = `${date}_${time}`;
    output = String(output.replaceAll("/", "_"));
    output = String(output.replaceAll(":", "_"));
    return output;
}

const deleteOldFiles = function (location) {
    findRemoveSync(location, {
        age: {
            seconds: 20
        },
        extensions: '.txt',
        limit: 100
    })
}




exports.getUniqueSuppliers = getUniqueSuppliers;
exports.makeContent = makeContent;
exports.makeFile = makeFile;
exports.dateNamer = dateNamer;
exports.deleteOldFiles = deleteOldFiles;