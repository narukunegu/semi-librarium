<script setup lang="ts">
defineProps<{
  assetId: string;
  title: string;
}>();

const handleImageError = (e: Event) => {
  const target = e.target as HTMLElement;
  target.style.display = "none";
  const pseudo = target.nextElementSibling as HTMLElement;
  if (pseudo) pseudo.style.display = "flex";
};
</script>

<template>
  <div
    class="bg-slate-100 border border-slate-200/80 rounded-lg flex flex-col items-center justify-center p-1 text-center select-none shadow-sm relative overflow-hidden group"
  >
    <img
      :src="`//data.dcvgiusesaigon.vn/api/books/cover/${assetId}.jpg`"
      class="object-cover w-full h-full absolute inset-0 z-10"
      @error="handleImageError"
    />
    <!-- Fallback pseudo cover -->
    <div
      class="absolute inset-0 flex flex-col items-center justify-center p-2 z-0 bg-slate-100"
    >
      <div
        class="p-2 rounded-full bg-slate-200/60 text-slate-500 mb-1 group-hover:bg-emerald-500/10 group-hover:text-emerald-600 transition-colors"
      >
        <svg
          class="w-6 h-6"
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
      </div>
      <span
        class="text-[10px] text-slate-500 font-semibold line-clamp-2 leading-tight uppercase group-hover:text-emerald-700 transition-colors"
      >
        {{ title }}
      </span>
    </div>
  </div>
</template>
