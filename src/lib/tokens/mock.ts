import { TokenProvider } from '$lib/tokens/types';

export class MockTokenProvider extends TokenProvider {
	public name = 'Mock Token';
	public symbol = 'MT';
	public decimals = 18;

	public async getPrice(): Promise<number> {
		return 1;
	}
}
