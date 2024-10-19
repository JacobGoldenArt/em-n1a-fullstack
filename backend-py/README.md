# Mem

An experimental AI assistant with
memory features. built with FastAPI and LangChain/LangGraph.

This is the backend for the Mem AI assistant. It is a [LangGraph](https://github.com/langchain-ai/langgraph) application that uses a vector database to store and retrieve memories.
It uses [LangServe](https://langchain.com/docs/integrations/tools/langserve) to wrap the LangGraph application as a FastAPI service. The frontend client will interact with this service
via FastAPI endpoints.

The api only responds to POST requests with the expected json body.
Example client request:

```js
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
});
```

The response is a stream of Server Sent Events (SSE) with the following json structure:

```jsonl
event: metadata
data: {"run_id": "b80a1e70-eef6-4628-9afd-7ea543a149b6"}

event: data
data: {"load_memories":{"core_memories":["Jacob loves mochi, tiramisu (not too sweet), and well-prepared Tres Leche.","Jacob has a dog named Biscuit and is fostering a kitten named Artemis.","Jacob's favorite drink is Coffee."],"conversational_memories":["Jacob is working on an experimental AI assistant app aimed at facilitating fun AI/human collaboration.","User's name is Jacob and he is working on a new app."]}}

event: data
data: {"main_agent":{"messages":{"content":"Hi there! As an AI, I can assist you with a variety of tasks, including answering questions, providing information, generating creative content, helping with problem-solving, and offering personalized recommendations. I can also engage in conversation, remember details about our interactions, and adapt to your preferences over time. How can I assist you further?","additional_kwargs":{},"response_metadata":{"finish_reason":"stop","model_name":"gpt-4o-mini-2024-07-18","system_fingerprint":"fp_482c22a7bc"},"type":"ai","name":null,"id":"run-5c8c5ec1-1c74-459a-aa86-b34419f91082-0","example":false,"tool_calls":[],"invalid_tool_calls":[],"usage_metadata":null}}}

event: end
```

The SSE response is parsed by the client and must be handled a stream of events! It cannot simply be parsed as JSON. We are using an npm package called [fetch-sse](https://github.com/mattrothenberg/fetch-sse) to handle the SSE response.
