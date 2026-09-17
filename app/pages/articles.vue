<script setup lang="ts">
import SiteHeader from "~/components/SiteHeader.vue";
import SiteFooter from "~/components/SiteFooter.vue";

useHead({
  title: "Bài Viết & Hướng Dẫn | Thư Viện Đại Chủng Viện Thánh Giuse Sài Gòn",
});

const articles = [
  {
    id: 1,
    title: "Hướng dẫn tra cứu tài liệu chuyên khảo trên hệ thống OPAC mới",
    date: "10/09/2026",
    summary: "Tìm hiểu cách sử dụng hệ thống tra cứu trực tuyến để nhanh chóng tìm thấy các ấn phẩm Kinh Thánh, Triết học và Thần học.",
    category: "Hướng dẫn"
  },
  {
    id: 2,
    title: "Danh mục các tạp chí thần học quốc tế định kỳ tại thư viện",
    date: "05/09/2026",
    summary: "Tổng hợp các ấn phẩm định kỳ và tạp chí nghiên cứu chuyên sâu phục vụ cho công tác biên khảo và học tập.",
    category: "Tài liệu"
  },
  {
    id: 3,
    title: "Quy định mượn trả sách và sử dụng phòng đọc nghiên cứu",
    date: "01/09/2026",
    summary: "Cập nhật các quy định mới nhất về thời gian mượn, thủ tục gia hạn và nội quy khi sinh hoạt tại các phòng đọc chuyên đề.",
    category: "Quy chế"
  }
];
</script>

<template>
  <div
    class="min-h-screen bg-[#fafafa] font-sans text-gray-800 flex flex-col text-base"
  >
    <SiteHeader />

    <main class="max-w-5xl mx-auto px-4 py-12 flex-grow space-y-8">
      <!-- Header banner -->
      <div class="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-[#e4e4e4] space-y-3">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-emerald-500/15 text-emerald-800 border border-emerald-500/30">
          Góc thông tin & Bài viết
        </span>
        <h1 class="font-serif text-3xl md:text-4xl font-bold text-[#40596c]">
          Tài Liệu Hướng Dẫn & Thông Báo
        </h1>
        <p class="text-gray-600 text-base">
          Cập nhật các hướng dẫn tra cứu, thông báo mới và tài liệu nghiên cứu thần học từ thư viện.
        </p>
      </div>

      <!-- Articles Grid -->
      <div class="grid gap-6">
        <article
          v-for="article in articles"
          :key="article.id"
          class="bg-white p-6 rounded-xl shadow-sm border border-[#e4e4e4] hover:shadow-md transition duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div class="space-y-2 flex-grow">
            <div class="flex items-center gap-3">
              <span class="px-2.5 py-0.5 rounded text-xs font-semibold bg-[#d9e4ea] text-[#40596c]">
                {{ article.category }}
              </span>
              <span class="text-xs text-gray-400">{{ article.date }}</span>
            </div>
            <h2 class="font-serif text-xl font-bold text-[#35536c] hover:underline cursor-pointer">
              {{ article.title }}
            </h2>
            <p class="text-sm text-gray-600 leading-relaxed">
              {{ article.summary }}
            </p>
          </div>
        </article>
      </div>
    </main>

    <!-- Footer -->
    <SiteFooter />
  </div>
</template>
