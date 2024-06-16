import { getAddress } from 'viem';

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
