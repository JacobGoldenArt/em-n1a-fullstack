<script setup>
import { createPinia } from "pinia";
import "./assets/reset.css";
import { useAppSettingsStore } from "./stores/appSettingsStore";
import { useMessageStore } from "./stores/messageStore";
import { presetMini } from "unocss";

const pinia = createPinia();
const appSettings = useAppSettingsStore();
</script>

<template>
  <main
    id="app"
    :class="(appSettings.theme, appSettings.darkMode ? 'dark-mode' : '')"
  >
    <div class="app-settings-panel">
      <AppSettings />
    </div>
    <div class="content-container">
      <div class="user-panel">
        <CurrentUserMessage />
      </div>
      <div class="assistant-panel" ref="assistantPanel">
        <MessagesThread />
      </div>
    </div>
    <div class="assistant-settings-panel">
      <AssistantSettings />
    </div>
  </main>
</template>

<style scoped>
#app {
  height: 100vh;
  background: color(display-p3 1 1 1);
  display: flex;
  flex-direction: row;
  font-family: "Inter", sans-serif;
  justify-content: flex-start;
  overflow: hidden;
}

.app-settings-panel {
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 50px;
  flex-direction: column;
  align-items: center;
  background: color(display-p3 0.1922 0.1804 0.1647);
}

.content-container {
  display: flex;
  flex: auto;
  flex-direction: row;
  background-color: #f0f0f0;
}

.user-panel {
  display: flex;
  flex-shrink: 0;
  flex-grow: 2;
  flex-basis: 30%;
  padding: 0px 20px;
  flex-direction: column;
  justify-content: center;
}

.assistant-panel {
  flex-shrink: 0;
  flex-grow: 2;
  flex-basis: 65%;
  border-left: 1px solid color(display-p3 0.79 0.79 0.79);
  height: 100vh;
}

.assistant-settings-panel {
  display: flex;
  flex-shrink: 0;
  flex-basis: 50px;
  flex-grow: 0;
  flex-direction: column;
  align-items: center;
  background: color(display-p3 1 1 1);
}

/* Dark mode styles */

.dark-mode * {
  background: #1b1b1f;
  color: color(display-p3 0.95 0.94 0.94);
  border-color: #ffc0f5;
}

.dark-mode .prose :where(p, h1, h2, h3, h4, h5, h6, ul, ol, pre) {
  background: none !important;
}

.dark-mode .app-settings-panel {
  background: #1b1b1f;
  border-right: 1px solid #2e2e32;
}

.dark-mode .assistant-panel {
  border-left: 1px solid #2e2e32;
}
</style>
