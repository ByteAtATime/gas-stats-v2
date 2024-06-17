import { createPublicClient, http, isAddress } from 'viem';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';

const publicClient = createPublicClient({
	chain: mainnet,
	transport: http()
});

export const getEnsAddress = async (name: string) => {
	let normalizedName: string;
	try {
		normalizedName = normalize(name);
	} catch {
		// Invalid ENS name
		return null;
	}

	return await publicClient.getEnsAddress({
		name: normalizedName
	});
};

export const getEnsName = async (address: string) => {
	if (!isAddress(address)) return null;

	return await publicClient.getEnsName({
		address
	});
};
