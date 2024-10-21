<script setup lang="ts">
import { useAppSettingsStore } from "../stores/appSettingsStore";

const size = "20px";
const appSettings = useAppSettingsStore();

// Define the type for AppSettings
type AppSettings = {
  action: () => void;
  title: string;
  name: string;
  size: typeof size;
};

// Use the type for topNavLinks and bottomNavLinks
const topNavLinks: AppSettings[] = [
  {
    action: () => {
      useAppSettingsStore().toggleSettingsPanel();
    },
    title: "app settings",
    name: "i-mingcute-settings-2-line",
    size: size,
  },
  {
    action: () => {
      useAppSettingsStore().toggleVoiceMode();
    },
    title: "voice mode",
    name: "i-mingcute-mic-fill",
    size: size,
  },
  {
    action: () => {
      useAppSettingsStore().toggleFolderUpload();
    },
    title: "upload folder",
    name: "i-mingcute-folder-upload-fill",
    size: size,
  },
  {
    action: () => {
      useAppSettingsStore().toggleFileUpload();
    },
    title: "upload file",
    name: "i-mingcute-file-upload-fill",
    size: size,
  },
  {
    action: () => {
      useAppSettingsStore().toggleNewSession();
    },
    title: "new session",
    name: "i-material-symbols-new-window",
    size: size,
  },
];

const bottomNavLinks: AppSettings[] = [
  {
    action: () => {
      appSettings.toggleDarkMode();
    },
    title: "dark mode",
    name: "i-fluent-dark-theme-24-regular",
    size: size,
  },
];
</script>

<template>
  <div class="app-settings">
    <menu>
      <nav class="app-settings-top">
        <template v-for="link in topNavLinks">
          <a @click="link.action">
            <icon :name="link.name" :size="link.size" />
          </a>
        </template>
      </nav>
      <nav class="app-settings-bottom">
        <template v-for="link in bottomNavLinks">
          <a @click="link.action">
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

.app-settings-top {
  align-self: stretch;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 0px;
  gap: 30px;
}
.app-settings-bottom {
  align-self: stretch;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 20px 0px;
}

a {
  color: #ffffff;
}

a:hover {
  color: #ad2222;
}
</style>
