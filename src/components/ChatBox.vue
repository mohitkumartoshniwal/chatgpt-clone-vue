<template>
  <div class="flex gap-1">
    <div class="flex-1 relative border-2 border-gray-300 p-3 rounded-lg flex">
      <input
        v-model="message"
        type="text"
        class="w-full outline-none"
        placeholder="Message ChatGPT..."
      />
      <div class="flex gap-2">
        <button
          class="border-gray-300 border px-2 py-1 rounded"
          @click="isUserVoiceEnabled = !isUserVoiceEnabled"
        >
          <span v-if="isUserVoiceEnabled"> &#128263; </span>
          <span v-else>&#128264;</span></button
        ><button @click="sendChats">➤</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { sendAllMessages } from "@/service";
import { CHATS } from "@/stores/chat";
import { useSpeechRecognition } from "@vueuse/core";

const message = ref("");
const isUserVoiceEnabled = ref(false);

const { isListening, result, start, stop, isSupported } = useSpeechRecognition({
  lang: "en-US",
  continuous: false,
});

if (isSupported.value) {
  watch(result, (value) => {
    if (isUserVoiceEnabled.value) {
      message.value = value;
    }
  });
}

watch(isListening, (value) => {
  if (!value && isUserVoiceEnabled.value) {
    start();
  }
});

watch(isUserVoiceEnabled, (value) => {
  if (value) {
    start();
  } else {
    stop();
  }
});

async function sendChats() {
  const userMessage = {
    role: "user",
    content: message.value,
  };
  CHATS.value.push(userMessage);

  let chatGPTMessage = await sendAllMessages(CHATS.value);
  CHATS.value.push(chatGPTMessage);
}
</script>
