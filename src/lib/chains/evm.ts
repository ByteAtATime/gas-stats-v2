import type { ChainProvider, Transaction } from '$lib/chains/types';
import { EtherTokenProvider } from '$lib/tokens/ether';
import type { TokenProvider } from '$lib/tokens/types';
import { z } from 'zod';

export abstract class EvmChainProvider implements ChainProvider {
	public abstract name: string;
	public abstract token: TokenProvider;
	public abstract iconPath: string;

	protected constructor(
		protected etherscanUrl: string,
		protected etherscanApiKey: string
	) {}

	public async getBlockNumber(): Promise<bigint> {
		const res = await fetch(
			`https://${this.etherscanUrl}/api?module=proxy&action=eth_blockNumber&apikey=${this.etherscanApiKey}`
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
			gasUsed: z.string()
		});

		const res = await fetch(
			`https://${this.etherscanUrl}/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${this.etherscanApiKey}`
		);

		if (!res.ok) {
			throw new Error('Failed to fetch transactions');
		}

		const data = await res.json();

		return data.result.map((tx: unknown) => {
			const parsed = etherscanTxSchema.parse(tx);

			return {
				timestamp: 0,
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
}

export class EtherEvmChainProvider extends EvmChainProvider {
	public token = new EtherTokenProvider();

	public constructor(
		etherscanUrl: string,
		etherscanApiKey: string,
		public name: string,
		public iconPath: string
	) {
		super(etherscanUrl, etherscanApiKey);
	}
}
