<script setup>
import { ref, useTemplateRef, onMounted } from "vue";
import { useMessageStore } from "../stores/messageStore";
import { useRandomQuestion } from "../composables/randomQuestion";

const userInputRef = ref("");
const exampleButtonRef = useTemplateRef("exampleButton");
const textareaRef = useTemplateRef("textarea");
const isFocused = ref(false);
const messageStore = useMessageStore();
const userInputContainerRef = useTemplateRef("userInputContainerRef");

onMounted(() => {
  focusTextarea();
});

const focusTextarea = () => {
  isFocused.value = true;
  if (textareaRef.value) {
    textareaRef.value.focus();
  }
};

const { exampleQuestion } = useRandomQuestion(exampleButtonRef);

watch(exampleQuestion, (newVal) => {
  userInputRef.value = newVal;
  sendMessage();
});

const sendMessage = async () => {
  if (userInputRef.value.trim() !== "") {
    messageStore.sendUserMessage(userInputRef.value);
    messageStore.newUserMessage = true;
    isFocused.value = false;
  }
};
</script>

<template>
  <div
    ref="userInputContainerRef"
    :class="['message-input-container', isFocused ? '' : 'is-blurred']"
  >
    <textarea
      v-model="userInputRef"
      ref="textarea"
      class="current-user-message"
      @keyup.enter="sendMessage"
      @click="focusTextarea"
      :placeholder="!isFocused ? 'Type your message here...' : ''"
    ></textarea>
    <button ref="exampleButton" class="random-question-btn">
      Random Question
    </button>
  </div>
</template>

<style scoped>
.message-input-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

textarea {
  padding: 10px;
  min-height: 8em;
  border-radius: 10px;
  border: 4px solid #f4d0f4;
  background: #fbf0fb;
  box-shadow: 1px 1px 4px 0px color(display-p3 0.13 0.13 0.13 / 0.25);
}

.is-blurred textarea,
.is-blurred button {
  transition: opacity 0.5s ease;
  opacity: 0.5;
}

.random-question-btn {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.random-question-btn:hover {
  background-color: #0056b3;
}

/* Dark mode styles */

.dark-mode textarea {
  background: #202127;
}

.dark-mode .random-question-btn {
  background-color: #ffc0f5;
}
</style>
