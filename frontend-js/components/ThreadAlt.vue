<script setup>
import DOMPurify from "dompurify";
import { marked } from "marked";
import { ref } from "vue";
import { useMessageStore } from "../stores/messageStore";

const messageStore = useMessageStore();
const threadContainer = ref(null);
console.log(messageStore.messages);

// Function to safely parse markdown
const parseMarkdown = (content) => {
  const rawHtml = marked(content);
  return DOMPurify.sanitize(rawHtml);
};
</script>

<template v-if="messageStore.messages.length > 0">
  <div v-for="(message, index) in messageStore.messages" :key="index">
    <div :class="['message-block', `${message.role}`]">
      <div
        class="message-content"
        v-html="parseMarkdown(message.content)"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.message-block.user {
  width: 100%;
}

.message-block.user .message-content {
  border: 4px solid #f0f0f0;
  font-size: x-small;
  font-family: monospace;
}

.message-block.assistant .message-content {
  padding: 0 20px;
  background: #ffffff87;
  border: 4px solid #e7e7e7;
  border-radius: 10px;
  font-size: smaller;
  line-height: 1px;
}
</style>
