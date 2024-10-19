import { fetchEventData } from "fetch-sse";
import { ref } from "vue";
import { useMessageStore } from "../stores/messageStore";

const apiResponse = ref("");
const url = "http://localhost:8080/chat/stream";

export async function useSSEapi(userInput) {
  const messageStore = useMessageStore();
  await fetchEventData(url, {
    method: "POST",
    data: {
      input: {
        messages: messageStore.messages,
      },
      config: {
        configurable: {
          em_model: "oai-gpt4m",
          temperature: 0.4,
        },
      },
      kwargs: {},
    },
    headers: {
      "Content-Type": "application/json",
    },
    onMessage: (e) => {
      console.log("response from sse", e);
      const { main_agent, run_id } = JSON.parse(e.data);
      messageStore.appendToLastMessage(main_agent?.messages?.content || "");
      messageStore.setModelName(
        main_agent?.messages?.response_metadata?.model_name || ""
      );
      messageStore.setRunId(run_id || "");
    },
  });
}
