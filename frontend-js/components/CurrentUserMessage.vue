<script setup>
import { ref, useTemplateRef } from "vue";
import { useMessageStore } from "../stores/messageStore";

const userInput = ref("");
const textareaRef = useTemplateRef("textareaRef");
const isFocused = ref(false);
const messageStore = useMessageStore();
const userInputContainerRef = useTemplateRef("userInputContainerRef");

const exampleQuestions = [
  "What are some practical tips for improving productivity when working remotely?",
  "Can you explain the basics of quantum computing and its potential future applications?",
  "Please outline the key differences between machine learning and deep learning.",
  "What are the most common ethical concerns related to artificial intelligence in healthcare?",
  "Give me a step-by-step guide to setting up a Docker environment for a Python project.",
  "What are the biggest challenges facing renewable energy adoption today?",
  "How has film noir influenced modern cinema, and can you provide examples of recent films that embody this influence?",
  "Describe the historical significance of the Harlem Renaissance and its impact on American culture.",
  "List 10 technologies from science fiction that have become reality.",
  "Can you walk me through the process of building a REST API with FastAPI?",
  "What are the psychological benefits of learning a musical instrument, and how can it improve cognitive function?",
  "Please list 5 underrated bands from the 1990s that had a significant impact on modern music.",
  "What are some of the most important considerations when designing an accessible web application?",
  "How has the philosophy of existentialism evolved from the 19th century to modern times?",
  "What are the advantages of using asynchronous programming in JavaScript, and when should it be avoided?",
  "Explain the concept of neuroplasticity and how it can be applied to learning new skills as an adult.",
  "What are some effective strategies for reducing one's carbon footprint in daily life?",
  "Provide a list of 7 influential female philosophers and their major contributions to philosophy.",
  "Can you explain how blockchain technology works and its potential applications beyond cryptocurrency?",
  "What are the top 5 recent developments in neuroscience that could reshape our understanding of the brain?",
];

const sendMessage = async () => {
  if (userInput.value.trim() !== "") {
    messageStore.sendUserMessage(userInput.value);
    messageStore.newUserMessage = true;
    messageStore.isFocused = false;
  }
};

const populateRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * exampleQuestions.length);
  userInput.value = exampleQuestions[randomIndex];
  sendMessage();
};
</script>

<template>
  <div
    ref="userInputContainerRef"
    :class="['message-input-container', isFocused ? '' : 'is-blurred']"
  >
    <textarea
      v-model="userInput"
      ref="textareaRef"
      class="current-user-message"
      @keyup.enter="sendMessage"
      @focus="(isFocused = true), (userInput = '')"
      @blur="isFocused = false"
      :placeholder="!isFocused ? 'Type your message here...' : ''"
    ></textarea>
    <button @click="populateRandomQuestion" class="random-question-btn">
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
