<script setup lang="ts">
import { ref } from "vue";
import type { BookItem } from "~/types/book";
import BookCoverImage from "~/components/BookCoverImage.vue";

const scrollContainer = ref<HTMLElement | null>(null);

const {
  data: newBooks,
  pending,
  error,
} = await useAsyncData<BookItem[]>("new-books-carousel", async () => {
  try {
    const response = await $fetch<any>(
      "//data.dcvgiusesaigon.vn/api/books/new",
    );
    if (Array.isArray(response)) {
      return response;
    }
    if (response && Array.isArray(response.books)) {
      return response.books;
    }
    return [];
  } catch (e) {
    // Fallback sample data if API is unreachable
    return [];
  }
});

const scrollBy = (offset: number) => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: offset, behavior: "smooth" });
  }
};
</script>

<template>
  <section class="my-16 lg:my-24 container mx-auto px-4">
    <div class="text-center mb-10">
      <h2 class="text-xl sm:text-3xl font-bold text-yellow-900 mb-2">
        Sách Mới
      </h2>
      <div class="mx-auto mt-3 w-24 h-1 bg-[#c1856f] rounded-full"></div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="flex gap-6 overflow-hidden py-4 justify-center">
      <div
        v-for="i in 5"
        :key="i"
        class="w-44 sm:w-52 h-72 bg-slate-200 animate-pulse rounded-xl flex-shrink-0 shadow-sm"
      ></div>
    </div>

    <!-- Error or Empty State -->
    <div
      v-else-if="error || !newBooks || newBooks.length === 0"
      class="text-center py-10 text-slate-500 bg-amber-50/50 rounded-xl border border-amber-200/60 p-6 max-w-xl mx-auto"
    >
      <svg
        class="w-10 h-10 mx-auto text-amber-500 mb-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
      <p class="text-sm font-medium">Đang cập nhật danh mục sách mới.</p>
    </div>

    <!-- Carousel View -->
    <div v-else class="relative group/carousel">
      <!-- Scroll Left Button -->
      <button
        @click="scrollBy(-300)"
        class="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-white hover:scale-105 transition-all opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
        aria-label="Cuộn sang trái"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Scroll Right Button -->
      <button
        @click="scrollBy(300)"
        class="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-white hover:scale-105 transition-all opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
        aria-label="Cuộn sang phải"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <!-- Carousel Container -->
      <div
        ref="scrollContainer"
        class="flex gap-5 overflow-x-auto pb-4 pt-2 px-2 scroll-smooth snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        <NuxtLink
          v-for="book in newBooks"
          :key="book['So Tai san']"
          :to="`/book-${book['So Tai san']}`"
          class="w-44 sm:w-52 flex-shrink-0 snap-start bg-white rounded-xl p-3 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-200/80 flex flex-col group"
        >
          <!-- Book Cover -->
          <div
            class="w-full h-60 sm:h-68 rounded-lg overflow-hidden bg-slate-100 relative mb-3"
          >
            <BookCoverImage
              :assetId="book['So Tai san']"
              :title="book.Tua"
              class="w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <!-- Metadata -->
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <h3
                class="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-[#c1856f] transition-colors"
              >
                {{ book.Tua }}
              </h3>
            </div>
            <div
              class="mt-2 pt-2 border-t border-slate-100 text-xs text-slate-600 flex justify-between items-center"
            >
              <span class="truncate max-w-[120px]"
                >{{ book["Ho Tac gia"] }} {{ book["Ten Tac gia"] }}</span
              >
              <span
                v-if="book['Nam Xb']"
                class="text-slate-400 font-mono text-[11px]"
                >{{ book["Nam Xb"] }}</span
              >
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
