<script setup lang="ts">
import { ref } from "vue";
const mobileMenuOpen = ref(false);
</script>

<template>
  <header class="bg-[#53738c] text-white shadow-md w-full sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo & Title -->
      <div class="flex items-center space-x-3">
        <NuxtLink
          to="/"
          class="flex items-center space-x-2 font-semibold text-lg tracking-wide"
        >
          <img
            src="~/assets/images/logo-lib.png"
            alt=""
            class="h-12 object-contain"
          />
        </NuxtLink>
      </div>

      <!-- Navigation Preserved Links -->
      <nav class="hidden md:flex items-center space-x-6 text-sm font-medium">
        <NuxtLink
          to="/search"
          class="hover:text-amber-200 transition-colors pb-1"
          exactActiveClass="border-b-2 border-white"
        >
          Tìm Sách
        </NuxtLink>
        <NuxtLink
          to="/articles"
          class="hover:text-amber-200 transition-colors pb-1"
          exactActiveClass="border-b-2 border-white"
        >
          Bài Viết
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="hover:text-amber-200 transition-colors pb-1"
          exactActiveClass="border-b-2 border-white"
        >
          Thông Tin
        </NuxtLink>
      </nav>

      <!-- Account & Actions / Mobile Menu Button -->
      <div class="flex items-center space-x-3 text-sm">
        <button
          class="hidden sm:inline-block px-3 py-1.5 rounded bg-black/20 hover:bg-black/30 transition-colors"
        >
          Đăng Nhập
        </button>

        <!-- Mobile Hamburger Toggle -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded hover:bg-black/20 transition-colors"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-[#40596c] border-t border-[#53738c] px-4 py-4 space-y-3">
      <NuxtLink
        to="/search"
        @click="mobileMenuOpen = false"
        class="block py-2 text-sm font-medium hover:text-amber-200"
      >
        Tìm Sách
      </NuxtLink>
      <NuxtLink
        to="/articles"
        @click="mobileMenuOpen = false"
        class="block py-2 text-sm font-medium hover:text-amber-200"
      >
        Bài Viết
      </NuxtLink>
      <NuxtLink
        to="/about"
        @click="mobileMenuOpen = false"
        class="block py-2 text-sm font-medium hover:text-amber-200"
      >
        Thông Tin
      </NuxtLink>
      <button
        class="w-full text-left py-2 text-sm font-medium hover:text-amber-200"
      >
        Đăng Nhập
      </button>
    </div>
  </header>
</template>
