import {TextsObject} from "@/types/textsObject.types";

export const fetchTextsObject = async (): Promise<TextsObject> => {
	const response = await fetch("data.json");
	const textsObject = (await response.json()) as TextsObject;

	return textsObject;
};
