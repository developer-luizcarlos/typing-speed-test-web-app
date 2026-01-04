export const calculateAccuracy = (
	correctCases: number,
	totalCases: number,
): number => {
	return Math.floor((correctCases / totalCases) * 100);
};
