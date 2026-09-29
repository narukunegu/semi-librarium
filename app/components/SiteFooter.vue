<!-- components/SiteFooter.vue -->
<template>
  <footer class="bg-[#c1856f]/100 text-white">
    <div class="max-w-7xl mx-auto px-6 py-14">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">

        <!-- Cột 1: Logo chủng viện -->
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
            class="group flex items-start gap-3 text-sm text-white/80 hover:text-white transition"
          >
            <span class="i-lucide-map-pin text-lg text-[#e4d4ce] mt-0.5 shrink-0"></span>
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
          <ul class="space-y-3 text-sm text-white/80">
            <li class="flex items-center gap-3">
              <span class="i-lucide-phone text-lg text-[#e4d4ce] shrink-0"></span>
              <a href="tel:09123765" class="hover:text-white transition">
                123 456 789 (Sr.Tài)
              </a>
            </li>
            <li class="flex items-center gap-3">
              <span class="i-lucide-mail text-lg text-[#e4d4ce] shrink-0"></span>
              <a href="mailto:Mail:123@gmail.com" class="hover:text-white transition">
                Mail:123@gmail.com
              </a>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-lg text-[#e4d4ce] shrink-0"></span>
              <span>Trực tiếp: Tại Phòng Thư Viện - Lầu 1</span>
            </li>
          </ul>
        </div>

        <!-- Cột 4: Mạng xã hội + Menu nhanh -->
        <div class="md:col-span-3">
          <h4 class="text-sm font-semibold uppercase tracking-wider text-white/90 mb-4">
            TÌM NHANH
          </h4>
      <div class="flex items-center space-x-3">
         <NuxtLink
          to="/"
          class="hover:text-[#c1856f] transition-colors pb-1"
        >
          Back Home
        </NuxtLink>
      </div>

          <nav class="flex flex-col gap-2 text-sm text-white/80">
            <NuxtLink to="/search" class="hover:text-white transition">Tìm Sách</NuxtLink>
            <NuxtLink to="/articles" class="hover:text-white transition">Bài Viết</NuxtLink>
            <NuxtLink to="/about" class="hover:text-white transition">Giới Thiệu</NuxtLink>
          </nav>
        </div>
      </div>
    </div>

    <!-- Thanh copyright dưới -->
    <div class="bg-[#e4d4ce] text-gray border-t border-white/10">
      <div class="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
        <p>© {{ new Date().getFullYear() }} Archdiocese Saigon Seminary Library System. All rights reserved.</p>
        <p>Thư viện Chủng viện Thánh Giuse Saigon - Kho tàng tri thức</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Shared SiteFooter Component
</script>
