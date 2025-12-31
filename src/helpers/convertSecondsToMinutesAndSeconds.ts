export function convertSecondsToMinutesAndSeconds(
	seconds: number,
): string {
	const minutes = Math.floor(seconds / 60);
	const secondsLeft = Math.round(seconds % 60);

	const minutesOuput = minutes < 10 ? `0${minutes}` : `${minutes}`;
	const secondsLeftOutput =
		secondsLeft < 10 ? `0${secondsLeft}` : `${secondsLeft}`;

	return `${minutesOuput}:${secondsLeftOutput}`;
}
