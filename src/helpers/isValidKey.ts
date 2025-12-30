export function isValidKey(key: string): boolean {
	const validKeyRegex = /^[a-zA-Z;\.\-\'\"\,\/\?\:\s]$/g;

	return validKeyRegex.test(key);
}
