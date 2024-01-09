<template>
  <div class="flex gap-1">
    <span v-if="isUser">&#128100;</span>
    <img
      v-else
      src="../assets/chatgpt.svg"
      alt="chatgpt logo"
      class="w-4 h-4 mt-1"
    />
    <div>
      <div v-if="isUser" class="font-bold">You</div>
      <div v-else class="font-bold">ChatGPT</div>
      <div>{{ content }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  content: string;
  role: string;
}>();

const isUser = computed(() => {
  return props.role === "user";
});
</script>
