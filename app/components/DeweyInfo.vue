<script setup lang="ts">
defineProps<{
  formattedCurrentDate: string
  isOpen: boolean
  closingTimeLabel: string
}>()
</script>

<template>
  <!--  DeweyInfo-->
  <div
 class="absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-1/2
         w-[92%] max-w-6xl bg-white/95 z-30 px-4 py-4 shadow-xl transition-shadow duration-100 ease-out
         hover:bg-white hover:shadow-xlhover:border-emerald-500/50 border border-gray-100 rounded-lg"
  >
    <div class="flex flex-col sm:flex-row items-stretch">

      <!-- Dewey 000-499-->
      <div class="flex-1 px-4 py-2 text-left">
        <h2 class="text-lg sm:text-xl font-bold text-yellow-700 mb-2">
          PHÂN LOẠI THEO DEWEY
        </h2>
        <ul class="text-base font-semibold sm:text-sm space-y-0.5 text-gray-700">
          <li>000-099: Tác phẩm tổng quát</li>
          <li>100-199: Triết học & tâm lý</li>
          <li>200-299: Tôn giáo</li>
          <li>300-399: Khoa học xã hội</li>
          <li>400-499: Ngôn ngữ</li>
        </ul>
      </div>

      <div class="hidden sm:block w-px bg-yellow-500 self-stretch mx-2"></div>

      <!-- Hours & Schedule: ON/OFF -->
      <div class="flex-1 px-4 py-2 flex flex-col items-center justify-center text-center">
        <!-- today) -->
        <p class="text-sm sm:text-base font-semibold text-blue-900 mb-2">
          {{ formattedCurrentDate }}
        </p>

        <!-- show hour ON/OFF -->
        <div>
          <span
            v-if="isOpen"
            class="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-bold 
                   bg-emerald-500/15 text-emerald-700 border border-emerald-500/30"
          >
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5"></span>
            Đang mở cửa (đến {{ closingTimeLabel }})
          </span>

          <span
            v-else
            class="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-bold 
                   bg-rose-500/15 text-rose-700 border border-rose-500/30"
          >
            <span class="w-2 h-2 rounded-full bg-rose-500 mr-1.5"></span>
            Đóng cửa
          </span>
        </div>
      </div>

      <div class="hidden sm:block w-px bg-yellow-500 self-stretch mx-2"></div>

      <!--  Dewey 500-999-->
      <div class="flex-1 px-4 py-2 text-left">
        <h2 class="text-lg sm:text-xl font-bold text-yellow-700 mb-2">
          PHÂN LOẠI THEO DEWEY
        </h2>
        <ul class="text-base font-semibold sm:text-sm space-y-0.5 text-gray-700">
          <li>500-599: Khoa học tự nhiên</li>
          <li>600-699: Kỹ thuật</li>
          <li>700-799: Nghệ thuật</li>
          <li>800-899: Văn học</li>
          <li>900-999: Lịch sử & địa lý</li>
        </ul>
      </div>
    </div>
  </div>
</template>