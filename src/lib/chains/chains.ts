import { EtherEvmChainProvider } from '$lib/chains/evm';
import type { ChainProvider } from '$lib/chains/types';

export const CHAINS: Record<string, ChainProvider> = {
	mainnet: new EtherEvmChainProvider("api.etherscan.io", "H7CSRSGHZSJJR83H1PU1AQBSPB5EGIRCED", "Mainnet", "/chains/mainnet.svg")
}
