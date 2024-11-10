<script>
	import AppSettingsNav from './AppSettingsNav.svelte';
	import AppSettingsPanel from './AppSettingsPanel.svelte';
	import { appSettingsOpen } from './AppSettingsStore.js';

	// $effect(() => {
	// 	console.log(`appSettingsOpen from AppSettingsContainer: ${$appSettingsOpen}`);
	// });


	
</script>

<div id="settings-sidebar" class:open={$appSettingsOpen}>
	<div id="app-settings-nav-panel">
		<AppSettingsNav />
	</div>
	<div id="app-settings-panel" class:open={$appSettingsOpen}>
		<AppSettingsPanel />
	</div>
</div>

<style>
#settings-sidebar {
    display: flex;
    position: absolute;
	z-index: 10;
    width: 60px;
    height: 100vh;
    justify-content: flex-start;
    transition: all 0.3s ease;
	border-right: var(--quiet-border);
    overflow: hidden;
	box-shadow: -9px -2px 4px 10px rgb(0 0 0 / 55%);
}

#settings-sidebar.open {
	width: 360px;
}

#app-settings-nav-panel {
    display: flex;
    height: 100vh;
    flex-direction: column;
    border-right: var(--quiet-border);
    justify-content: space-between;
}

#app-settings-panel {
}



</style>
