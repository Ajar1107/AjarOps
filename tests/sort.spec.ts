import { test, expect } from '@playwright/test';

test.describe('Table Sorting', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the page before each test
        await page.goto('https://rahulshettyacademy.com/upload-download-test/');
        await page.waitForLoadState('networkidle');
    });

    test('Sort by Fruit Name - Ascending', async ({ page }) => {
        // Step 1: Click Fruit Name column header to sort ascending
        await page.getByRole('columnheader', { name: /Fruit Name/i }).click();
        
        // Get all fruit names from the table
        const rows = page.getByRole('row');
        const fruitNames = [];
        
        // Extract fruit names from table cells
        for (let i = 1; i < await rows.count(); i++) {
            const cells = rows.nth(i).getByRole('cell');
            const fruitCell = await cells.nth(1).textContent();
            fruitNames.push(fruitCell?.trim() || '');
        }
        
        // Expected order: Apple, Banana, Kivi, Mango, Orange, Papaya (ascending)
        const expectedOrder = ['Apple', 'Banana', 'Kivi', 'Mango', 'Orange', 'Papaya'];
        
        console.log(`Ascending order: ${fruitNames.join(', ')}`);
        expect(fruitNames).toEqual(expectedOrder);
    });

    test('Sort by Fruit Name - Descending', async ({ page }) => {
        // Step 1: Click Fruit Name header once to sort ascending
        await page.getByRole('columnheader', { name: /Fruit Name/i }).click();
        
        // Step 2: Click Fruit Name header again to sort descending
        await page.getByRole('columnheader', { name: /Fruit Name/i }).click();
        
        // Get all fruit names from the table
        const rows = page.getByRole('row');
        const fruitNames = [];
        
        for (let i = 1; i < await rows.count(); i++) {
            const cells = rows.nth(i).getByRole('cell');
            const fruitCell = await cells.nth(1).textContent();
            fruitNames.push(fruitCell?.trim() || '');
        }
        
        // Expected order: Papaya, Orange, Mango, Kivi, Banana, Apple (descending)
        const expectedOrder = ['Papaya', 'Orange', 'Mango', 'Kivi', 'Banana', 'Apple'];
        
        console.log(`Descending order: ${fruitNames.join(', ')}`);
        expect(fruitNames).toEqual(expectedOrder);
    });

    test('Sort by Price - Ascending', async ({ page }) => {
        // Step 1: Click Price column header to sort ascending
        await page.getByRole('columnheader', { name: /Price/i }).click();
        
        // Get all prices from the table
        const rows = page.getByRole('row');
        const prices = [];
        
        for (let i = 1; i < await rows.count(); i++) {
            const cells = rows.nth(i).getByRole('cell');
            const priceCell = await cells.nth(3).textContent();
            prices.push(parseInt(priceCell?.trim() || '0'));
        }
        
        // Expected order: 69, 187, 199, 299, 345, 399 (ascending)
        const expectedOrder = [69, 187, 199, 299, 345, 399];
        
        console.log(`Ascending price order: ${prices.join(', ')}`);
        expect(prices).toEqual(expectedOrder);
    });

    test('Sort by Price - Descending', async ({ page }) => {
        // Step 1: Click Price header once to sort ascending
        await page.getByRole('columnheader', { name: /Price/i }).click();
        
        // Step 2: Click Price header again to sort descending
        await page.getByRole('columnheader', { name: /Price/i }).click();
        
        // Get all prices from the table
        const rows = page.getByRole('row');
        const prices = [];
        
        for (let i = 1; i < await rows.count(); i++) {
            const cells = rows.nth(i).getByRole('cell');
            const priceCell = await cells.nth(3).textContent();
            prices.push(parseInt(priceCell?.trim() || '0'));
        }
        
        // Expected order: 399, 345, 299, 199, 187, 69 (descending)
        const expectedOrder = [399, 345, 299, 199, 187, 69];
        
        console.log(`Descending price order: ${prices.join(', ')}`);
        expect(prices).toEqual(expectedOrder);
    });

    test('Sort by Color - Ascending', async ({ page }) => {
        // Step 1: Click Color column header to sort ascending
        await page.getByRole('columnheader', { name: /Color/i }).click();
        
        // Get all colors from the table
        const rows = page.getByRole('row');
        const colors = [];
        
        for (let i = 1; i < await rows.count(); i++) {
            const cells = rows.nth(i).getByRole('cell');
            const colorCell = await cells.nth(2).textContent();
            colors.push(colorCell?.trim() || '');
        }
        
        console.log(`Color sort ascending: ${colors.join(', ')}`);
        
        // Verify sorted alphabetically
        const sortedColors = [...colors].sort();
        expect(colors).toEqual(sortedColors);
    });

    test('Sort by Season - Ascending', async ({ page }) => {
        // Step 1: Click Season column header to sort ascending
        await page.getByRole('columnheader', { name: /Season/i }).click();
        
        // Get all seasons from the table
        const rows = page.getByRole('row');
        const seasons = [];
        
        for (let i = 1; i < await rows.count(); i++) {
            const cells = rows.nth(i).getByRole('cell');
            const seasonCell = await cells.nth(4).textContent();
            seasons.push(seasonCell?.trim() || '');
        }
        
        console.log(`Season sort ascending: ${seasons.join(', ')}`);
        
        // Verify sorted alphabetically
        const sortedSeasons = [...seasons].sort();
        expect(seasons).toEqual(sortedSeasons);
    });

    test('Sort by S No - Ascending', async ({ page }) => {
        // First sort by another column to change order
        await page.getByRole('columnheader', { name: /Fruit Name/i }).click();
        
        // Step 1: Click S No column header to sort
        await page.getByRole('columnheader', { name: /S No/i }).click();
        
        // Get all S No values from the table
        const rows = page.getByRole('row');
        const sNoValues = [];
        
        for (let i = 1; i < await rows.count(); i++) {
            const cells = rows.nth(i).getByRole('cell');
            const sNoCell = await cells.nth(0).textContent();
            sNoValues.push(parseInt(sNoCell?.trim() || '0'));
        }
        
        // Expected order: 1, 2, 3, 4, 5, 6 (ascending)
        const expectedOrder = [1, 2, 3, 4, 5, 6];
        
        console.log(`S No sort ascending: ${sNoValues.join(', ')}`);
        expect(sNoValues).toEqual(expectedOrder);
    });

    test('Sort by S No - Descending', async ({ page }) => {
        // First sort by another column to change order
        await page.getByRole('columnheader', { name: /Fruit Name/i }).click();
        
        // Sort by S No twice to go ascending then descending
        await page.getByRole('columnheader', { name: /S No/i }).click();
        await page.getByRole('columnheader', { name: /S No/i }).click();
        
        // Get all S No values from the table
        const rows = page.getByRole('row');
        const sNoValues = [];
        
        for (let i = 1; i < await rows.count(); i++) {
            const cells = rows.nth(i).getByRole('cell');
            const sNoCell = await cells.nth(0).textContent();
            sNoValues.push(parseInt(sNoCell?.trim() || '0'));
        }
        
        // Expected order: 6, 5, 4, 3, 2, 1 (descending)
        const expectedOrder = [6, 5, 4, 3, 2, 1];
        
        console.log(`S No sort descending: ${sNoValues.join(', ')}`);
        expect(sNoValues).toEqual(expectedOrder);
    });

    test('Data integrity maintained during sorting', async ({ page }) => {
        // Sort by Fruit Name
        await page.getByRole('columnheader', { name: /Fruit Name/i }).click();
        
        // Verify that Mango always has Yellow color and 299 price after sort
        const rows = page.getByRole('row');
        let mangoFound = false;
        
        for (let i = 1; i < await rows.count(); i++) {
            const cells = rows.nth(i).getByRole('cell');
            const fruitCell = await cells.nth(1).textContent();
            
            if (fruitCell?.includes('Mango')) {
                mangoFound = true;
                const colorCell = await cells.nth(2).textContent();
                const priceCell = await cells.nth(3).textContent();
                
                expect(colorCell?.trim()).toBe('Yellow');
                expect(priceCell?.trim()).toBe('299');
                console.log('✓ Mango data integrity verified after sort');
            }
        }
        
        expect(mangoFound).toBe(true);
        
        // Sort by Price and verify Apple stays Red and 345
        await page.getByRole('columnheader', { name: /Price/i }).click();
        
        let appleFound = false;
        for (let i = 1; i < await rows.count(); i++) {
            const cells = rows.nth(i).getByRole('cell');
            const fruitCell = await cells.nth(1).textContent();
            
            if (fruitCell?.includes('Apple')) {
                appleFound = true;
                const colorCell = await cells.nth(2).textContent();
                const priceCell = await cells.nth(3).textContent();
                
                expect(colorCell?.trim()).toBe('Red');
                expect(priceCell?.trim()).toBe('345');
                console.log('✓ Apple data integrity verified after sort');
            }
        }
        
        expect(appleFound).toBe(true);
    });

    test('Multiple consecutive sorts work correctly', async ({ page }) => {
        // First sort by Fruit Name (ascending)
        await page.getByRole('columnheader', { name: /Fruit Name/i }).click();
        let rows = page.getByRole('row');
        let firstSort = [];
        for (let i = 1; i < await rows.count(); i++) {
            const cells = rows.nth(i).getByRole('cell');
            firstSort.push(await cells.nth(1).textContent());
        }
        expect(firstSort[0]?.includes('Apple')).toBe(true);
        
        // Sort by Price (ascending)
        await page.getByRole('columnheader', { name: /Price/i }).click();
        rows = page.getByRole('row');
        let priceSort = [];
        for (let i = 1; i < await rows.count(); i++) {
            const cells = rows.nth(i).getByRole('cell');
            priceSort.push(parseInt((await cells.nth(3).textContent()) || '0'));
        }
        expect(priceSort[0]).toBe(69); // Banana should be first (lowest price)
        
        // Sort back by Fruit Name (descending)
        await page.getByRole('columnheader', { name: /Fruit Name/i }).click();
        await page.getByRole('columnheader', { name: /Fruit Name/i }).click();
        rows = page.getByRole('row');
        let descendingSort = [];
        for (let i = 1; i < await rows.count(); i++) {
            const cells = rows.nth(i).getByRole('cell');
            descendingSort.push(await cells.nth(1).textContent());
        }
        expect(descendingSort[0]?.includes('Papaya')).toBe(true);
        
        console.log('✓ Multiple consecutive sorts work correctly');
    });
});