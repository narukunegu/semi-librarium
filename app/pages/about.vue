<script setup lang="ts">
import SiteHeader from "~/components/SiteHeader.vue";
</script>

<template>
  <div
    class="min-h-screen bg-[#fafafa] font-sans text-gray-800 flex flex-col text-base"
  >
    <SiteHeader />

    <main class="max-w-5xl mx-auto px-4 py-12 flex-grow space-y-10">
      <!-- Hero Header -->
      <div class="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-[#e4e4e4] space-y-4">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-amber-500/15 text-amber-800 border border-amber-500/30">
          Giới thiệu chung
        </span>
        <h1 class="font-serif text-3xl md:text-4xl font-bold text-[#40596c]">
          Thư Viện Đại Chủng Viện Thánh Giuse Sài Gòn
        </h1>
        <p class="text-lg text-gray-600 leading-relaxed">
          Nơi lưu giữ, phát triển và cung cấp nguồn tài liệu học thuật chuyên sâu về Kitô giáo, Triết học và Thần học phục vụ cho việc đào tạo và nghiên cứu.
        </p>
      </div>

      <!-- Core Info Grid -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-[#e4e4e4] space-y-3">
          <h2 class="font-serif text-xl font-bold text-[#40596c] border-b pb-2">Lịch sử & Sứ mạng</h2>
          <p class="text-gray-600 text-sm leading-relaxed">
            Được thành lập cùng với quá trình hình thành của Đại Chủng Viện, thư viện là trung tâm tài liệu quan trọng hỗ trợ quý cha giáo, chủng sinh và các nhà nghiên cứu trong hành trình tìm kiếm tri thức và đức tin.
          </p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-[#e4e4e4] space-y-3">
          <h2 class="font-serif text-xl font-bold text-[#40596c] border-b pb-2">Quy mô tài liệu</h2>
          <p class="text-gray-600 text-sm leading-relaxed">
            Thư viện lưu trữ hơn 70.000 đầu sách đa dạng ngôn ngữ (Tiếng Việt, Tiếng Pháp, Tiếng Anh, Latinh...), các bản văn cổ, từ điển chuyên ngành và các tạp chí thần học quốc tế uy tín.
          </p>
        </div>
      </div>

      <!-- Schedule & Contact Info -->
      <div class="bg-[#40596c] text-white p-8 rounded-xl shadow-md space-y-4">
        <h2 class="font-serif text-2xl font-bold text-amber-200">Giờ phục vụ & Liên hệ</h2>
        <div class="grid sm:grid-cols-2 gap-4 text-sm text-slate-200">
          <div>
            <strong class="text-white block mb-1">Thời gian mở cửa:</strong>
            <p>Thứ Hai – Thứ Sáu: 8:00 - 11:00 | 14:00 - 16:00</p>
            <p>Thứ Bảy: 8:00 - 11:30</p>
            <p class="text-amber-300 mt-1">Chúa Nhật & Ngày Lễ: Nghỉ</p>
          </div>
          <div>
            <strong class="text-white block mb-1">Địa chỉ:</strong>
            <p>6 Tôn Đức Thắng, P. Bến Nghé, Q.1, TP. Hồ Chí Minh</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-[#40596c] text-white text-xs py-6 mt-12 border-t border-[#53738c]">
      <div class="max-w-7xl mx-auto px-4 text-center space-y-2">
        <p>© Archdiocese Saigon Seminary Library System. All rights reserved.</p>
        <div class="flex justify-center space-x-4 text-slate-300">
          <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
          <NuxtLink to="/search" class="hover:underline">Search</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>
