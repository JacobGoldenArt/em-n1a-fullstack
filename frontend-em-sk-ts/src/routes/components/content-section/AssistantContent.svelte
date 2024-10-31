<script>

    const { 
        messagesThreadArray, 
        messageLoading 
    } = $props();

</script>

<div class="chat-container">
    <div class="thread-container">
        {#if !messageLoading}
        {#each messagesThreadArray as message (message.id)}
            <div class="message-block class:user={message.role === 'user'} class:assistant={message.role === 'assistant'}">
                <p>{message.content}</p>
            </div>
        {/each}
        {:else}
            <div class="loading-block">
                <p>Loading...</p>
            </div>
        {/if}
    </div>
</div>

<style>

.chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px;
}

.thread-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    margin: 0 20px;
}

.message-block.user {
    background: none;
    font-family: var(--mono-3);
    font-size: smaller;
    color: var(--dm-cinema-black);
    padding: 10px;
    border:none;
}

.message-block.assistant {
    padding: 10px;
    background: 1px solid var(--dm-pretty-much-white);
    color: var(--dm-cinema-black);
    border-radius: 10px;
    border: 1px solid var(--subtle-grey-line);
}

.loading-block {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background: 1px solid var(--dm-pretty-much-white);
    color: var(--dm-cinema-black);
    border-radius: 10px;
    border: 1px solid var(--subtle-grey-line);
}

</style>