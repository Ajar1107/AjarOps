import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as ExcelJS from 'exceljs';

test.describe('Upload Download Test', () => {
    let downloadedFilePath: string;
    const downloadDir = path.join(__dirname, '../downloads');

    test.beforeAll(async () => {
        // Create downloads directory if it doesn't exist
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir, { recursive: true });
        }
    });

    test('Download Excel file from the page', async ({ page }) => {
        // Navigate to the upload-download test page
        await page.goto('https://rahulshettyacademy.com/upload-download-test/');

        // Wait for the page to load - verify the download button exists
        const downloadButton = page.getByRole('button', { name: 'Download' });
        await expect(downloadButton).toBeVisible();

        // Start listening for download event and click download button
        const downloadPromise = page.waitForEvent('download');
        await downloadButton.click();

        // Get the download object
        const download = await downloadPromise;
        
        // Get the suggested filename from the download
        const filename = download.suggestedFilename();
        console.log(`Downloaded file: ${filename}`);
        expect(filename).toContain('.xlsx');

        // Save the downloaded file
        downloadedFilePath = path.join(downloadDir, filename);
        await download.saveAs(downloadedFilePath);

        // Verify the file was downloaded
        expect(fs.existsSync(downloadedFilePath)).toBeTruthy();
        console.log(`File saved to: ${downloadedFilePath}`);
    });

    test('Verify downloaded Excel file contents', async ({ page }) => {
        // Ensure download happened first
        if (!downloadedFilePath || !fs.existsSync(downloadedFilePath)) {
            test.skip();
        }

        // Read and verify the Excel file
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(downloadedFilePath);

        // Get the first worksheet
        const worksheet = workbook.getWorksheet('Sheet1');
        expect(worksheet).toBeDefined();

        // Verify the worksheet has data
        expect(worksheet?.rowCount).toBeGreaterThan(0);
        console.log(`Worksheet row count: ${worksheet?.rowCount}`);

        // Print some sample data from the worksheet
        let rowIndex = 1;
        worksheet?.eachRow((row) => {
            console.log(`Row ${rowIndex}: ${row.values}`);
            rowIndex++;
            if (rowIndex > 5) return; // Print first 5 rows as sample
        });
    });

    test('Verify file input field exists', async ({ page }) => {
        // Navigate to the page
        await page.goto('https://rahulshettyacademy.com/upload-download-test/');

        // Verify file input field exists - this is the critical element for testing
        const fileInput = page.locator('#fileinput');
        await expect(fileInput).toBeVisible();
        console.log('✓ File input field found and visible');
    });

    test('Download and modify Excel file (Full Flow)', async ({ page }) => {
        // Step 1: Navigate to page
        await page.goto('https://rahulshettyacademy.com/upload-download-test/');
        console.log('✓ Navigated to upload-download test page');

        // Step 2: Wait for download button and download file
        const downloadButton = page.getByRole('button', { name: 'Download' });
        await expect(downloadButton).toBeVisible();

        const downloadPromise = page.waitForEvent('download');
        await downloadButton.click();
        const download = await downloadPromise;

        const filename = download.suggestedFilename();
        const filePath = path.join(downloadDir, `modified_${filename}`);
        await download.saveAs(filePath);
        console.log(`✓ Downloaded file: ${filename}`);

        // Step 3: Read the Excel file
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet('Sheet1');

        console.log(`✓ Excel file loaded with ${worksheet?.rowCount} rows`);

        // Step 4: Modify the Excel file (example: update a cell)
        if (worksheet) {
            // Example: Update first data cell
            const cell = worksheet.getCell('B2');
            const originalValue = cell.value;
            cell.value = `Modified_${originalValue}`;
            console.log(`✓ Modified cell B2 from "${originalValue}" to "${cell.value}"`);

            // Save the modified file
            await workbook.xlsx.writeFile(filePath);
            console.log(`✓ Saved modified Excel file`);
        }

        // Step 5: Verify the upload input exists for re-uploading
        const fileInput = page.locator('#fileinput');
        await expect(fileInput).toBeVisible();
        console.log(`✓ File input field ready for upload`);

        // Step 6: Upload the modified file
        await fileInput.setInputFiles(filePath);
        console.log(`✓ Modified file uploaded`);

        // Wait a moment for the upload to process
        await page.waitForTimeout(2000);
        console.log('✓ Upload processed');
    });
});
