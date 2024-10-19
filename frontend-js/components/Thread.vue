<script setup>
import DOMPurify from "dompurify";
import { marked } from "marked";
import { nextTick, ref, watch } from "vue";
import { useMessageStore } from "../stores/messageStore";

const messageStore = useMessageStore();
const threadContainer = ref(null);

// Function to safely parse markdown
const parseMarkdown = (content) => {
  const rawHtml = marked(content);
  return DOMPurify.sanitize(rawHtml);
};

// Function to scroll to the last user message
const scrollToLastUserMessage = () => {
  nextTick(() => {
    const scrollContainer = document.querySelector(
      ".col3-scroll-assistant-panel"
    );
    if (scrollContainer) {
      const userMessages =
        threadContainer.value.querySelectorAll(".message-block");
      if (userMessages.length > 0) {
        const lastUserMessage = userMessages[userMessages.length - 1];
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  });
};

// Watch for new messages
watch(
  () => messageStore.newMessage,
  (newMessage) => {
    if (newMessage) {
      scrollToLastUserMessage();
      messageStore.clearNewMessage();
    }
  }
);
</script>

<template>
  <div class="thread" ref="threadContainer">
    <div v-if="messageStore.modelName || messageStore.runId" class="info-bar">
      <span v-if="messageStore.modelName"
        >Model: {{ messageStore.modelName }}</span
      >
      <span v-if="messageStore.runId">Run ID: {{ messageStore.runId }}</span>
    </div>
    <article class="text-base prose prose-truegray">
      <ul v-if="messageStore.messages.length > 0">
        <template
          v-for="(message, index) in messageStore.messages"
          :key="index"
        >
          <li :class="['message-block', `${message.role}`]">
            <div
              class="message-content"
              v-html="parseMarkdown(message.content)"
            ></div>
          </li>
        </template>
      </ul>
    </article>
  </div>
</template>

<style scoped>
.thread {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

/* ... rest of your styles ... */
</style>
