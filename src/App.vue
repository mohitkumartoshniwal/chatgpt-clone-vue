<script setup lang="ts">
import ChatBox from "./components/ChatBox.vue";
import ChatsContainer from "./components/ChatsContainer.vue";
</script>

<template>
  <div
    class="h-screen w-full max-w-4xl mx-auto p-4 flex flex-col justify-between"
  >
    <ChatsContainer class="flex-1 p-2 overflow-auto" />
    <ChatBox />
  </div>
</template>
