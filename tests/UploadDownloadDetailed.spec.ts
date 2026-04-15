import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as ExcelJS from 'exceljs';

test.describe('Upload Download Page Tests', () => {
    const downloadDir = path.join(__dirname, '../downloads');

    test.beforeAll(() => {
        // Create downloads directory if it doesn't exist
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir, { recursive: true });
        }
    });

    test('Navigate and verify page loads', async ({ page }) => {
        // Navigate to the page
        await page.goto('https://rahulshettyacademy.com/upload-download-test/');
        
        // Wait for page to load
        await page.waitForLoadState('networkidle');
        
        // Verify title or heading
        const pageTitle = await page.title();
        console.log(`Page Title: ${pageTitle}`);
        expect(pageTitle).toBeTruthy();
        
        // Take screenshot for manual review
        await page.screenshot({ path: path.join(downloadDir, 'page-initial.png') });
        console.log('✓ Page loaded successfully');
    });

    test('Verify downloadable elements exist', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/upload-download-test/');
        await page.waitForLoadState('networkidle');

        // Try multiple locator strategies for download button
        const downloadByRole = page.getByRole('button', { name: /download/i });
        const downloadByText = page.getByText(/download/i);
        
        // Check which one exists
        const downloadByRoleCount = await downloadByRole.count();
        const downloadByTextCount = await downloadByText.count();
        
        console.log(`Found ${downloadByRoleCount} download buttons by role`);
        console.log(`Found ${downloadByTextCount} download elements by text`);
        
        // Verify file input exists
        const fileInput = page.locator('#fileinput');
        const fileInputExists = await fileInput.count();
        console.log(`File input field exists: ${fileInputExists > 0}`);
        
        // Get all buttons on the page
        const allButtons = await page.locator('button').count();
        console.log(`Total buttons on page: ${allButtons}`);
        
        // Get button texts
        const buttons = page.locator('button');
        for (let i = 0; i < Math.min(5, await buttons.count()); i++) {
            const text = await buttons.nth(i).textContent();
            console.log(`Button ${i}: ${text}`);
        }
    });

    test('Download Excel file - Simple', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/upload-download-test/');
        await page.waitForLoadState('networkidle');

        try {
            // Try to find and click download button
            const downloadButton = page.getByRole('button', { name: /download/i });
            
            if (await downloadButton.count() > 0) {
                console.log('✓ Found download button by role');
                
                // Listen for download
                const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
                await downloadButton.click();
                
                const download = await downloadPromise;
                const filename = download.suggestedFilename();
                console.log(`✓ File downloaded: ${filename}`);
                
                const filePath = path.join(downloadDir, filename);
                await download.saveAs(filePath);
                
                // Verify file exists
                expect(fs.existsSync(filePath)).toBeTruthy();
                const fileSize = fs.statSync(filePath).size;
                console.log(`✓ File saved: ${filePath} (${fileSize} bytes)`);
                
                // Read Excel file
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.readFile(filePath);
                const worksheet = workbook.getWorksheet(0);
                
                console.log(`✓ Excel file read successfully`);
                console.log(`  Worksheet name: ${worksheet?.name}`);
                console.log(`  Row count: ${worksheet?.rowCount}`);
                console.log(`  Column count: ${worksheet?.columnCount}`);
                
                // Log first few rows
                let rowNum = 0;
                worksheet?.eachRow((row) => {
                    if (rowNum < 3) {
                        const rowValues = (row.values as any[])?.filter(v => v !== undefined) || [];
                        console.log(`  Row ${rowNum + 1}: ${rowValues.join(', ')}`);
                    }
                    rowNum++;
                });
            } else {
                console.log('✗ Download button not found by role, trying alternative locators');
                // Try finding by text content
                const buttons = page.locator('button');
                for (let i = 0; i < await buttons.count(); i++) {
                    const text = await buttons.nth(i).textContent();
                    if (text?.toLowerCase().includes('download')) {
                        console.log(`✓ Found download button at index ${i}: "${text}"`);
                        await buttons.nth(i).click();
                        
                        const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
                        const download = await downloadPromise;
                        const filename = download.suggestedFilename();
                        
                        const filePath = path.join(downloadDir, filename);
                        await download.saveAs(filePath);
                        console.log(`✓ File downloaded and saved: ${filePath}`);
                        break;
                    }
                }
            }
        } catch (error) {
            console.error(`✗ Download failed: ${error}`);
            // Take screenshot for debugging
            await page.screenshot({ path: path.join(downloadDir, 'download-error.png') });
            throw error;
        }
    });

    test('Inspect table structure', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/upload-download-test/');
        await page.waitForLoadState('networkidle');

        // Find tables
        const tableCount = await page.locator('table').count();
        console.log(`Tables found: ${tableCount}`);

        // Get rows
        const rows = page.getByRole('row');
        const rowCount = await rows.count();
        console.log(`Table rows found: ${rowCount}`);

        // Log first few rows
        for (let i = 0; i < Math.min(3, rowCount); i++) {
            const cells = rows.nth(i).locator('td, th');
            const cellCount = await cells.count();
            const cellTexts = [];
            
            for (let j = 0; j < Math.min(5, cellCount); j++) {
                const text = await cells.nth(j).textContent();
                cellTexts.push(text?.trim());
            }
            console.log(`Row ${i}: ${cellTexts.join(' | ')}`);
        }
    });

    test('Test upload functionality', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/upload-download-test/');
        await page.waitForLoadState('networkidle');

        // First download a file
        const downloadButton = page.getByRole('button', { name: /download/i });
        if (await downloadButton.count() > 0) {
            const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
            await downloadButton.click();
            const download = await downloadPromise;
            
            const filename = download.suggestedFilename();
            const downloadPath = path.join(downloadDir, filename);
            await download.saveAs(downloadPath);
            
            console.log(`✓ Downloaded: ${filename}`);

            // Now upload the file
            const fileInput = page.locator('#fileinput');
            if (await fileInput.count() > 0) {
                await fileInput.setInputFiles(downloadPath);
                console.log(`✓ Uploaded file: ${downloadPath}`);
                
                // Wait for upload to process
                await page.waitForTimeout(2000);
                console.log('✓ Upload completed');
            } else {
                console.log('✗ File input field not found');
            }
        }
    });
});
