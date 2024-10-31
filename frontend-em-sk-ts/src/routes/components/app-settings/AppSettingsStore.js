import { get, writable } from 'svelte/store';

export const appSettingsOpen = writable(false);
console.log(`appSettingsOpen Store: ${get(appSettingsOpen)}`);
