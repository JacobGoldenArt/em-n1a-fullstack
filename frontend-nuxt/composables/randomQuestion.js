import { useEventListener } from "./useEventListener";

const exampleQuestions = [
  "What are some practical tips for improving productivity when working remotely?",
  "Can you explain the basics of quantum computing and its potential future applications?",
  "Please outline the key differences between machine learning and deep learning.",
  "What are the most common ethical concerns related to artificial intelligence in healthcare?",
  "Give me a step-by-step guide to setting up a Docker environment for a Python project.",
  "What are the biggest challenges facing renewable energy adoption today?",
  "How has film noir influenced modern cinema, and can you provide examples of recent films that embody this influence?",
  "Describe the historical significance of the Harlem Renaissance and its impact on American culture.",
  "List 10 technologies from science fiction that have become reality.",
  "Can you walk me through the process of building a REST API with FastAPI?",
  "What are the psychological benefits of learning a musical instrument, and how can it improve cognitive function?",
  "Please list 5 underrated bands from the 1990s that had a significant impact on modern music.",
  "What are some of the most important considerations when designing an accessible web application?",
  "How has the philosophy of existentialism evolved from the 19th century to modern times?",
  "What are the advantages of using asynchronous programming in JavaScript, and when should it be avoided?",
  "Explain the concept of neuroplasticity and how it can be applied to learning new skills as an adult.",
  "What are some effective strategies for reducing one's carbon footprint in daily life?",
  "Provide a list of 7 influential female philosophers and their major contributions to philosophy.",
  "Can you explain how blockchain technology works and its potential applications beyond cryptocurrency?",
  "What are the top 5 recent developments in neuroscience that could reshape our understanding of the brain?",
];

export function useRandomQuestion(exampleButtonRef) {
  let exampleQuestion = ref("");

  useEventListener(exampleButtonRef, "click", (event) => {
    const randomIndex = Math.floor(Math.random() * exampleQuestions.length);
    exampleQuestion.value = exampleQuestions[randomIndex];
    console.log(exampleQuestion.value);
  });

  return {
    exampleQuestion,
  };
}
