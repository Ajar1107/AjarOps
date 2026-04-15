const ExcelJS = require('exceljs');
const { test, expect } = require('@playwright/test');


async function WriteExcel(fname, Ntext, change, filename) {

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filename);
    const worksheet = workbook.getWorksheet("Sheet1");

    const output = await ReadExcel(worksheet, fname)  //mention worksheet as it reads from ReadExcel

    //const replace1 = worksheet.getCell(output.row, output.column);
    //replace1.value = Ntext1;
    //await workbook.xlsx.writeFile(filename);

    const replace = worksheet.getCell(output.row, output.column + change.columnChange);
    replace.value = Ntext;
    await workbook.xlsx.writeFile(filename);



}


async function ReadExcel(worksheet, fname) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            //console.log(cell.value);
            if (cell.value === fname) {
                console.log(output.row = rowNumber);
                console.log(output.column = colNumber);
            }
        })
    })
    return output;
}


// WriteExcel("Mango","Ango","334",{rowChange:0, columnChange: 2},"/Users/rajan/OneDrive/Downloads/download.xlsx");

test("Excel run", async ({ page }) => {
    const textSearch = "Mango";
    //const repText1 = "Ango";
    const repText = "339";
    const filename = "/Users/rajan/OneDrive/Downloads/download.xlsx";

    await page.goto("https://rahulshettyacademy.com/upload-download-test/");

    // Promise all is used as page gets waiting for download
    const [waitD] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', { name: 'Download' }).click()]);

    const Nwait = await waitD;  //taking in one variable 
    await Nwait.saveAs("/Users/rajan/OneDrive/Downloads/" + Nwait.suggestedFilename());
    //await downloadfile.saveAs("C:/Users/rajan/OneDrive/Downloads/"+downloadfile.suggestedFilename());

    await WriteExcel(textSearch, repText, { rowChange: 0, columnChange: 2 }, filename);

    await page.locator("#fileinput").setInputFiles(filename);  //adding the file from downloads of updated

    const desrow = await page.getByRole('row').filter({ has: page.getByText(textSearch) }).locator("#cell-4-undefined");
    expect(desrow).toContainText(repText);
    await page.pause();

})
