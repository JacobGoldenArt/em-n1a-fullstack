<script setup>
import { createPinia } from "pinia";
import "./assets/reset.css";

const pinia = createPinia();
</script>

<template>
  <main id="app">
    <div class="app-settings-panel">
      <AppSettings />
    </div>
    <div class="content-container">
      <div class="user-panel">
        <CurrentUserMessage />
      </div>
      <div class="assistant-panel prose">
        <ThreadAlt />
      </div>
    </div>
    <div class="assistant-settings-panel">
      <AssistantSettings />
    </div>
  </main>
</template>

<style scoped>
#app {
  width: 100vw;
  height: 100vh;
  background: color(display-p3 1 1 1);
  display: flex;
  flex-direction: row;
  font-family: "Inter", sans-serif;
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow: hidden; /* Add this to prevent scrolling on the main container */
}

.app-settings-panel {
  display: flex;
  flex: none;
  width: 50px;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  background: color(display-p3 0.1922 0.1804 0.1647);
}

.content-container {
  display: flex;
  flex: auto;
  flex-direction: row;
  overflow: hidden; /* Add this to prevent scrolling on the content container */
  background-color: #f0f0f0;
}

.user-panel {
  display: flex;
  flex: 1;
  padding: 0px 20px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
}

.assistant-panel {
  display: flex;
  flex: 2;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  border-left: 5px solid color(display-p3 0.8875 0.8875 0.8875);
  overflow-y: auto;
  max-height: 100vh; /* Add this to ensure the panel takes full height */
  padding: 0 20px 20px 20px;
}

.assistant-settings-panel {
  display: flex;
  flex: none;
  width: 50px;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  background: color(display-p3 1 1 1);
  position: sticky;
  right: 0;
  top: 0;
}
</style>
