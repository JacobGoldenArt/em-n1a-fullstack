import { defineStore } from "pinia";

export const useAssistantSettingsStore = defineStore("assistantSettings", {
  state: () => ({
    regenerateResponse: false,
    toggleHighlightMode: false,
    downloadCurrentThread: false,
    toggleSpeechMode: false,
    toggleSecondThread: false,
    notHappyFeedback: false,
    loveFeedback: false,
  }),
  actions: {
    regenerateResponse(status) {
      this.regenerateResponse = status;
    },
    toggleHighlightMode(status) {
      this.toggleHighlightMode = status;
    },
    downloadCurrentThread(status) {
      this.downloadCurrentThread = status;
    },
    toggleSpeechMode(status) {
      this.toggleSpeechMode = status;
    },
    toggleSecondThread(status) {
      this.toggleSecondThread = status;
    },
    provideNotHappyFeedback(status) {
      this.notHappyFeedback = status;
    },
    provideLoveFeedback(status) {
      this.loveFeedback = status;
    },
  },
});
