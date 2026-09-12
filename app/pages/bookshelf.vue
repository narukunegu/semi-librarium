<script setup lang="ts">
import SiteHeader from "~/components/SiteHeader.vue";
import { useResearchShelf } from "~/composables/useResearchShelf";

useHead({
  title: "Kệ Sách Cá Nhân | Thư Viện Đại Chủng Viện Thánh Giuse Sài Gòn",
});

const { savedBooks, toggleSaveBook } = useResearchShelf();
</script>

<template>
  <div
    class="min-h-screen bg-[#fafafa] font-sans text-gray-800 flex flex-col text-base"
  >
    <SiteHeader />

    <main class="max-w-5xl mx-auto px-4 py-12 flex-grow space-y-8">
      <div
        class="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-[#e4e4e4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div class="space-y-2">
          <h1 class="font-serif text-3xl font-bold text-[#40596c]">
            Kệ sách cá nhân
          </h1>
          <p class="text-gray-600 text-sm">
            Lưu trữ và quản lý các ấn phẩm phục vụ cho việc nghiên cứu cá nhân.
          </p>
        </div>
      </div>

      <div
        v-if="savedBooks.length === 0"
        class="bg-white p-12 rounded-xl text-center border border-dashed border-slate-300 space-y-4"
      >
        <div
          class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto"
        >
          📚
        </div>
        <p class="text-lg font-semibold text-slate-700">
          Kệ sách của bạn đang trống.
        </p>
        <p class="text-sm text-slate-500 max-w-sm mx-auto">
          Hãy tìm kiếm tài liệu và nhấn "Lưu vào kệ sách" để lưu các ấn phẩm yêu
          thích vào đây.
        </p>
        <NuxtLink
          to="/search"
          class="inline-block px-6 py-2.5 bg-academic-slate text-white text-sm font-semibold rounded hover:bg-slate-700 transition"
        >
          Khám phá thư viện
        </NuxtLink>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="book in savedBooks"
          :key="book['So Tai san']"
          class="bg-white p-5 rounded-xl shadow-sm border border-[#e4e4e4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-16 h-20 bg-slate-100 rounded border flex-shrink-0 overflow-hidden relative"
            >
              <img
                :src="`http://thuvien.dcvgiusesaigon.vn/api/books/cover/${book['So Tai san']}.jpg`"
                :alt="book.Tua"
                class="object-cover w-full h-full absolute inset-0"
                @error="
                  (e: Event) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }
                "
              />
            </div>
            <div class="space-y-1">
              <NuxtLink
                :to="'/book-' + book['So Tai san']"
                class="font-serif font-bold text-lg text-[#35536c] hover:underline"
              >
                {{ book.Tua }}
              </NuxtLink>
              <p class="text-sm text-gray-600">
                {{ book["Ho Tac gia"] }} {{ book["Ten Tac gia"] }} ({{
                  book["Nam Xb"] || "n.d."
                }})
              </p>
              <span
                class="inline-block text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600"
              >
                ID: {{ book["So Tai san"] }}
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2 self-end sm:self-center">
            <NuxtLink
              :to="'/book-' + book['So Tai san']"
              class="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition"
            >
              Xem chi tiết
            </NuxtLink>
            <button
              @click="toggleSaveBook(book)"
              class="px-3 py-1.5 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 rounded transition"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer
      class="bg-[#40596c] text-white text-xs py-6 mt-12 border-t border-[#53738c]"
    >
      <div class="max-w-7xl mx-auto px-4 text-center space-y-2">
        <p>
          © Archdiocese Saigon Seminary Library System. All rights reserved.
        </p>
        <div class="flex justify-center space-x-4 text-slate-300">
          <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
          <NuxtLink to="/search" class="hover:underline">Search</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>
