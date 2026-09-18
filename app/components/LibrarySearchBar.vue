<script setup lang="ts">
import { ref, watch } from "vue";
import type { ResultEntry } from "~/types/book";

const props = defineProps<{
  modelValue?: string;
  variant?: "hero" | "banner";
}>();

const emit = defineEmits(["update:modelValue", "submit"]);

const searchQuery = ref(props.modelValue || "");
const suggestions = ref<ResultEntry[]>([]);
const cachedSuggestions = ref<ResultEntry[]>([]);
const showSuggestions = ref(false);
const isFocused = ref(false);
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const removeDiacritics = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
};

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined && val !== searchQuery.value) {
      searchQuery.value = val;
    }
  },
);

watch(searchQuery, (newVal, oldVal) => {
  emit("update:modelValue", newVal);

  if (!isFocused.value) {
    showSuggestions.value = false;
    return;
  }

  if (debounceTimer) clearTimeout(debounceTimer);

  const trimmed = newVal.trim();
  const words = trimmed.split(/\s+/).filter(Boolean);

  if (words.length <= 1 || trimmed.length < 3) {
    suggestions.value = [];
    cachedSuggestions.value = [];
    showSuggestions.value = false;
    return;
  }

  console.log("oldVal", oldVal);

  const endedWithSpace =
    newVal.endsWith(" ") || newVal.endsWith("\t") || newVal.endsWith("\n");
  const addedSpace = endedWithSpace && !oldVal?.endsWith(" ");

  // 1. Only trigger API request when detect new word in search input (white space after new word)
  if (addedSpace || cachedSuggestions.value.length === 0) {
    debounceTimer = setTimeout(async () => {
      try {
        const response = await $fetch<{ books?: ResultEntry[] }>(
          "//data.dcvgiusesaigon.vn/api/books?q=" + encodeURIComponent(trimmed),
        );
        if (response && response.books && isFocused.value) {
          cachedSuggestions.value = response.books;
          suggestions.value = cachedSuggestions.value.slice(0, 9);
          showSuggestions.value = suggestions.value.length > 0;
        } else {
          cachedSuggestions.value = [];
          suggestions.value = [];
          showSuggestions.value = false;
        }
      } catch {
        cachedSuggestions.value = [];
        suggestions.value = [];
        showSuggestions.value = false;
      }
    }, 300);
  } else {
    // 2. When user input current word, filter suggest base on previous API response.
    const lowerQ = removeDiacritics(trimmed);
    const filtered = cachedSuggestions.value.filter((item) => {
      const title = removeDiacritics(item.item.Tua || "");
      const author = removeDiacritics(
        (item.item["Ho Tac gia"] || "") +
          " " +
          (item.item["Ten Tac gia"] || ""),
      );
      return title.includes(lowerQ) || author.includes(lowerQ);
    });
    suggestions.value = filtered.slice(0, 9);
    showSuggestions.value = isFocused.value && suggestions.value.length > 0;
  }
});

const onSubmit = (e: Event) => {
  e.preventDefault();
  showSuggestions.value = false;
  if (searchQuery.value.trim()) {
    emit("submit", searchQuery.value);
    navigateTo("/search?q=" + encodeURIComponent(searchQuery.value));
  }
};

const selectSuggestion = (title: string) => {
  showSuggestions.value = false;
  suggestions.value = [];
  cachedSuggestions.value = [];
  isFocused.value = false;
  searchQuery.value = title;
  emit("submit", title);
  navigateTo("/search?q=" + encodeURIComponent(title));
};

const handleFocus = () => {
  isFocused.value = true;
  // 3. Avoid misbehaviors: work correctly when refocus on search input
  const trimmed = searchQuery.value.trim();
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length > 1 && trimmed.length >= 3 && suggestions.value.length > 0) {
    showSuggestions.value = true;
  }
};

const handleBlur = () => {
  isFocused.value = false;
  setTimeout(() => {
    showSuggestions.value = false;
  }, 200);
};
</script>

<template>
  <div class="relative w-full">
    <form
      v-if="variant === 'hero'"
      class="relative w-full glass-surface rounded-md p-1.5 shadow-2xl border border-white/25 transition-all duration-300 focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent text-left"
      method="GET"
      action="/search"
      @submit="onSubmit"
    >
      <div class="relative flex items-center w-full">
        <input
          class="w-full rounded-sm border-none bg-background/90 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 pr-14 h-12 font-sans transition-colors"
          placeholder="Tra cứu tài liệu, tác giả, tác phẩm..."
          name="q"
          v-model="searchQuery"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <div class="absolute right-1 flex items-center pr-1">
          <div
            data-orientation="vertical"
            role="none"
            class="shrink-0 bg-border w-[1px] h-6 mr-2 hidden sm:block"
          ></div>
          <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-sm text-base font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground h-10 w-10 active:scale-95"
            type="submit"
            aria-label="Tìm kiếm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-search"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </button>
        </div>
      </div>
    </form>

    <div v-else class="flex flex-col sm:flex-row gap-3">
      <div class="relative flex-grow">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm sách, tác giả, chủ đề..."
          class="w-full h-12 px-4 pr-10 text-lg rounded border-none shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-900"
          @keyup.enter="onSubmit"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-base font-bold"
        >
          ✕
        </button>
      </div>
      <button
        @click="onSubmit"
        class="h-12 px-8 bg-[#3ea03e] hover:bg-emerald-600 text-white font-semibold text-base rounded shadow transition-colors flex items-center justify-center uppercase tracking-wider"
      >
        Tìm kiếm
      </button>
    </div>

    <div
      v-if="showSuggestions && suggestions.length > 0"
      class="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-md shadow-xl z-50 overflow-hidden max-h-80 overflow-y-auto text-left"
    >
      <div
        class="px-3 py-2 text-xs font-semibold text-gray-400 border-b border-gray-100 dark:border-slate-800 uppercase tracking-wider"
      >
        Gợi ý tìm kiếm ({{ suggestions.length }})
      </div>
      <ul>
        <li
          v-for="(item, idx) in suggestions"
          :key="item.item['So Tai san'] || idx"
          @mousedown.prevent="selectSuggestion(item.item.Tua)"
          class="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer border-b border-gray-50 dark:hover:bg-slate-800/50 transition-colors flex flex-col"
        >
          <span
            class="text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-1"
          >
            {{ item.item.Tua }}
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400">
            {{ item.item["Ho Tac gia"] }} {{ item.item["Ten Tac gia"] }}
            <span v-if="item.item['Nam Xb']">({{ item.item["Nam Xb"] }})</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
