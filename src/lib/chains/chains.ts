import { EtherEvmChainProvider } from '$lib/chains/evm';
import type { ChainProvider } from '$lib/chains/types';
import { MockChainProvider } from '$lib/chains/mock';
import { PolygonChainProvider } from '$lib/chains/polygon';

export const CHAINS: Record<string, ChainProvider> = {
	mainnet: new EtherEvmChainProvider(
		'api.etherscan.io',
		'H7CSRSGHZSJJR83H1PU1AQBSPB5EGIRCED',
		'etherscan.io',
		'Mainnet',
		'/chains/mainnet.svg'
	),
	polygon: new PolygonChainProvider(),
	optimism: new EtherEvmChainProvider(
		'api-optimistic.etherscan.io',
		'AIYRKCZ4VGMVD696E4URYWZVYMZAMI93HS',
		'optimistic.etherscan.io',
		'Optimism',
		'/chains/optimism.svg'
	),
	arbitrum: new EtherEvmChainProvider(
		'api.arbiscan.io',
		'WMG9T6GDBPYBKVKT7S8TG1YNAIBY4K1Q11',
		'arbiscan.io',
		'Arbitrum',
		'/chains/arbitrum.svg'
	),
	sepolia: new EtherEvmChainProvider(
		'api-sepolia.etherscan.io',
		'H7CSRSGHZSJJR83H1PU1AQBSPB5EGIRCED',
		'sepolia.etherscan.io',
		'Sepolia',
		'/chains/mainnet.svg'
	),
	mock: new MockChainProvider()
};
