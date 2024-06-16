import { getAddress } from 'viem';
import type { TokenProvider } from '$lib/tokens/types';
import type { Transaction } from '$lib/chains/types';

export const shortenHex = (hex: string, length: number, ellipsis = true): string => {
	const middle = ellipsis ? '…' : '...';

	return `${hex.slice(0, length + 2)}${middle}${hex.slice(-length)}`;
};

export const shortenAddress = (address: string, length = 4, ellipsis = true): string => {
	return shortenHex(getAddress(address), length, ellipsis);
};

export const shortenTx = (tx: string, length = 6, ellipsis = true): string => {
	return shortenHex(tx, length, ellipsis);
};

export const totalTxFeeStats = (
	transactions: Transaction[],
	tokenPrice: number,
	token: TokenProvider
) => {
	const totalTxFee = transactions.reduce((acc, tx) => acc + tx.gasPrice * BigInt(tx.gasUsed), 0n);
	const totalTxFeeEth = token.numberToUnits(totalTxFee);
	const totalTxFeeUsd = totalTxFeeEth * tokenPrice;

	return { totalTxFee, totalTxFeeEth, totalTxFeeUsd };
};
