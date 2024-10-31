<script>
	import '../app.css';
	import AppSettingsContainer from './components/app-settings/AppSettingsContainer.svelte';
	import ContentContainer from './components/content-section/ContentContainer.svelte';
	let { children } = $props();
</script>

<!-- <ModeWatcher /> -->
<main id="app" class="pico">
	<AppSettingsContainer />
	<!-- User and Assistant Content -->
	<ContentContainer />
</main>

{@render children()}


