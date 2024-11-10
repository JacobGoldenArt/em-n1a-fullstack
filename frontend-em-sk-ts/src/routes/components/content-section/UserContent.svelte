<script lang="ts">
    
    let { sendUserMessagefn } = $props<{ sendUserMessagefn: (userInput: string) => Promise<void> }>();
    let userInputMessage = $state("");


    let sendUserMessage = () => {
        if ( userInputMessage === "") return;
        else sendUserMessagefn(userInputMessage)
    }

 
  </script>


    <textarea
        bind:value={userInputMessage}
        placeholder="Type your message here..."
        class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
    ></textarea>
    <button onclick={sendUserMessage} class="user-submit">Send</button>




  