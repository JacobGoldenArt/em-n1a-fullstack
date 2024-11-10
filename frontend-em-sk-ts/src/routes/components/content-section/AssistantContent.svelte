<script lang="ts">

    import type { Message } from '../../../types/messageTypes';

    const { 
        messagesThreadArray, 
        messageLoading 
    } = $props<{ messagesThreadArray: Message[], messageLoading: boolean }>();

</script>

        {#if !messageLoading}
        {#each messagesThreadArray as message (message.id)}
            <div class="message-block class:user={message.role === 'user'} class:assistant={message.role === 'assistant'}">
                <div class="content">
                    {message.content}
                </div>
            </div>
        {/each}
        {:else}
            <div class="loading-block">
                <p>Loading...</p>
            </div>
        {/if}


<style>



.message-block.user {
    font-size: smaller;
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