import {Difficult} from "@/types/difficult.types";
import {TextsObject} from "@/types/textsObject.types";

export const getTextBasedOnGivenDifficultAndLevel = (
	textsObject: TextsObject,
	difficult: Difficult,
	level: number,
) => {
	// Converted to match textsObject fields
	const lowerCaseDifficult =
		difficult.toLowerCase() as keyof typeof textsObject;

	const textsInDifficult = textsObject[lowerCaseDifficult];

	const textInDifficultOfGivenLevel = textsInDifficult[level - 1].text;

	return textInDifficultOfGivenLevel;
};
