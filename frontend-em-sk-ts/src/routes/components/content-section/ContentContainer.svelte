<script>
// @ts-nocheck

	import { nanoid } from 'nanoid';
	import { Pane, PaneGroup, PaneResizer } from 'paneforge';
	import AssistantContent from './AssistantContent.svelte';
	import UserContent from './UserContent.svelte';


	// user content states
	let messageLoading = $state(false);
	let messagesThreadArray = $state([]);

	let sendUserMessage = async (userInput) => {
		console.log(`Recived userInput: ${userInput}`);
		if (userInput.trim() === "") return;
		messageLoading = true;
		const UserMessage = {
			id: nanoid(),
			role: "user",
			content: userInput,
		}
		messagesThreadArray.push(UserMessage);
		const response = await fetch("/api/message", {
			method: "POST",
			body: JSON.stringify({ userInput }),
		});

		console.log(`Recived assistant Response Back in the client: ${response}`);
		
		const assitantResponse = await response.json();
		const AssistantMessage = {
			id: nanoid(),
			role: "assistant",
			content: assitantResponse.assistantMessage,
		}
		messagesThreadArray.push(AssistantMessage);
		messageLoading = false;
	};

	let sendUserMessagefn = $state(sendUserMessage);

</script>

<div id="content-container">
	<PaneGroup direction="horizontal" class="min-w-screen min-h-screen">
		<!-- User Content -->
		<Pane defaultSize={25} minSize={10} maxSize={40}>
			<div id="user-content-container">
				<UserContent {sendUserMessagefn} />
			</div>
		</Pane>
		<!-- Handle -->
		<PaneResizer>
			<div class="pane-resizer-handle"></div>
		</PaneResizer>
		<!-- Assistant Content -->
		<Pane defaultSize={75}>
			<div id="assistant-content-container" class:loading={messageLoading}>
				<AssistantContent {messagesThreadArray} {messageLoading} />
			</div>
		</Pane>
	</PaneGroup>
</div>

<style>
#content-container {
    display: flex;
    flex-direction: row;
    background: var(--grey-ghost);
    margin: 0 60px;
    border: 1px solid var(--subtle-grey-line);
    border-top: none;
    border-bottom: none;
    background: var(--grey-ghost);
}

#user-content-container {
	display: flex;
	flex-shrink: 0;
	flex-grow: 2;
	flex-basis: 30%;
	padding: 0px 20px;
	flex-direction: column;
	justify-content: center;
}

#assistant-content-container {
	flex-shrink: 0;
	flex-grow: 2;
	flex-basis: 65%;
	border-left: 1px solid var(--subtle-grey-line);
	height: 100vh;
}

.pane-resizer-handle {
	cursor: col-resize;
	background: var(--pepto-pink);
	width: 2px;
	height: 100%;
}
</style>
