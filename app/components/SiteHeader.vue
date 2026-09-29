<script setup lang="ts">
import { ref } from "vue";
const mobileMenuOpen = ref(false);
</script>

<template>
  <!-- Header chia 2 khung màu -->
  <header class="bg-[#e4d4ce] text-gray-800 shadow-md w-full z-50 relative overflow-hidden">
    
    <!-- Khung màu cam đậm bên phải -->
    <div class="absolute top-0 right-0 w-72 md:w-88 h-full bg-[#c1856f]"></div>

    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative z-10">
      
      <!-- Logo & Title -->
      <div class="flex items-center space-x-3">
        <NuxtLink
          to="/"
          class="flex items-center space-x-2 font-semibold text-lg tracking-wide"
        >
          <img
            src="~/assets/images/logo-lib.png"
            alt="Logo thư viện"
            class="h-12 object-contain"
          />
        </NuxtLink>
      </div>

      <!-- Navigation-->
      <nav class="hidden md:flex items-center space-x-6 text-sm font-medium">
        <NuxtLink
          to="/search"
          class="hover:text-[#c1856f] transition-colors pb-1"
          exactActiveClass="border-b-2 border-[#c1856f]"
        >
          Tìm Sách
        </NuxtLink>
        <NuxtLink
          to="/articles"
          class="hover:text-[#c1856f] transition-colors pb-1"
          exactActiveClass="border-b-2 border-[#c1856f]"
        >
          Bài Viết
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="hover:text-[#c1856f] transition-colors pb-1"
          exactActiveClass="border-b-2 border-[#c1856f]"
        >
          Giới Thiệu
        </NuxtLink>
      </nav>

      <!-- Account & Mobile Menu Button -->
      <div class="flex items-center space-x-3 text-sm relative z-10">
        <NuxtLink
          class="hidden sm:inline-flex items-center px-4 py-2 rounded-l bg-[#b06a52] text-white font-medium
                 shadow-md hover:bg-[#9a5a45] hover:shadow-lg 
                 transition-all duration-200"
          to="/bookshelf"
        >
          Kệ sách cá nhân
        </NuxtLink>

        <!-- Nút Hamburger mobile -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded hover:bg-black/10 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden bg-[#c1856f] text-white border-t border-[#a86f5a] px-4 py-4 space-y-3 relative z-10"
    >
      <NuxtLink
        to="/search"
        @click="mobileMenuOpen = false"
        class="block py-2 text-sm font-medium hover:text-amber-100"
      >
        Tìm Sách
      </NuxtLink>
      <NuxtLink
        to="/shelf"
        @click="mobileMenuOpen = false"
        class="block py-2 text-sm font-medium hover:text-amber-100"
      >
        Kệ Sách Của Tôi
      </NuxtLink>
      <NuxtLink
        to="/articles"
        @click="mobileMenuOpen = false"
        class="block py-2 text-sm font-medium hover:text-amber-100"
      >
        Bài Viết
      </NuxtLink>

    </div>
  </header>
</template>
