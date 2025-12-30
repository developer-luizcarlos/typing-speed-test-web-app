export function isValidKey(key: string): boolean {
	const validKeyRegex = /^[a-zA-Z;\.\-\'\"\,\/\?\:]$/g;

	return validKeyRegex.test(key);
}
