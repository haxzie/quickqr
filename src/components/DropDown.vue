<script setup lang="ts">
import { ref } from "vue";
import { ChevronDownIcon } from "lucide-vue-next";
import type { QROption } from "../utils/options";

defineProps<{
  options: QROption[];
  selectedOption: QROption;
}>();

const emit = defineEmits<{
  selectOption: [option: QROption];
}>();

const isOpen = ref(false);

const selectOption = (option: QROption) => {
  emit("selectOption", option);
  isOpen.value = false;
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="relative">
    <!-- Dropdown Button -->
    <button
      @click="toggleDropdown"
      class="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
    >
      <component :is="selectedOption.icon" :size="18" class="text-gray-600" />
      <ChevronDownIcon 
        :size="14" 
        class="text-gray-400 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      class="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]"
    >
      <div
        v-for="option in options"
        :key="option.name"
        @click="selectOption(option)"
        class="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer first:rounded-t-lg last:rounded-b-lg transition-colors"
      >
        <component :is="option.icon" :size="16" class="text-gray-600" />
        <span class="text-sm text-gray-700">{{ option.name }}</span>
      </div>
    </div>

    <!-- Backdrop to close dropdown -->
    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="fixed inset-0 z-0"
    ></div>
  </div>
</template>