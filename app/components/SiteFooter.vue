<!-- components/SiteFooter.vue -->
<template>
  <footer class="bg-[#c1856f] text-white">
    <div class="max-w-7xl mx-auto px-6 py-14">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">

        <!-- Cột 1: Logo -->
        <div class="md:col-span-3 flex flex-col items-start">
          <NuxtLink to="/" class="inline-block mb-4">
            <img
              src="~/assets/images/logo-DCV.png"
              alt="Đại Chủng Viện Thánh Giuse Sài Gòn"
              class="h-60 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition"
            />
          </NuxtLink>
        </div>

        <!-- Cột 2: Địa chỉ + Map -->
        <div class="md:col-span-3">
          <h4 class="text-sm font-semibold uppercase tracking-wider text-white/90 mb-4">
            Địa chỉ
          </h4>
          <a
            href="https://maps.google.com/?q=6+Tôn+Đức+Thắng,+Bến+Nghé,+Quận+1,+TP.+Hồ+Chí+Minh"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-start gap-3 text-sm text-white/90 hover:text-white transition"
          >
            <!-- Icon Map -->
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e4d4ce" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0 group-hover:scale-110 transition">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span class="leading-relaxed group-hover:underline underline-offset-2">
              6 Tôn Đức Thắng, P. Sài Gòn,<br />
              TP. Hồ Chí Minh
            </span>
          </a>
        </div>

        <!-- Cột 3: Liên hệ -->
        <div class="md:col-span-3">
          <h4 class="text-sm font-semibold uppercase tracking-wider text-white/90 mb-4">
            Liên hệ
          </h4>
          <ul class="space-y-3 text-sm text-white/90">
            <!-- Điện thoại -->
            <li class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e4d4ce" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <a href="tel:123456789" class="hover:text-white transition">
                123 456 789 (Sr.Tài)
              </a>
            </li>
      <!-- Website -->
    <li class="flex items-center gap-3">
             <!-- Biểu tượng website (globe) -->
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e4d4ce" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
            <path d="M2 12h20"/>
       </svg>
  
             <!-- Link website -->
             <a href="https://www.dcvgiusesaigon.vn/" target="_blank" class="hover:text-white transition">
              dcvgiusesaigon.vn
            </a>
       </li>
            <!-- Mail -->
            <li class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e4d4ce" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <a href="mailto:123@gmail.com" class="hover:text-white transition">
                123@gmail.com
              </a>
            </li>

            <!-- Liên hệ trực tiếp -->
            <li class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e4d4ce" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5">
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
                <path d="M10 6h4"/>
                <path d="M10 10h4"/>
                <path d="M10 14h4"/>
                <path d="M10 18h4"/>
              </svg>
              <span>
                Liên hệ trực tiếp: Tại lầu 1 phòng thư viện của Đại Chủng Viện Thánh Giuse Saigon.
              </span>
             
            </li>
          </ul>
        </div>

        <!-- Cột 4: Tìm nhanh -->
        <div class="md:col-span-3">
          <h4 class="text-sm font-semibold uppercase tracking-wider text-white/90 mb-4">
           <NuxtLink to="/" class="hover:text-white transition">Trang chủ</NuxtLink>
          </h4>
          <nav class="flex flex-col gap-2 text-sm text-white/90">            
            <NuxtLink to="/search" class="hover:text-white transition">Tìm Sách</NuxtLink>
            <NuxtLink to="/articles" class="hover:text-white transition">Bài Viết</NuxtLink>
            <NuxtLink to="/about" class="hover:text-white transition">Giới Thiệu</NuxtLink>
          </nav>
        </div>
      </div>
    </div>

    <!-- Copyright - chữ đen -->
    <div class="bg-[#e4d4ce] font- medium border-t border-black/5">
      <div class="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-black">
        <p>
          © {{ new Date().getFullYear() }} Archdiocese Saigon Seminary Library System. All rights reserved.
        </p>
        <p>
          Thư viện Chủng viện Thánh Giuse Saigon | Kho tàng tri thức
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Shared SiteFooter Component
</script>