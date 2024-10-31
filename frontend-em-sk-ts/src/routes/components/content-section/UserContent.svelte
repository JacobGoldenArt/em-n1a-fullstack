<script>
    
    let { sendUserMessagefn } = $props();
    let userInputMessage = $state("");


    let sendUserMessage = () => {
        if ( userInputMessage === "") return;
        else sendUserMessagefn(userInputMessage)
    }

 
  </script>

<div class="user-content-container">
    <textarea
        bind:value={userInputMessage}
        placeholder="Type your message here..."
        class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
    ></textarea>
    <button onclick={sendUserMessage} class="send-button">Send</button>
</div>

<style>


.user-content-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    padding-top: 40%;
    height: 100vh;
}

textarea {
width: 100%;
  padding: 10px;
  min-height: 8em;
  border-radius: 10px;
  border: 4px solid var(--pepto-pink);
  background: var(--gray-50);
  box-shadow: 1px 1px 4px 0px color(display-p3 0.13 0.13 0.13 / 0.25);
}
</style>

  