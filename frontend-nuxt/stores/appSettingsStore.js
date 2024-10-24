import { defineStore } from "pinia";

export const useAppSettingsStore = defineStore("appSettings", {
  state: () => ({
    toggleSettingsPanel: false,
    voiceMode: false,
    fileUpload: false,
    folderUpload: false,
    newSession: false,
    theme: "light",
    darkMode: false,
  }),
  actions: {
    toggleSettingsPanel(status) {
      this.toggleSettingsPanel = status;
    },
    toggleVoiceMode(status) {
      this.voiceMode = status;
    },
    toggleFileUpload(status) {
      this.fileUpload = status;
    },
    toggleFolderUpload(status) {
      this.folderUpload = status;
    },
    toggleNewSession(status) {
      this.newSession = status;
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
});
