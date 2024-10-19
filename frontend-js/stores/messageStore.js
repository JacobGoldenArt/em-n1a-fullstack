import { defineStore } from "pinia";
import { useSSEapi } from "../api/useSSEapi";

export const useMessageStore = defineStore("messages", {
  state: () => ({
    messages: [],
    modelName: "",
    runId: "",
    isStreaming: false,
  }),
  actions: {
    addMessage(message) {
      this.messages.push(message);
      console.log("Message store addMessage: ", this.messages);
    },
    appendToLastMessage(content) {
      if (this.messages.length > 0) {
        this.messages[this.messages.length - 1].content += content;
        console.log("Message store appendToLastMessage: ", this.messages);
      }
    },
    setModelName(name) {
      this.modelName = name;
    },
    setRunId(id) {
      this.runId = id;
    },
    setIsStreaming(status) {
      this.isStreaming = status;
    },
    async sendUserMessage(userInput) {
      if (userInput) {
        const userMessage = {
          role: "user",
          content: userInput,
        };
        this.addMessage(userMessage);

        this.addMessage({
          role: "assistant",
          content: "",
        });
        this.setIsStreaming(true);
        await useSSEapi(userInput);
        this.setIsStreaming(false);
      }
    },
  },
});
