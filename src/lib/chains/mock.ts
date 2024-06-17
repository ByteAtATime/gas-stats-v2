import type { ChainProvider, Transaction } from '$lib/chains/types';
import { MockTokenProvider } from '$lib/tokens/mock';

export class MockChainProvider implements ChainProvider {
	public token = new MockTokenProvider();
	public name = 'Mock Chain';
	public iconPath = '/mainnet.svg';

	public async getBlockNumber(): Promise<bigint> {
		return 1n;
	}

	public async getTransactions(
		startBlock: bigint,
		endBlock: bigint,
		address: string
	): Promise<Transaction[]> {
		return [
			{
				timestamp: 1,
				hash: '0x0000000001',
				gasPrice: 50_000_000_000n, // 50 gwei
				gasUsed: 1_000_000_000,
				gasLimit: 1_000_000_000,
				from: '0xdeadbeef',
				to: '0xdeadbeef',
				value: 0n,
				reverted: false
			},
			{
				timestamp: 1,
				hash: '0x0000000002',
				gasPrice: 100_000_000_000n, // 100 gwei
				gasUsed: 1_000_000_000,
				gasLimit: 1_000_000_000,
				from: '0xdeadbeef',
				to: '0xdeadbeef',
				value: 0n,
				reverted: false
			}
		];
	}

	getAddressExplorerUrl(address: string): string | undefined {
		return undefined;
	}

	getTxExplorerUrl(tx: string): string | undefined {
		return undefined;
	}
}
