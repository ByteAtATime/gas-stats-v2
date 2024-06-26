import type { TokenProvider } from '$lib/tokens/types';

export type Transaction = {
	timestamp: number;
	hash: string;
	gasPrice: bigint;
	gasUsed: number;
	gasLimit: number;
	from: string;
	to: string;
	value: bigint;
	reverted: boolean;
};

export interface ChainProvider {
	token: TokenProvider;
	name: string;
	iconPath: string;

	getBlockNumber(): Promise<bigint>;
	getTransactions(startBlock: bigint, endBlock: bigint, address: string): Promise<Transaction[]>;

	getAddressExplorerUrl(address: string): string | undefined;
	getTxExplorerUrl(tx: string): string | undefined;
}
