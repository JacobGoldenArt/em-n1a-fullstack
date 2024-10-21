import { defineStore } from "pinia";
import { useSSEapi } from "../api/useSSEapi";

export const useMessageStore = defineStore("messages", {
  state: () => ({
    messages: [],
    modelName: "",
    runId: "",
    isLoading: false,
    newAssistantMessage: false,
  }),
  actions: {
    addMessage(message) {
      this.messages.push(message);
      this.newAssistantMessage = false;
      console.log("Message store addMessage: ", this.messages);
    },
    appendToLastMessage(content) {
      if (this.messages.length > 0) {
        const ai_response = {
          role: "assistant",
          content: content,
        };
        if (ai_response.content !== "") {
          this.messages.push(ai_response);
          this.newAssistantMessage = true;
          console.log("Message store appendToLastMessage: ", this.messages);
        }
      }
    },
    setModelName(name) {
      this.modelName = name;
    },
    setRunId(id) {
      this.runId = id;
    },
    setIsLoading(status) {
      this.isLoading = status;
    },
    async sendUserMessage(userInput) {
      if (userInput) {
        if (userInput !== "") {
          const userMessage = {
            role: "user",
            content: userInput,
          };

          this.addMessage(userMessage);
          this.setIsLoading(true);
          await useSSEapi();
          this.setIsLoading(false);
        }
      }
    },
  },
});
