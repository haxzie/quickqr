<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}>();

const searchValue = ref(props.value);

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const debouncedSearch = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    props.onChange(searchValue.value);
  }, 300);
};
</script>

<template>
  <input
    type="text"
    :placeholder="placeholder"
    class="flex-1 text-sm outline-none h-full min-w-0"
    v-model="searchValue"
    @input="debouncedSearch"
    autofocus
  />
</template>
