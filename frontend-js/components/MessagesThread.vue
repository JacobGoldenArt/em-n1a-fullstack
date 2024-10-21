<script setup>
import DOMPurify from "dompurify";
import { marked } from "marked";
import { onMounted, watch, nextTick, useTemplateRef } from "vue";
import { useMessageStore } from "../stores/messageStore";

const messageStore = useMessageStore();
const messagesTh = useTemplateRef("messagesThread"); // Ref for the message container
const lastMessageRef = ref(null); // Dynamically assign last message ref

// Function to safely parse markdown
const parseMarkdown = (content) => {
  const rawHtml = marked(content);
  return DOMPurify.sanitize(rawHtml);
};

// Function to scroll to the latest message
const scrollToLatestMessage = () => {
  nextTick(() => {
    if (lastMessageRef.value) {
      // Use scrollIntoView for precise scrolling
      lastMessageRef.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
};

// Dynamically update the ref to the last message after messages are rendered
const updateLastMessageRef = () => {
  nextTick(() => {
    const allMessages = messagesTh.value?.querySelectorAll(".message-block");
    if (allMessages && allMessages.length > 0) {
      lastMessageRef.value = allMessages[allMessages.length - 1]; // Get the last message element
    }
  });
};

// Watch for new assistant message and update the ref + scroll
watch(
  () => messageStore.newAssistantMessage,
  (newAssistantMessage) => {
    if (newAssistantMessage) {
      updateLastMessageRef(); // Recalculate the last message reference
      scrollToLatestMessage(); // Scroll to it
    }
  },
  { deep: true }
);

// Scroll on component mount if there are already messages
onMounted(() => {
  if (messageStore.messages.length > 0) {
    updateLastMessageRef();
    scrollToLatestMessage();
  }
});

// Watch for any change in messages and update the last message ref
watch(
  () => messageStore.newAssistantMessage,
  () => {
    updateLastMessageRef(); // Update the last message ref whenever a new message is added
  }
);
</script>

<template v-if="messageStore.messages.length > 0">
  <div id="messages-thread" ref="messagesThread">
    <!-- Message rendering -->
    <template v-for="(message, index) in messageStore.messages" :key="index">
      <div
        v-if="message.content !== ''"
        class="prose message-block"
        :class="message.role"
      >
        <div
          class="message-content"
          v-html="parseMarkdown(message.content)"
        ></div>
      </div>
    </template>
  </div>

  <div class="loading-indicator" v-if="messageStore.isLoading">
    <img src="~/assets/ripples.svg" alt="Loading..." />
  </div>
</template>

<style scoped>
#messages-thread {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 0 20px 20px 20px;
  height: 100%;
  align-items: center;
  scrollbar-width: none;
}

/* #messages-thread:last-child {
  scroll-margin-top: 40px;
} */

.loading-indicator {
  background: unset;
  display: flex;
  justify-content: center;
  align-self: end;
  padding: 10px;
  margin-top: 20px;
  width: 100%;
}

.loading-indicator img {
  width: 50%;
}

.message-block.user {
  width: -webkit-fill-available;
  padding: 10px 5px;
  text-align: right;
  font-variant-numeric: diagonal-fractions;
}

.message-block.user .message-content {
  line-height: 1em !important;
}

.message-block.assistant {
  padding: 0 1.1em;
  border: 1px solid color(display-p3 0.79 0.79 0.79);
  border-radius: 10px;
  max-width: 67ch;
  font-size: 1.1em;
}

.message-block.user .message-content {
  line-height: 1em !important;
  font-size: x-small;
  font-family: monospace;
}

.message-block.assistant .message-content {
  font-size: smaller;
  line-height: 1px;
}

.message-block.assistant .message-content .prose :where(p, ul, ol, pre) {
  margin: 1em 0;
  line-height: 1.6;
}

.message-block.assistant
  .message-content
  .prose
  :where(h1, h2, h3, h4, h5, h6) {
  margin: 1em 0;
  line-height: 1.5;
}

/* Dark mode styles */

.dark-mode .message-block.assistant {
  background: #202127;
  border: 1px solid #2e2e32;
}
.dark-mode .message-block.assistant .message-content,
.dark-mode .message-block.assistant .message-content * {
  background: unset;
}
</style>
