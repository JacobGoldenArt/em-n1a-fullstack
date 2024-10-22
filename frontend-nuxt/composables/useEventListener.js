// event.js
import { watch } from "vue";

export function useEventListener(target, event, callback) {
  watch(target, (newVal) => {
    newVal.addEventListener(event, callback);
  });
}
