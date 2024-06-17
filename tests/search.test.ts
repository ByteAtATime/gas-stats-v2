import { expect, type Page, test } from '@playwright/test';

const TEST_ADDRESS = '0x34aA3F359A9D614239015126635CE7732c18fDF3'; // austingriffith.eth
const TEST_ENS = 'austingriffith.eth';
const TEST_NETWORK = 'Mainnet';

const fillSearchForm = async (page: Page, addressOrENS?: string, network?: string) => {
	if (addressOrENS) {
		await page.getByPlaceholder('Enter an address or ENS...').fill(addressOrENS);
	}

	if (network) {
		await page.getByPlaceholder('Choose a network...').click();
		await page.getByText(network, { exact: true }).click();
	}
};

test.describe('home page search form', () => {
	test('address/ENS input is required', async ({ page }) => {
		await page.goto('/');
		await page.getByLabel('Search').click();

		const validationMessage = await page
			.getByPlaceholder('Enter an address or ENS...')
			.evaluate((el) => (el as HTMLInputElement).validationMessage);

		expect(validationMessage).toBe('Please fill out this field.');
	});

	test('network is required', async ({ page }) => {
		await page.goto('/');
		await fillSearchForm(page, TEST_ADDRESS);
		await page.getByLabel('Search').click();

		const validationMessage = await page
			.locator('.svelte-select select')
			.evaluate((el) => (el as HTMLInputElement).validationMessage);

		expect(validationMessage).toBe('Please select an item in the list.');
	});

	test('an ENS name can be resolved', async ({ page }) => {
		await page.goto('/');

		await fillSearchForm(page, TEST_ENS, TEST_NETWORK);

		await page.getByLabel('Search').click();
		await page.waitForURL(/0x[0-9a-fA-F]{40}/);

		expect(page.url()).toContain(TEST_ADDRESS);
	});

	test('an address can be resolved', async ({ page }) => {
		await page.goto('/');

		await fillSearchForm(page, TEST_ADDRESS, TEST_NETWORK);

		await page.getByLabel('Search').click();
		await page.waitForURL(/0x[0-9a-fA-F]{40}/);

		expect(page.url()).toContain(TEST_ADDRESS);
	});

	test('an invalid address/ENS shows an error', async ({ page }) => {
		await page.goto('/');

		await fillSearchForm(page, 'this is an invalid address (and is not an ENS)', TEST_NETWORK);

		await page.getByLabel('Search').click();

		const validationMessage = await page
			.getByPlaceholder('Enter an address or ENS...')
			.evaluate((el) => (el as HTMLInputElement).validationMessage);

		expect(validationMessage).toBe('Invalid address');
	});
});
