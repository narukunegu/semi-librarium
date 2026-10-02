<script setup lang="ts">
import SiteHeader from "~/components/SiteHeader.vue";
import SiteFooter from "~/components/SiteFooter.vue";
import { useResearchShelf } from "~/composables/useResearchShelf";

useHead({
  title: "Kệ Sách Cá Nhân | Thư Viện Đại Chủng Viện Thánh Giuse Sài Gòn",
});

const { savedBooks, toggleSaveBook } = useResearchShelf();
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#f7f3ef] font-sans text-gray-800">
    <SiteHeader />

    <!-- Khung tiêu đề: gần full page, không full, có bóng + hover -->
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-10">
      <section
        class="relative rounded-2xl overflow-hidden bg-[#40596c]/90
               shadow-lg hover:shadow-2xl hover:-translate-y-0.5
               transition-all duration-300 ease-out"
      >
        <div
          class="absolute inset-0 opacity-30 pointer-events-none"
          style="background-image: radial-gradient(circle at 20% 20%, #c1856f55, transparent 50%),
                 radial-gradient(circle at 80% 60%, #ffffff88, transparent 45%);"
        ></div>

        <div class="relative px-4 sm:px-6 py-10 md:py-14">
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div class="max-w-2xl">
              <h1 class="font-serif text-3xl md:text-4xl font-bold text-[#D4AF37] mb-3">
                Kệ sách cá nhân
              </h1>
              <p class="text-sm md:text-base text-white leading-relaxed">
                Lưu trữ và quản lý các ấn phẩm phục vụ nghiên cứu.
                Nhấn <strong>“Lưu vào kệ sách”</strong> ở trang chi tiết để thêm sách vào đây.
              </p>
              <p class="mt-2 text-s italic text-white/90">
                Lưu ý: danh sách chỉ lưu trên trình duyệt máy này (đổi máy sẽ không còn).
              </p>
            </div>

            <!-- Thống kê nhỏ -->
            <div class="flex items-center gap-3">
              <div class="bg-white/80 backdrop-blur border border-white/60 rounded-xl px-5 py-4 shadow-sm min-w-[100px] text-center">
                <p class="text-2xl font-bold text-[#c1856f]">{{ savedBooks.length }}</p>
                <p class="text-xs text-gray-600 mt-0.5">ấn phẩm đã lưu</p>
              </div>
              <NuxtLink
                to="/search"
                class="inline-flex items-center justify-center px-4 py-3 rounded-l
                       bg-[#c1856f] hover:bg-[#a86f5a] text-white text-sm font-semibold
                       shadow-md transition active:scale-95"
              >
                Tìm thêm sách
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Nội dung chính -->
    <main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <!-- Empty state -->
      <div
        v-if="savedBooks.length === 0"
        class="bg-white rounded-2xl border border-dashed border-[#d4c0b4]
               shadow-sm px-6 py-16 text-center"
      >
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f3e8e1] flex items-center justify-center text-3xl">
          📚
        </div>
        <h2 class="text-lg font-semibold text-gray-800 mb-2">
          Kệ sách của bạn đang trống
        </h2>
        <p class="text-sm text-gray-500 max-w-md mx-auto mb-6">
          Hãy tìm kiếm tài liệu và nhấn “Lưu vào kệ sách” để lưu các ấn phẩm yêu thích vào đây.
        </p>
        <NuxtLink
          to="/search"
          class="inline-flex items-center justify-center px-6 py-2.5 rounded-xl
                 bg-[#c1856f] hover:bg-[#a86f5a] text-white text-sm font-semibold
                 shadow transition"
        >
          Khám phá thư viện
        </NuxtLink>
      </div>

      <!-- Danh sách sách đã lưu -->
      <div v-else class="space-y-4">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            Danh sách đã lưu
          </h2>
          <span class="text-xs text-gray-400">{{ savedBooks.length }} mục</span>
        </div>

        <div
          v-for="book in savedBooks"
          :key="book['So Tai san']"
          class="group bg-white rounded-2xl border border-[#eadfd7] shadow-sm
                 hover:shadow-md hover:border-[#c1856f]/40
                 transition-all duration-300
                 p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div class="flex items-start sm:items-center gap-4 min-w-0">
            <div class="w-14 h-[4.5rem] md:w-16 md:h-20 bg-[#f3ebe5] rounded-lg border border-[#e8ddd4]
                        flex-shrink-0 overflow-hidden relative shadow-sm">
              <img
                :src="`//data.dcvgiusesaigon.vn/api/books/cover/${book['So Tai san']}.jpg`"
                :alt="book.Tua"
                class="object-cover w-full h-full absolute inset-0"
                @error="(e: Event) => { (e.target as HTMLElement).style.display = 'none' }"
              />
            </div>

            <div class="min-w-0 space-y-1">
              <NuxtLink
                :to="'/book-' + book['So Tai san']"
                class="font-serif font-bold text-base md:text-lg text-[#35536c]
                       hover:text-[#c1856f] hover:underline line-clamp-2 transition-colors"
              >
                {{ book.Tua }}
              </NuxtLink>
              <p class="text-sm text-gray-600 line-clamp-1">
                {{ book["Ho Tac gia"] }} {{ book["Ten Tac gia"] }}
                <span v-if="book['Nam Xb']" class="text-gray-400">
                  ({{ book["Nam Xb"] }})
                </span>
              </p>
              <span class="inline-block text-[11px] font-mono bg-[#f3ebe5] px-2 py-0.5 rounded text-[#6b5346]">
                ID: {{ book["So Tai san"] }}
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
            <NuxtLink
              :to="'/book-' + book['So Tai san']"
              class="px-3.5 py-2 text-xs font-semibold rounded-lg
                     bg-[#f3ebe5] hover:bg-[#e8d5c8] text-[#5c463a] transition"
            >
              Xem chi tiết
            </NuxtLink>
            <button
              @click="toggleSaveBook(book)"
              class="px-3.5 py-2 text-xs font-semibold rounded-lg
                     bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-100 transition"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer
      class=" bg-[#f3ebe5] text-BLACK text-xs py-4 mt-10 border-t border-[#53738c]"
    >
      <div class="max-w-7xl mx-auto px-4 text-center space-y-2">
        <p>
          © Archdiocese Saigon Seminary Library System. All rights reserved.
        </p>

      </div>
    </footer> 
  </div>
</template>

