import { expect, test } from '@playwright/test';

test.describe('stats page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/0x34aA3F359A9D614239015126635CE7732c18fDF3?chain=mock');
	});

	test('heading should display shortened address', async ({ page }) => {
		const heading = await page.locator('h1').textContent();
		expect(heading).toContain('Stats for 0x34aA…fDF3');
	});

	test('should show a total tx fee card', async ({ page }) => {
		const totalTxFeeCard = page.locator(
			'div:has-text("You\'ve spent a total of 150 MT on transaction fees alone! That\'s worth about $150.00. 🤯")'
		);
		expect(totalTxFeeCard).not.toBeNull();
	});

	test('should show an average tx fee card', async ({ page }) => {
		const averageTxFeeCard = page.locator(
			'div:has-text("Averaged over your 2 transactions sent, you\'ve spent about $75.00 per transaction.")'
		);
		expect(averageTxFeeCard).not.toBeNull();
	});

	test('should show a highest gas price card', async ({ page }) => {
		const highestGasPriceCard = page.locator(
			'div:has-text("The transaction with the highest gas price was 0x000000…000002 with a gas price of 100.000 gwei.")'
		);
		expect(highestGasPriceCard).not.toBeNull();
	});

	test('should have a table of all transactions', async ({ page }) => {
		const table = page.locator('table');
		expect(table).not.toBeNull();

		const rows = await table.locator('tr').count();
		expect(rows).toBe(3); // 2 transactions + header row
	});
});
