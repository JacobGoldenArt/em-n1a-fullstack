<script lang="js">
// @ts-nocheck

	import {
		FileUp,
		FolderUp,
		MicVocal,
		Moon,
		SlidersHorizontal,
		SquarePlus,
		Sun
	} from 'lucide-svelte';
	import { mode, toggleMode } from 'mode-watcher';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { appSettingsOpen } from './AppSettingsStore.js';

	// $effect(() => {
	// 	console.log(`appSettingsOpen from AppSettingsNav: ${$appSettingsOpen}`);
	// });


	// Toggle States

	let userVoiceModeActive = $state(false);
	let darkModeActive = $state(false);

	let darkModeIsActive = () => {
		let getMode = get(mode);
		if (getMode === 'dark') {
			darkModeActive = true;
			return true;
		} else {
			darkModeActive = false;
			return false;
		}
	};

	const handleModeChange = () => {
		toggleMode();
		darkModeIsActive();
	};

	onMount(() => {
		darkModeIsActive();
	});

	// $inspect(`darkModeActive: ${darkModeActive}, appSettingsOpen: ${appSettingsOpen}, userVoiceModeActive: ${userVoiceModeActive}`)

	const appSettingsItems = $state([
		{
			id: 1,
			name: 'Toggle App Settings',
			icon: SlidersHorizontal,
			iconIsActive: false,
			action: () => {
				console.log('App Settings clicked');
				let toggleAppSettings = () => {
					let currentValue = false;
					appSettingsOpen.subscribe((value) => {
						currentValue = value;
					});
					appSettingsOpen.set(!currentValue);
				};
				toggleAppSettings();
			}
		},
		{
			id: 2,
			name: 'User Voice Mode',
			icon: MicVocal,
			iconIsActive: false,
			action: () => {
				console.log('User Voice Mode clicked');
				let toggleUserVoiceMode = () => {
					userVoiceModeActive = !userVoiceModeActive;
				};
				toggleUserVoiceMode();
			}
		},
		{
			id: 3,
			name: 'Upload File',
			icon: FileUp,
			iconIsActive: false,
			action: () => {
				console.log('Upload File clicked');
				alert('Upload File clicked');
				this.iconIsActive = !this.iconIsActive;
			}
		},
		{
			id: 4,
			name: 'Upload Folder',
			icon: FolderUp,
			iconIsActive: false,
			action: () => {
				console.log('Upload Folder clicked');
				alert('Upload Folder clicked');
				this.iconIsActive = !this.iconIsActive;
			}
		},
		{
			id: 5,
			name: 'New Session',
			icon: SquarePlus,
			iconIsActive: false,
			action: () => {
				console.log('New Session clicked');
				alert('New Session clicked');
				this.iconIsActive = !this.iconIsActive;
			}
		}
	]);
</script>


	<div class="menu top-menu">
		{#each appSettingsItems as item}
			{@render settingsIcons(item)}
		{/each}
	</div>

	<div class="menu bottom-menu">
		{@render modeToggle()}
	</div>


{#snippet settingsIcons(item)}
	<button
		onclick={() => {
			item.action();
			item.iconIsActive === false ? (item.iconIsActive = true) : (item.iconIsActive = false);
			console.log(`item.iconIsActive: ${item.iconIsActive}`);
		}}
		title={item.name}
		class="icon {item.iconIsActive ? 'active' : ''}"
	>
		{#if item.icon}
			<item.icon />
		{/if}
	</button>
{/snippet}

{#snippet modeToggle()}
	<button onclick={handleModeChange} class="icon" title="Toggle Dark Mode">
		{#if darkModeActive}
			<Moon />
		{:else}
			<Sun />
		{/if}
	</button>
{/snippet}

<style>


.menu {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px 0px;
    gap: 10px;
    width: 60px;
}

	.bottom-menu {
		justify-content: flex-end;
		padding-bottom: 20px;
	}

	button.icon {
		color: var(--subtle-icons);
		transition: color 0.3s ease;
		display: block;
		width: 100%;
		height: 40px;
	}

	button.icon:hover {
		color: var(--dm-pretty-much-white);
		transition: var(--transition-1);
	}

	button.icon.active, button.icon:focus {
		color: var(--dm-pink-panther);
	}
</style>
