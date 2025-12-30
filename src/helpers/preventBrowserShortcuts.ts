export function preventBrowserShortcuts(event: KeyboardEvent) {
	const pressedKey = event.key;

	const triggerShortcutsKeys = ["/", "'"];

	const controlWasUsed = event.ctrlKey;

	const triggerShortcutsWithControlPressedKeys = [
		"b",
		"f",
		"g",
		"l",
		"k",
		"o",
		"p",
		"s",
		"t",
	];

	const wasPressedAnyTriggerShortcutWithControlKeys =
		triggerShortcutsWithControlPressedKeys.some(key => {
			return key === pressedKey;
		});

	const wasPressedAnyTriggerShortcutKey = triggerShortcutsKeys.some(
		key => {
			return key === pressedKey;
		},
	);

	const wasControlShortcutTriggered =
		controlWasUsed && wasPressedAnyTriggerShortcutWithControlKeys;

	const shouldPreventDefaultBehavior =
		wasControlShortcutTriggered || wasPressedAnyTriggerShortcutKey;

	if (shouldPreventDefaultBehavior) {
		return event.preventDefault();
	}
}
