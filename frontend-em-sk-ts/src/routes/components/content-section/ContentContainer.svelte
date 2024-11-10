<script lang="ts">


	import { nanoid } from 'nanoid';
	import { Pane, PaneGroup, PaneResizer } from 'paneforge';
	import type { Message } from '../../../types/messageTypes';
	import { appSettingsOpen } from '../app-settings/AppSettingsStore.js';
	import AssistantContent from './AssistantContent.svelte';
	import UserContent from './UserContent.svelte';
	let messagesThreadArray: Message[] = $state([]);
	let messageLoading: boolean = $state(false);

	let sendUserMessage = async (userInput: string) => {
		console.log(`Recived userInput: ${userInput}`);
		if (userInput.trim() === "") return;
		messageLoading = true;
		const UserMessage: Message = {
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
		const AssistantMessage: Message = {
			id: nanoid(),
			role: "assistant",
			content: assitantResponse.assistantMessage,
		}
		messagesThreadArray.push(AssistantMessage);
		messageLoading = false;
	};

	let sendUserMessagefn: (userInput: string) => Promise<void> = $state(sendUserMessage);

</script>

<div id="content-container" class:settings-open={$appSettingsOpen}>
	<PaneGroup direction="horizontal" class="min-w-screen min-h-screen">
		<!-- User Content -->
		<Pane defaultSize={30} minSize={25} maxSize={40}>
			<div id="user-content-pane">
				<UserContent {sendUserMessagefn} />
			</div>
		</Pane>
		<!-- Handle -->
		<PaneResizer>
			<div class="pane-resizer-handle"></div>
		</PaneResizer>
		<!-- Assistant Content -->
		<Pane defaultSize={75}>
			<div id="assistant-content-pane" class:loading={messageLoading}>
				<AssistantContent {messagesThreadArray} {messageLoading} />
			</div>
		</Pane>
	</PaneGroup>
</div>

<style>
#content-container {
    display: flex;
    flex-direction: row;
    padding: 0;
    transition: filter 0.3s ease;
}

.settings-open {
	filter: blur(3px);
	opacity: 0.8;
}

#user-content-pane {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    height: 100%;
    margin-left: 60px;
    padding: 0 30px;
}



#assistant-content-pane {
	flex-shrink: 0;
	flex-grow: 2;
	flex-basis: 65%;
	border-left-style: solid;
	border-left-width: 1px;
	height: 100vh;
}

.pane-resizer-handle {
	cursor: col-resize;
	width: 2px;
	height: 100%;
}
</style>
