# Upload Download Test - Flow & Locators Guide

## Page URL
https://rahulshettyacademy.com/upload-download-test/

## Manual Flow Steps (to perform in browser)

### Step 1: Navigate to Page
- Open: https://rahulshettyacademy.com/upload-download-test/
- Wait for page to fully load (network idle)

### Step 2: Inspect Page Elements
**Download Button**
- Look for a button with text "Download"
- Locator strategies:
  - `page.getByRole('button', { name: 'Download' })`
  - `page.getByRole('button', { name: /download/i })`
  - `page.locator('button:has-text("Download")')`

**File Input Field**
- ID: `#fileinput`
- This field is for uploading files after modification
- Locator: `page.locator('#fileinput')`

**Data Table**
- The page displays a table with data rows
- Locator for rows: `page.getByRole('row')`
- Individual cells follow pattern: `#cell-[row]-[column]`

### Step 3: Click Download Button
1. Right-click on the Download button → Inspect Element
2. Look for the button HTML structure
3. Note any data attributes or classes
4. Click the button and observe the downloaded file

### Step 4: Verify Downloaded File
- File format: Excel (.xlsx)
- File location: Downloads folder
- Open file to verify it contains data
- Typical sheet name: "Sheet1"

### Step 5: Modify and Re-upload
1. Open downloaded Excel file
2. Modify any cell value (e.g., change B2)
3. Save the file
4. Locate file input (#fileinput)
5. Select the modified file
6. Observe upload confirmation

## Playwright Locators Reference

### Primary Locators (Real)
```javascript
// Download button
page.getByRole('button', { name: 'Download' })

// File input for upload
page.locator('#fileinput')

// Table rows
page.getByRole('row')

// Table cells (pattern-based)
page.locator('#cell-2-1')  // Row 2, Column 1
```

### Alternative Locators (Fallback)
```javascript
// If role query doesn't work
page.locator('button:has-text("Download")')
page.getByText(/download/i)

// Find all buttons
page.locator('button')

// Find all inputs
page.locator('input')
```

## Test Cases Created

### 1. **UploadDownload.spec.ts** (Original)
Full end-to-end test with Excel manipulation
- Download file
- Verify contents
- Modify data
- Upload modified file

### 2. **UploadDownloadDetailed.spec.ts** (Debugging)
Detailed inspection tests with logging
- Page load verification
- Element discovery with multiple strategies
- Screenshot capture for debugging
- Table structure inspection
- Upload functionality test

## Key Testing Concepts

### Download Handling
```javascript
const downloadPromise = page.waitForEvent('download');
await downloadButton.click();
const download = await downloadPromise;
const filename = download.suggestedFilename();
await download.saveAs(filePath);
```

### File Upload
```javascript
const fileInput = page.locator('#fileinput');
await fileInput.setInputFiles(filePath);
```

### Excel File Manipulation
```javascript
import * as ExcelJS from 'exceljs';

const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile(filePath);
const worksheet = workbook.getWorksheet('Sheet1');

// Read cell
const value = worksheet.getCell('B2').value;

// Modify cell
worksheet.getCell('B2').value = 'New Value';
await workbook.xlsx.writeFile(filePath);
```

## Troubleshooting Locators

If tests fail, run the detailed test to diagnose:
```bash
npx playwright test UploadDownloadDetailed.spec.ts --headed
```

This will:
1. Log all buttons found on page
2. Identify which locator strategies work
3. Generate screenshots for manual inspection
4. Show actual table structure

## Running Tests

Once playwright browsers are installed:

```bash
# Run all upload/download tests
npx playwright test *UploadDownload* --headed

# Run specific test with details
npx playwright test UploadDownloadDetailed.spec.ts -g "navigate and verify page loads" --headed

# Run with verbose output
npx playwright test *UploadDownload* --headed --debug
```

## Expected Results

### Successful Download Test:
✓ Page loads
✓ Download button found and clicked
✓ File downloaded (filename contains .xlsx)
✓ File saved to downloads directory
✓ Excel file contains data rows

### Successful Upload Test:
✓ File input field exists (#fileinput)
✓ File can be uploaded via setInputFiles()
✓ Page processes upload without errors
