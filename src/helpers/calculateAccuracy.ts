export function calculateAccuracy(
	correctCases: number,
	totalCases: number,
): number {
	return Math.floor((correctCases / totalCases) * 100);
}
