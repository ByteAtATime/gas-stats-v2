import { EtherEvmChainProvider } from '$lib/chains/evm';
import type { ChainProvider } from '$lib/chains/types';

export const CHAINS: Record<string, ChainProvider> = {
	mainnet: new EtherEvmChainProvider(
		'api.etherscan.io',
		'H7CSRSGHZSJJR83H1PU1AQBSPB5EGIRCED',
		'etherscan.io',
		'Mainnet',
		'/chains/mainnet.svg'
	),
	optimism: new EtherEvmChainProvider(
		'api-optimistic.etherscan.io',
		'AIYRKCZ4VGMVD696E4URYWZVYMZAMI93HS',
		'optimistic.etherscan.io',
		'Optimism',
		'/chains/optimism.svg'
	)
};
