<script>
	import AppSettingsNav from './AppSettingsNav.svelte';
	import AppSettingsPanel from './AppSettingsPanel.svelte';
	import { appSettingsOpen } from './AppSettingsStore.js';

	// $effect(() => {
	// 	console.log(`appSettingsOpen from AppSettingsContainer: ${$appSettingsOpen}`);
	// });


	
</script>

<div id="settings-sidebar" class:open={$appSettingsOpen}>
	<div id="app-settings-nav-container">
		<AppSettingsNav />
	</div>
	<div id="app-settings-panel" class:open={$appSettingsOpen}>
		<AppSettingsPanel />
	</div>
</div>

<style>
#settings-sidebar {
    display: flex;
    position: static;
    width: 60px;
    height: 100vh;
    justify-content: flex-start;
    transition: all 0.3s ease;
	border-right: 1px solid var(--grey-ghost);
    overflow: hidden;
}

#settings-sidebar.open {
	width: 360px;
	border-right: 1px solid #000;
}

#app-settings-nav-container {
    display: flex;
    height: 100vh;
    flex-direction: column;
    border-right: 1px solid var(--grey-ghost);
    background: var(--black-jeans);
    justify-content: space-between;
}



</style>
