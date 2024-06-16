export abstract class TokenProvider {
	abstract name: string;
	abstract symbol: string;
	abstract decimals: number;

	abstract getPrice(): Promise<number>;

	numberToUnits(number: bigint): number {
		const halfDecimals = this.decimals / 2;

		const temp = number / 10n ** BigInt(Math.ceil(halfDecimals));

		return Number(temp) / 10 ** Math.floor(halfDecimals);
	}
}
