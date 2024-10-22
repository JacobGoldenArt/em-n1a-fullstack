<script setup>
import DOMPurify from "dompurify";
import { marked } from "marked";
import { onMounted, watch, nextTick, useTemplateRef } from "vue";
import { useMessageStore } from "../stores/messageStore";

const messageStore = useMessageStore();
const messagesTh = useTemplateRef("messagesThread"); // Ref for the message container

// Function to safely parse markdown
const parseMarkdown = (content) => {
  const rawHtml = marked(content);
  return DOMPurify.sanitize(rawHtml);
};

// Dynamically update the ref to the last message after messages are rendered
const scrollToLatestMessage = () => {
  console.log("scroll into view fn fired, next tick");
  const lastIndex = messageStore.messages.length - 1;
  console.log("last index", lastIndex);
  console.log("messages thread", messagesTh.value);
  if (messageStore.newAssistantMessage) {
    () => {
      const lastDivRef =
        messagesTh.value?.querySelectorAll(".assistant")[lastIndex];
      console.log("last div ref", lastDivRef);
      if (lastDivRef) {
        console.log(
          "scroll into view fn fired, last div ref found",
          lastDivRef
        );
        lastDivRef.scrollIntoView({ behavior: "smooth" });
      }
    };
  }
};

// Watch for any change in messages and update the last message ref
watch(
  () => messageStore.newAssistantMessage,
  () => {
    console.log("watch fn fired, new assistant message added");
    scrollToLatestMessage();
  }
);
// Example Transition Hooks
// called before the element is inserted into the DOM.
// use this to set the "enter-from" state of the element
function onBeforeEnter(el) {
  console.log("onBeforeEnter");
}

// called one frame after the element is inserted.
// use this to start the entering animation.
function onEnter(el, done) {
  console.log("onEnter");
  // call the done callback to indicate transition end
  // optional if used in combination with CSS
  done();
}

// called when the enter transition has finished.
function onAfterEnter(el) {
  console.log("onAfterEnter");
}

// called when the enter transition is cancelled before completion.
function onEnterCancelled(el) {
  console.log("onEnterCancelled");
}

// called before the leave hook.
// Most of the time, you should just use the leave hook
function onBeforeLeave(el) {
  console.log("onBeforeLeave");
}

// called when the leave transition starts.
// use this to start the leaving animation.
function onLeave(el, done) {
  console.log("onLeave");
  // call the done callback to indicate transition end
  // optional if used in combination with CSS
  done();
}

// called when the leave transition has finished and the
// element has been removed from the DOM.
function onAfterLeave(el) {
  console.log("onAfterLeave");
}

// only available with v-show transitions
function onLeaveCancelled(el) {
  console.log("onLeaveCancelled");
}
</script>

<template>
  <div id="messages-thread" ref="messagesThread">
    <Transition
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @enter-cancelled="onEnterCancelled"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
      @leave-cancelled="onLeaveCancelled"
    >
      <Suspense>
        <template
          v-for="(message, index) in messageStore.messages"
          :key="index"
          :ref="'div' + index"
        >
          <div class="prose message-block" :class="message.role">
            <div
              class="message-content"
              v-html="parseMarkdown(message.content)"
            ></div>
          </div>
        </template>
        <template #fallback>
          <div class="loading-indicator">
            <img src="~/assets/ripples.svg" alt="Loading..." />
          </div>
        </template>
      </Suspense>
    </Transition>
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
  font-size: 1em;
  background: rgb(246 245 240 / 86%);
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
