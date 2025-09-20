<script setup lang="ts">
import { QrCodeIcon } from "lucide-vue-next";
import QRStudio from "./components/QRStudio.vue";
</script>

<template>
  <div class="w-full h-full flex flex-col gap-8 justify-start items-center pt-6 md:justify-center md:pt-0">
    <h1 class="inline-flex gap-4 items-center font-medium text-lg text-gray-500">
      <qr-code-icon :size="24" /> QR Code Generator
    </h1>
    <q-r-studio />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
