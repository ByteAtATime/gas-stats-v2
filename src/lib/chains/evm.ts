import type { ChainProvider, Transaction } from '$lib/chains/types';
import { EtherTokenProvider } from '$lib/tokens/ether';
import type { TokenProvider } from '$lib/tokens/types';
import { z } from 'zod';

export abstract class EvmChainProvider implements ChainProvider {
	public abstract name: string;
	public abstract token: TokenProvider;
	public abstract iconPath: string;

	protected constructor(
		protected apiUrl: string,
		protected apiKey: string,
		protected etherscanUrl: string
	) {}

	public async getBlockNumber(): Promise<bigint> {
		const res = await fetch(
			`https://${this.apiUrl}/api?module=proxy&action=eth_blockNumber&apikey=${this.apiKey}`
		);

		if (!res.ok) {
			throw new Error('Failed to fetch block number');
		}

		const data = await res.json();

		return BigInt(data.result);
	}

	async getTransactions(
		startBlock: bigint,
		endBlock: bigint,
		address: string
	): Promise<Transaction[]> {
		const etherscanTxSchema = z.object({
			hash: z.string(),
			from: z.string(),
			to: z.string(),
			value: z.string(),
			gas: z.string(),
			gasPrice: z.string(),
			isError: z.string(),
			gasUsed: z.string(),
			timeStamp: z.string()
		});

		const res = await fetch(
			`https://${this.apiUrl}/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${this.apiKey}`
		);

		if (!res.ok) {
			throw new Error('Failed to fetch transactions');
		}

		const data = await res.json();

		return data.result.map((tx: unknown) => {
			const parsed = etherscanTxSchema.parse(tx);

			return {
				timestamp: parseInt(parsed.timeStamp),
				hash: parsed.hash,
				gasPrice: BigInt(parsed.gasPrice),
				gasUsed: parseInt(parsed.gasUsed),
				gasLimit: parseInt(parsed.gas),
				from: parsed.from,
				to: parsed.to,
				value: BigInt(parsed.value),
				reverted: parsed.isError === '1'
			} as Transaction;
		});
	}

	getAddressExplorerUrl(address: string): string | undefined {
		return `https://${this.etherscanUrl}/address/${address}`;
	}

	getTxExplorerUrl(tx: string): string | undefined {
		return `https://${this.etherscanUrl}/tx/${tx}`;
	}
}

export class EtherEvmChainProvider extends EvmChainProvider {
	public token = new EtherTokenProvider();

	public constructor(
		apiUrl: string,
		apiKey: string,
		etherscanUrl: string,
		public name: string,
		public iconPath: string
	) {
		super(apiUrl, apiKey, etherscanUrl);
	}
}
