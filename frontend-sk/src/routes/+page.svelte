<script>
    import { fetchEM } from '$lib/fetchEM';
    import { fade } from 'svelte/transition';
    let userInput = $state('');
	let emResponse = $state({});
    let showResponse = $state(false);

	const handleFetchEM = async (e) => {
		if (e.key !== 'Enter') return;
		emResponse = await fetchEM(userInput);
        if (emResponse.assistantMessage) {
            showResponse = true;
        }

	}


</script>

<input
type="text"
bind:value={userInput}
autocomplete="off"
onkeydown={handleFetchEM}   
/>

{#if showResponse}
<p transition:fade>
	{emResponse.assistantMessage}
</p>
{/if}

