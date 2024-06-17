import { createPublicClient, http } from 'viem';
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
