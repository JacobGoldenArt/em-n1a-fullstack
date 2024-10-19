<script setup lang="ts">
import { useAssistantSettingsStore } from "../stores/assistantSettingsStore";

const size = "20px";

// Define the type for AppSettings
type AssistantSettings = {
  action: () => void;
  title: string;
  name: string;
  size: typeof size;
};

// Use the type for topNavLinks and bottomNavLinks
const assistantActionLinks: AssistantTools[] = [
  {
    action: () => {
      useAssistantSettingsStore().regenerateResponse();
    },
    title: "regenerate response",
    name: "mingcute:refresh-3-fill",
    size: size,
  },
  {
    action: () => {
      useAssistantSettingsStore().toggleHighlightMode();
    },
    title: "highlight mode",
    name: "mage:edit-pen",
    size: size,
  },
  {
    action: () => {
      useAssistantSettingsStore().downloadCurrentThread();
    },
    title: "download current thread",
    name: "mingcute:download-line",
    size: size,
  },
  {
    action: () => {
      useAssistantSettingsStore().toggleSpeechMode();
    },
    title: "toggle speech mode",
    name: "material-symbols:speaker",
    size: size,
  },
];

const threadActionLinks: ThreadSettings[] = [
  {
    action: () => {
      useAssistantSettingsStore().toggleSecondThread();
    },
    title: "toggle second thread",
    name: "mingcute:git-merge-line",
    size: size,
  },
];

const feedbackActionLinks: FeedbackSettings[] = [
  {
    action: () => {
      useAssistantSettingsStore().provideNotHappyFeedback();
    },
    title: "not happy with the answer",
    name: "mingcute:unhappy-line",
    size: size,
  },
  {
    action: () => {
      useAssistantSettingsStore().provideLoveFeedback();
    },
    title: "love it",
    name: "mingcute:heart-line",
    size: size,
  },
];
</script>

<template>
  <div class="assistant-settings">
    <menu>
      <nav class="assistant-action-links">
        <template v-for="link in assistantActionLinks">
          <a
            @click="
              {
                link.action;
              }
            "
          >
            <icon :name="link.name" :size="link.size" />
          </a>
        </template>
      </nav>
      <nav class="thread-action-links">
        <template v-for="link in threadActionLinks">
          <a
            @click="
              {
                link.action;
              }
            "
          >
            <icon :name="link.name" :size="link.size" />
          </a>
        </template>
      </nav>
      <nav class="feedback-action-links">
        <template v-for="link in feedbackActionLinks">
          <a
            @click="
              {
                link.action;
              }
            "
          >
            <icon :name="link.name" :size="link.size" />
          </a>
        </template>
      </nav>
    </menu>
  </div>
</template>

<style scoped>
menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
}

.assistant-action-links {
  align-self: stretch;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 0px;
  gap: 30px;
}

.thread-action-links {
  align-self: stretch;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 0px;
  gap: 35px;
}

.feedback-action-links {
  align-self: stretch;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 20px 0px;
  gap: 30px;
}

a {
  color: rgba(45, 48, 75, 85%);
}

a:hover {
  color: #ad2222;
}
</style>
