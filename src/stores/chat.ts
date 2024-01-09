import type { CHAT } from "@/types";
import { useLocalStorage } from "@vueuse/core";

export const CHATS = useLocalStorage<CHAT[]>("CHATS", [
  { role: "system", content: "You are a helpful assistant." },
]);
