<template>
  <div
    class="relative flex-1 bg-background text-foreground font-sans transition-colors duration-200 flex flex-col min-h-screen"
  >
    <SiteHeader />

    <main
      data-clonetohtml-wf-revealed="true"
      style="opacity: 1; visibility: visible"
      class="flex-1"
    >
      <!-- Hero & Catalogue Search Section (Chỉnh sửa phủ kín 1 màn hình viewport, background) -->
      <section
        class="relative z-0 min-h-screen flex flex-col justify-between pb-12" 
      >
        <!-- Background Hero Image with Subtle Blur Overlay -->
        <div class="absolute -z-10 top-0 bottom-10 left-0 w-full h-full overflow-hidden">
          <img
            alt="Hero Background"
            fetchpriority="high"
            decoding="async"
            class="object-cover w-full h-full transition-transform duration-700 ease-out hover:scale-100"
            :src="heroBgSrc"
          />
          <div
            class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"
          ></div>
        </div>

        <div
          class="container mx-auto px-4 flex-1 flex flex-col items-center justify-center pt-24 pb-12 text-center"
        >
          <div class="w-full max-w-2xl animate-launch space-y-6">
            <div class="space-y-2">
              <span
                class="inline-block px-3 py-1 rounded-full text-sm font-semibold tracking-widest uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-2"
              >
                Đại Chủng Viện Thánh Giuse Sài Gòn
              </span>
              <h1
                class="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md"
              >
                Kho Tàng Tri Thức
              </h1>
              <p
                class="text-base sm:text-lg text-slate-200/90 max-w-xl mx-auto font-sans leading-relaxed"
              >
                Tra cứu hơn 70.000 đầu sách, tài liệu và ấn bản chuyên khảo phục
                vụ học tập & nghiên cứu.
              </p>
            </div>

            <LibrarySearchBar
              variant="hero"
              v-model="query"
              @submit="onSearchSubmit"
            />

            <!-- Quick Suggestion Tags / Pills -->
            <QuickSearchTags />
          </div>
        </div>

        <!-- Hours & Location Bar  -->
        <!-- ====================== DEWEY INFO + GIỜ MỞ CỬA ĐỘNG ====================== -->
<!-- 
  Thay thế hoàn toàn khung glassmorphism (logo + giờ + địa chỉ) 
  bằng khung DeweyInfo của bạn, nhưng giữ lại logic mở/đóng cửa ở giữa.
-->
<div class="container mx-auto px-2 relative z-20">
  <DeweyInfo
    :formatted-current-date="formattedCurrentDate"
    :is-open="isOpen"
    :closing-time-label="closingTimeLabel"
  />
</div>
      </section>
      <!-- newbook or book spotlights -->
<section class="my-20 lg:my-28 container mx-auto px-4">
        <div class="grid grid-cols-12 gap-8 items-center">
          <div class="col-span-12 lg:col-span-6">
            <div
              class="glass-surface bg-card border border-border rounded-lg shadow-lg p-8 md:p-10 relative overflow-hidden"
            >
              <div >
                <h2
                  class="font-serif text-2xl font-bold text-card-foreground tracking-tight border-b border-border/40 pb-3"
                >
                  SECTION ABOUT Book Spotlights OR NEWBOOK...
                </h2>
              </div>
              
            </div>
          </div>
        </div>
</section>
      <!-- Library Use Cards Section (Đã cải tiến Nền Gradient & Texture - Tài Liệu & Hướng dẫn) -->
<section class="relative py-20 lg:py-28 overflow-hidden" >
  <div class="absolute inset-0 bg-white" > </div>
      <div 
       class="absolute top-0 left-0 right-0 h-[67%] bg-[#e4d4ce] shadow-[0_8px_25px_rgba(0,0,0,0.08)]"
       ></div>
  <!-- Pattern nhẹ -->
         <div
           class="absolute inset-0 opacity-10 pointer-events-none z-[1]"
           style="
             background-image: url('https://biblioteca.biblico.it/images/bg-pattern-single.png');
             background-size: 180px;"
           ></div>
  <div class="relative z-10">
          <!-- Tiêu đề -->
          <div class="container mx-auto px-4 mb-12">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12 lg:col-span-10 lg:col-start-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div class="prose">
                  <span class="text-xs uppercase font-bold tracking-widest text-gray-600 mb-1 block">
                    Tài liệu 
                  </span>
                  <h2 class="font-serif text-3xl font-bold tracking-tight text-gray-800">
                    Danh Mục & Hướng Dẫn
                  </h2>
                </div>
              </div>
            </div>
          </div>

    <!-- 3 Card -->
<!-- 3 Card: màu chủ đạo + ảnh mờ phía sau + hover nhẹ -->
<div class="container mx-auto px-4">
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 lg:col-span-10 lg:col-start-2">
      <ul class="grid md:grid-cols-3 gap-6">

        <!-- Card 1: Cách Tra Cứu Sách - trắng kem chủ đạo -->
        <li
          class="group relative flex flex-col overflow-hidden min-h-[320px]
                 shadow-md hover:shadow-2xl hover:-translate-y-1.5
                 transition-all duration-300 ease-out rounded-lg"
        >
          <!-- Ảnh nền mờ phía sau -->
          <img
            alt="Tra cứu"
            decoding="async"
            class="absolute inset-0 w-full h-full object-cover opacity-25"
            src="https://biblioteca.biblico.it/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome-library-use-img-1.03297210.jpg&w=3840&q=75"
          />
          <!-- Nền màu chủ đạo -->
          <div class="absolute inset-0 bg-[#f5ebe0]/80"></div>

          <!-- Nội dung -->
          <div class="relative z-10 flex flex-col flex-1 p-8 lg:p-10">
            <div class="flex-1">
              <p class="text-xs uppercase tracking-widest text-gray-500 mb-2">Hướng dẫn</p>
              <h3 class="font-serif text-2xl font-bold text-gray-900 mb-4">
                Cách Tra Cứu Sách
              </h3>
              <p class="text-sm font-medium text-gray-700 leading-relaxed">
                Sử dụng hệ thống tra cứu trực tuyến (OPAC) để nhanh chóng
                tìm kiếm theo tên tác phẩm, tác giả, chủ đề hoặc mã phân
                loại Dewey/SBC.
              </p>
            </div>
            <div class="flex justify-end pt-8">
              <NuxtLink
                to="/articles"
                class="inline-flex items-center justify-center text-sm font-medium
                       bg-white text-gray-800 border border-gray-200
                       h-10 px-5 shadow-sm hover:bg-gray-50 transition-colors"
              >
                Chi tiết
              </NuxtLink>
            </div>
          </div>
        </li>

        <!-- Card 2: Cách Mượn & Trả Sách - cam #c1856f chủ đạo -->
        <li
          class="group relative flex flex-col overflow-hidden min-h-[320px]
                 shadow-md hover:shadow-2xl hover:-translate-y-1.5
                 transition-all duration-300 ease-out rounded-lg"
        >
          <img
            alt="Mượn trả"
            decoding="async"
            class="absolute inset-0 w-full h-full object-cover opacity-20"
            src="https://biblioteca.biblico.it/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome-library-use-img-2.d7e2e367.jpg&w=3840&q=75"
          />
          <div class="absolute inset-0 bg-[#c1856f]/70"></div>

          <div class="relative z-10 flex flex-col flex-1 p-8 lg:p-10">
            <div class="flex-1">
              <p class="text-xs uppercase tracking-widest text-white/70 mb-2">Hướng dẫn</p>
              <h3 class="font-serif text-2xl font-bold text-white mb-4">
                Cách Mượn & Trả Sách
              </h3>
              <p class="text-sm font-medium text-black/95 leading-relaxed">
                Độc giả xuất trình thẻ thư viện tại bàn thủ thư. Quy định
                gia hạn và giới hạn số lượng tài liệu được cập nhật công
                khai tại quầy phục vụ.
              </p>
            </div>
            <div class="flex justify-end pt-8">
              <NuxtLink
                to="/articles"
                class="inline-flex items-center justify-center text-sm font-medium
                       bg-white text-[#c1856f]
                       h-10 px-5 shadow-sm hover:bg-gray-50 transition-colors"
              >
                Chi tiết
              </NuxtLink>
            </div>
          </div>
        </li>

        <!-- Card 3: Truy Cập Tài Liệu Soạn Thảo - tím xám đậm chủ đạo -->
        <li
          class="group relative flex flex-col overflow-hidden min-h-[320px]
                 shadow-md hover:shadow-2xl hover:-translate-y-1.5
                 transition-all duration-300 ease-out rounded-lg"
        >
          <img
            alt="Nguồn tài liệu"
            decoding="async"
            class="absolute inset-0 w-full h-full object-cover opacity-20"
            src="https://biblioteca.biblico.it/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome-library-use-img-3.bfd27969.jpg&w=3840&q=75"
          />
          <div class="absolute inset-0 bg-[#4a4458]/80"></div>

          <div class="relative z-10 flex flex-col flex-1 p-8 lg:p-10">
            <div class="flex-1">
              <p class="text-xs uppercase tracking-widest text-white/70 mb-2">Hướng dẫn</p>
              <h3 class="font-serif text-xl font-bold text-white mb-4">
                Truy Cập Tài Liệu Soạn Thảo
              </h3>
              <p class="text-sm font-medium text-white/95 leading-relaxed">
                Hướng dẫn đăng ký tài khoản tra cứu cơ sở dữ liệu số, tiếp
                cận tài liệu số hóa và các phòng đọc chuyên đề tại thư
                viện.
              </p>
            </div>
            <div class="flex justify-end pt-8">
              <NuxtLink
                to="/articles"
                class="inline-flex items-center justify-center text-sm font-medium
                       bg-white text-[#4a4458]
                       h-10 px-5 shadow-sm hover:bg-gray-50 transition-colors"
              >
                Chi tiết
              </NuxtLink>
            </div>
          </div>
        </li>

      </ul>
    </div>
  </div>
</div>
  </div>
</section>
      <!-- About & Overview Section (Bổ sung Pattern Background) -->
   <!-- ====================== ĐÔI NÉT VỀ THƯ VIỆN ====================== -->
<section
  class="relative py-20 lg:py-28 overflow-hidden"
  :style="{
    backgroundImage: `url(${bgreek})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }"
>
  <!-- Lớp phủ trắng nhẹ cho chữ dễ đọc -->
  <div class="absolute inset-0 bg-white/70"></div>

  <div class="container mx-auto px-4 relative z-10">
    <div class="grid grid-cols-12 gap-6 items-center">
      <div class="col-span-12 lg:col-span-10 lg:col-start-2">
        <div
          class="p-8 md:p-12 rounded-lg bg-white/90 border border-border shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div class="prose max-w-none text-foreground">
            <h2
              class="font-title-serif text-center text-[#03080c] text-3xl font-bold tracking-tight text-foreground mb-4 border-b border-border/60 pb-3"
            >
              Đôi Nét Về Thư Viện
            </h2>
            <p class="text-base text-muted-foreground leading-relaxed mb-4">
              Thư viện Đại Chủng Viện Thánh Giuse Sài Gòn được thành lập từ
              những năm đầu xây dựng Chủng viện. Nơi đây lưu giữ nguồn tri
              thức Kitô giáo, Triết học và Thần học phong phú, phục vụ công
              tác đào tạo và nghiên cứu chuyên sâu cho chủng sinh và các nhà
              nghiên cứu.
            </p>
            <p class="text-base text-muted-foreground leading-relaxed mb-6">
              Hiện tại, thư viện lưu trữ hơn 70.000 đầu sách bao gồm các bản
              văn cổ, từ điển ngôn ngữ, cùng các tạp chí chuyên ngành quốc tế.
            </p>
            <div class="not-prose flex justify-end">
              <NuxtLink
                to="/about"
                class="inline-flex items-center justify-center rounded-sm text-sm font-semibold tracking-wide
                       transition-all duration-200 bg-[#c1856f] text-white hover:bg-[#a86f5a]
                       h-11 px-6 py-2 shadow-sm active:scale-95"
              >
                Tìm hiểu thêm
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
            <!-- Library Hours & Schedule Details Section -->
 <!-- ====================== LỊCH PHỤC VỤ + 2 ẢNH ====================== -->
<section class="relative py-20 lg:py-28 overflow-hidden">
  
  <div class="grid grid-cols-12 gap-8 items-center">

    <!-- Cột trái: bảng lịch (giữ nội dung sếp) -->
    <div class="col-span-12 lg:col-span-6">
      <div
        class="glass-surface bg-card border border-border rounded-lg shadow-lg p-8 md:p-10 relative overflow-hidden"
      >
        <div class="prose mb-6">
          <h2
            class="font-title-serif text-3xl font-bold tracking-tight mb-4 border-b border-border/60 pb-3"
          >
            Lịch Phục Vụ Chi Tiết
          </h2>
        </div>
        <div class="space-y-3 text-sm text-card-foreground/90">
          <div class="flex justify-between py-2.5 border-b border-border/30">
            <span class="font-semibold">Thứ Hai – Thứ Sáu</span>
            <span class="font-mono text-yellow-900 font-medium">
              8:00 AM - 11:00 AM | 2:00 PM - 4:30 PM
            </span>
          </div>
          <div class="flex justify-between py-2.5 border-b border-border/30">
            <span class="font-semibold">Thứ Bảy</span>
            <span class="font-mono text-yellow-900 font-medium">
              8:00 AM - 11:30 AM
            </span>
          </div>
          <div class="flex justify-between py-2.5 text-muted-foreground">
            <span class="font-semibold">Chúa Nhật & Ngày Lễ Công Giáo</span>
            <span class="font-semibold text-yellow-700 text-destructive">
              Tạm nghỉ
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Cột phải: 2 ảnh nằm cạnh nhau (giống code cũ của bạn) -->
    <div class="col-span-12 lg:col-span-6">
      <div class="flex items-end justify-center gap-4 lg:gap-5">
        <!-- Ảnh Bgr.jpg -->
        <div
          class="w-40 h-56 sm:w-48 sm:h-64 lg:w-56 lg:h-72 rounded-tl-2xl overflow-hidden
                 shadow-2xl border-2 border-white
                 hover:-translate-y-2 hover:shadow-2xl
                 transition-all duration-300 ease-out"
        >
          <img
            :src="bgrImg"
            alt="Góc thư viện Đại Chủng Viện"
            class="w-full h-full object-cover"
            decoding="async"
          />
        </div>
        <!-- Ảnh Books.jpg -->
        <div
          class="w-40 h-56 sm:w-48 sm:h-64 lg:w-56 lg:h-72 rounded-tr-2xl overflow-hidden
                 shadow-2xl border-2 border-white
                 hover:-translate-y-2 hover:shadow-2xl
                 transition-all duration-300 ease-out"
        >
          <img
            :src="booksImg"
            alt="Góc đọc sách"
            class="w-full h-full object-cover"
            decoding="async"
          />
        </div>
      </div>
    </div>
  </div> 
</section>
    </main>
  </div>
   <SiteFooter />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import SiteHeader from "~/components/SiteHeader.vue";
import QuickSearchTags from "~/components/QuickSearchTags.vue";
import LibrarySearchBar from "~/components/LibrarySearchBar.vue";
import { useSearchHistory } from "~/composables/useSearchHistory";
import fallbackBg from "~/assets/images/temple.png";
import SiteFooter from "~/components/SiteFooter.vue";
import bgreek from '~/assets/images/greekpage.jpg';
import bgrImg from '~/assets/images/Bgr.jpg';
import booksImg from '~/assets/images/Books.jpg';

useHead({
  title: "Trang Chủ | Thư Viện Đại Chủng Viện Thánh Giuse Sài Gòn",
});

const heroBgSrc = ref(fallbackBg);

const query = ref("");
const { addSearch } = useSearchHistory();

const onSearchSubmit = () => {
  if (query.value.trim()) {
    addSearch(query.value);
  }
};

const now = ref(new Date());
let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date();
  }, 1000);

  // Try loading remote image in the background with a timeout
  const remoteImgUrl = "//data.dcvgiusesaigon.vn/api/background/background.jpg";
  const img = new Image();
  let isDone = false;

  const timeoutId = setTimeout(() => {
    if (!isDone) {
      isDone = true;
      img.src = ""; // cancel loading
    }
  }, 4000); // 4 seconds timeout

  img.onload = () => {
    if (!isDone) {
      isDone = true;
      clearTimeout(timeoutId);
      heroBgSrc.value = remoteImgUrl;
    }
  };

  img.onerror = () => {
    if (!isDone) {
      isDone = true;
      clearTimeout(timeoutId);
    }
  };

  img.src = remoteImgUrl;
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const formattedCurrentDate = computed(() => {
  return now.value.toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const isOpen = computed(() => {
  const date = now.value;
  const day = date.getDay(); // 0: Chúa Nhật, 1: Thứ Hai, ..., 6: Thứ Bảy
  const currentMinutes = date.getHours() * 60 + date.getMinutes();

  // Chúa Nhật
  if (day === 0) {
    return false;
  }

  // Thứ Hai - Thứ Sáu (8:00 AM - 11:00 AM | 2:00 PM - 4:00 PM)
  if (day >= 1 && day <= 5) {
    const morningOpen = 8 * 60; // 08:00
    const morningClose = 11 * 60; // 11:00
    const afternoonOpen = 14 * 60; // 14:00
    const afternoonClose = 16 * 60; // 16:00

    const isMorning =
      currentMinutes >= morningOpen && currentMinutes < morningClose;
    const isAfternoon =
      currentMinutes >= afternoonOpen && currentMinutes < afternoonClose;

    return isMorning || isAfternoon;
  }

  // Thứ Bảy (8:00 AM - 11:30 AM)
  if (day === 6) {
    const saturdayOpen = 8 * 60; // 08:00
    const saturdayClose = 11 * 60 + 30; // 11:30

    return currentMinutes >= saturdayOpen && currentMinutes < saturdayClose;
  }

  return false;
});

const closingTimeLabel = computed(() => {
  const date = now.value;
  const day = date.getDay();
  const currentMinutes = date.getHours() * 60 + date.getMinutes();

  if (day >= 1 && day <= 5) {
    if (currentMinutes < 11 * 60) {
      return "11:00";
    }
    return "16:30";
  }
  if (day === 6) {
    return "11:30";
  }
  return "";
});
</script>
