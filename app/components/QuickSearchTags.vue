<script setup lang="ts">
import { useSearchHistory } from "~/composables/useSearchHistory";

const { history, defaultTags, clearHistory } = useSearchHistory();

// Hybrid display: Combine recent history (up to 4) with default popular tags, avoiding duplicates
const displayTags = computed(() => {
  const combined = [...history.value];
  for (const tag of defaultTags) {
    if (!combined.some((t) => t.toLowerCase() === tag.toLowerCase())) {
      combined.push(tag);
    }
    if (combined.length >= 5) break;
  }
  return combined;
});
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-2 text-xs pt-1.5">
    <span
      class="text-white/80 dark:text-gray-300 font-medium mr-1 flex items-center gap-1"
    >
      <span>Tìm nhanh:</span>
    </span>

    <NuxtLink
      v-for="tag in displayTags"
      :key="tag"
      :to="'/search?q=' + encodeURIComponent(tag)"
      :aria-label="'Tìm kiếm từ khóa ' + tag"
      :title="tag"
      class="px-3 py-1 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm border border-white/25 transition-all font-medium flex items-center gap-1.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 max-w-[220px]"
    >
      <svg
        v-if="history.includes(tag)"
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="opacity-70 text-amber-300 flex-shrink-0"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <span class="truncate">{{ tag }}</span>
    </NuxtLink>
  </div>
</template>
