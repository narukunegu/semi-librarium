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
        class="relative z-0 min-h-[calc(100svh-4rem)] flex flex-col justify-between pb-24"
      >
        <div
          class="absolute -z-10 top-0 bottom-28 left-0 w-full overflow-hidden"
        >
          <img
            alt="Hero Background"
            fetchpriority="high"
            decoding="async"
            class="object-cover object-[center_45%] w-full h-full transition-transform duration-700 ease-out"
            :src="heroBgSrc"
          />
          <div
            class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"
          ></div>
        </div>
        <div
          class="container mx-auto px-4 flex-1 flex flex-col items-center justify-center pt-16 pb-4 text-center"
        >
          <div class="w-full max-w-2xl animate-launch space-y-4">
            <div class="space-y-2">
              <span
                class="inline-block px-3 py-1 rounded-full text-sm font-semibold tracking-widest uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-1"
              >
                Đại Chủng Viện Thánh Giuse Sài Gòn
              </span>
              <h1
                class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md"
              >
                Kho Tàng Tri Thức
              </h1>
              <p
                class="text-base sm:text-l italic text-slate-200/90 max-w-xl mx-auto font-sans leading-relaxed"
              >
                Tra cứu hơn 70.000 cuốn sách, tài liệu và ấn bản chuyên khảo
                phục vụ học tập & nghiên cứu.
              </p>
            </div>

            <LibrarySearchBar
              variant="hero"
              v-model="query"
              @submit="onSearchSubmit"
            />

            <QuickSearchTags />
          </div>
        </div>

        <!-- Dewey -->
        <div class="container mx-auto px-2 relative z-20">
          <DeweyInfo
            :formatted-current-date="formattedCurrentDate"
            :is-open="isOpen"
            :closing-time-label="closingTimeLabel"
          />
        </div>
      </section>
      <!-- New Books -->
      <NewBooksSection />
      <!-- Library Use Cards Section (Đã cải tiến Nền Gradient & Texture - Tài Liệu & Hướng dẫn) -->
      <section class="relative py-20 lg:py-28 overflow-hidden">
        <div class="absolute inset-0 bg-white"></div>
        <div
          class="absolute top-0 left-0 right-0 h-[67%] bg-[#e4d4ce] shadow-[0_8px_25px_rgba(0,0,0,0.08)]"
        ></div>
        <div
          class="absolute inset-0 opacity-10 pointer-events-none z-[1]"
          style="
            background-image: url(&quot;https://biblioteca.biblico.it/images/bg-pattern-single.png&quot;);
            background-size: 180px;
          "
        ></div>
        <div class="relative z-10">
          <div class="container mx-auto px-4 mb-12">
            <div class="grid grid-cols-12 gap-4">
              <div
                class="col-span-12 lg:col-span-10 lg:col-start-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
              >
                <div class="prose">
                  <span
                    class="text-sm uppercase font-bold tracking-widest text-gray-600 mb-1 block"
                  >
                    Tài liệu
                  </span>
                  <h2 class="text-4xl font-bold tracking-tight text-gray-800">
                    Danh Mục & Hướng Dẫn
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <!-- 3 Card -->
          <div class="container mx-auto px-4">
            <div class="grid grid-cols-12 gap-6">
              <div class="col-span-12 lg:col-span-10 lg:col-start-2">
                <ul class="grid md:grid-cols-3 gap-6">
                  <!-- Card 1-->
                  <li
                    class="group relative flex flex-col overflow-hidden min-h-[320px] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 ease-out rounded-lg"
                  >
                    <img
                      alt="Tra cứu"
                      decoding="async"
                      class="absolute inset-0 w-full h-full object-cover opacity-25"
                      src="https://biblioteca.biblico.it/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome-library-use-img-1.03297210.jpg&w=3840&q=75"
                    />
                    <div class="absolute inset-0 bg-[#f5ebe0]/80"></div>

                    <div class="relative z-10 flex flex-col flex-1 p-8 lg:p-10">
                      <div class="flex-1">
                        <p
                          class="text-xs uppercase tracking-widest text-gray-500"
                        >
                          Hướng dẫn
                        </p>
                        <h3 class="text-3xl font-bold text-gray-900 mb-4">
                          Tra Cứu Sách
                        </h3>
                        <p class="text-sm font-medium text-gray-700 leading-relaxed italic">Sách được xếp theo hệ thập phân Dewey từ 001-999</p>
                        <p class="text-sm font-sans font-bold text-black/95 underline leading-relaxed"> Để xác định vị trí sách, độc giả có thể: </p>
                         <ul class="list-disc pl-1 space-y-0 text-sm mb-2 font-medium text-black/95 leading-relaxed"> 
                           <li> Xem bảng chỉ dẫn ở mỗi kệ</li>
                            <li> Tra cứu trên trang <strong class="text-[#7A1C1C]">WEBSITE </strong> của Thư Viện</li>
                         </ul>
                      <p class="text-sm font-sans font-medium text-black/95 leading-relaxed ">Nếu muốn mượn sách về, Xin quý độc giả ghi phiếu mượn sách và đặt vào đúng vị trí sách đã lấy ra.</p>
                      </div>
                      <div class="flex justify-end pt-8">
                        <NuxtLink
                          to="/articles"
                          class="inline-flex items-center justify-center text-sm font-medium bg-white text-gray-800 border border-gray-200 h-10 px-5 shadow-sm hover:bg-gray-50 transition-colors"
                        >
                          Chi tiết
                        </NuxtLink>
                      </div>
                    </div>
                  </li>

                  <!-- Card 2 -->
                  <li
                    class="group relative flex flex-col overflow-hidden min-h-[320px] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 ease-out rounded-lg"
                  >
                    <img
                      alt="Mượn trả"
                      decoding="async"
                      class="absolute inset-0 w-full h-full object-cover opacity-20"
                      src="https://biblioteca.biblico.it/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome-library-use-img-2.d7e2e367.jpg&w=3840&q=75"
                    />
                    <div class="absolute inset-0 bg-[#c1856f]/65"></div>

                    <div class="relative z-10 flex flex-col flex-1 p-8 lg:p-10">
                      <div class="flex-1">
                        <p
                          class="text-xs uppercase tracking-widest text-black/70"
                        >
                          Hướng dẫn
                        </p>
                        <h3 class="text-2xl font-bold text-black mb-2">
                          Cách Mượn & Trả Sách
                        </h3>
                    
                         <p class="text-l font-bold text-black/100 leading-relaxed ">Mượn Sách </p>
                         <ul class="list-disc pl-1 space-y-0 text-sm font-medium text-black/95 leading-relaxed"> 
                           <li> Độc giả muốn mượn sách về cần phải có thẻ do Thư Viện của Đại Chủng Viện cấp.</li>
                            <li> Mỗi lần mượn 5 cuốn, thời gian mượn 15 ngày. Đối với từ điển và các loại sách tra cứu quý hiếm, chỉ được tham khảo tại chỗ.</li>
                         </ul>
                         <p class="text-l font-bold text-black/100 leading-relaxed ">Trả Sách: </p>
                            <ul class="list-disc pl-1 space-y-0 text-sm font-medium text-black/95 leading-relaxed">
                             <li>Trả ít nhất 2 cuốn trước khi mượn lại.</li>
                             <li>Có thể gia hạn nếu chưa có độc giả khác mượn.</li>
                            </ul>
                      </div>
                      <div class="flex justify-end pt-8">
                        <NuxtLink
                          to="/articles"
                          class="inline-flex items-center justify-center text-sm font-medium bg-white text-[#c1856f] h-10 px-5 shadow-sm hover:bg-gray-50 transition-colors"
                        >
                          Chi tiết
                        </NuxtLink>
                      </div>
                    </div>
                  </li>

                  <!-- Card 3 -->
                  <li
                    class="group relative flex flex-col overflow-hidden min-h-[320px] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 ease-out rounded-lg"
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
                        <p
                          class="text-xs uppercase tracking-widest text-white/70 mb-0"
                        >
                          Hướng dẫn
                        </p>
                        <h3 class="text-2xl font-bold text-white/90 mb-4"> Sử Dụng Kệ Sách Cá Nhân</h3>
                       <ul class="list-disc pl-1 space-y-0 text-sm font-medium text-white/90 leading-relaxed"> 
                           <li> Chọn vào tên sách muốn mượn để chuyển đến trang chi tiết sách.</li>
                            <li>Nhấn “Lưu vào kệ sách” ở góc phải để thêm sách vào Kệ Sách Cá Nhân</li>
                         </ul>
                      <li class="space-y-0 text-sm font-medium text-white/90 leading-relaxed italic">Lưu ý: danh sách chỉ lưu trên trình duyệt máy cá nhân (sách đã lưu không tự động chuyển qua máy khác khi đổi máy)</li>
                      </div>
                      <div class="flex justify-end pt-8">
                        <NuxtLink
                          to="/bookshelf"
                          class="inline-flex items-center justify-center text-sm font-medium bg-white text-[#4a4458] h-10 px-5 shadow-sm hover:bg-gray-50 transition-colors"
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
      <!-- About & Overview Lib Section (Bổ sung image temple) -->
      <section class="relative py-12 lg:py-16 overflow-hidden bg-[#faf6f1]">
        <div class="relative z-10 container mx-auto px-4">
          <div
            class="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-stretch"
          >
            <div
              class="lg:col-span-2 relative rounded-xl overflow-hidden border border-[#faf6f1]"
            >
              <img
                :src="serSImg"
                alt="Đại Chủng Viện Thánh Giuse Sài Gòn"
                class="w-full h-full min-h-[320px] lg:min-h-[380px] object-cover"
                decoding="async"
              />
            </div>

            <div class="lg:col-span-3 flex flex-col justify-between gap-4">
              <div
                class="flex-1 p-6 md:p-8 rounded-xl
                       bg-white/25 backdrop-blur-[2px]
                       border border-white/30 shadow-sm"
              >
                <h2
                  class="text-3xl sm:text-4xl font-bold text-[#5c3d2e] mb-3 text-center lg:text-left"
                >
                  Đôi nét về Thư Viện
                </h2>
                <p
                  class="text-xl md:text-base text-gray-900 font-medium leading-relaxed mb-3"
                >
                  Thư viện Đại Chủng Viện Thánh Giuse Sài Gòn được thành lập từ
                  những năm đầu xây dựng Chủng viện. Nơi đây lưu giữ nguồn tri
                  thức Kitô giáo, Triết học và Thần học phong phú, phục vụ công
                  tác đào tạo và nghiên cứu chuyên sâu cho chủng sinh và các nhà
                  nghiên cứu.
                </p>
                <p
                  class="text-sm md:text-base text-gray-900 font-medium leading-relaxed mb-5"
                >
                  Hiện tại, thư viện lưu trữ hơn 70.000 cuốn sách bao gồm các bản
                  văn cổ, từ điển ngôn ngữ, cùng các tạp chí chuyên ngành quốc tế.
                </p>
                <div class="flex justify-end">
                  <NuxtLink
                    to="/about"
                    class="inline-flex items-center justify-center rounded-sm text-sm font-semibold
                           tracking-wide transition-all duration-200
                           bg-[#c1856f] text-white hover:bg-[#a86f5a]
                           h-10 px-5 shadow-sm active:scale-95"
                  >
                    Tìm hiểu thêm
                  </NuxtLink>
                </div>
              </div>

              <!-- Slogan DCV-->
              <p
                class="text-center lg:text-left text-base md:text-lg font-title-serif
                       italic text-[#5c463a] leading-snug px-1"
              >
                «Tôi sống, nhưng không còn phải là tôi, mà là Đức Kitô sống trong tôi»
                <span class="block text-sm text-center not-italic text-[#8b7355] mt-1">
                  — GL 2,20-
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <!-- Library Hours & Schedule Details have image library Section -->
      <section class="relative py-20 lg:py-28 overflow-hidden">
        <div class="grid grid-cols-12 gap-8 items-center">
          <!--  Left:Hours & Schedule -->
          <div class="col-span-12 lg:col-span-6">
            <div
              class="glass-surface bg-card border border-border rounded-lg shadow-lg p-8 md:p-10 relative overflow-hidden"
            >
              <div class="prose mb-6">
                <h2
                  class="font-title-serif text-4xl font-bold tracking-tight mb-4 border-b border-border/60 pb-3"
                >
                  Lịch Phục Vụ Chi Tiết
                </h2>
              </div>
              <div class="space-y-3 text-sm text-card-foreground/90">
                <div
                  class="flex justify-between py-2.5 border-b border-border/30"
                >
                  <span class="font-semibold sm:text-xl"
                    >Thứ Hai – Thứ Sáu</span
                  >
                  <span class="sm:text-xltext-yellow-900 font-medium">
                    8:00 AM - 11:00 AM | 2:00 PM - 4:30 PM
                  </span>
                </div>
                <div
                  class="flex justify-between py-2.5 border-b border-border/30"
                >
                  <span class="font-semibold sm:text-xl">Thứ Bảy</span>
                  <span class="sm:text-xltext-yellow-900 font-medium">
                    8:00 AM - 11:00 AM
                  </span>
                </div>
                <div class="flex justify-between py-2.5 text-muted-foreground">
                  <span class="font-semibold sm:text-xl"
                    >Chúa Nhật & Ngày Lễ Công Giáo</span
                  >
                  <span
                    class="font-semibold sm:text-lg text-yellow-700 text-destructive"
                  >
                    Tạm nghỉ
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: 2 image library) -->
          <div class="col-span-12 lg:col-span-6">
            <div class="flex items-end justify-center gap-4 lg:gap-5">
              <div
                class="w-40 h-56 sm:w-48 sm:h-64 lg:w-56 lg:h-72 rounded-tl-2xl overflow-hidden shadow-2xl border-2 border-white hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-out"
              >
                <img
                  :src="bgrImg"
                  alt="Góc thư viện Đại Chủng Viện"
                  class="w-full h-full object-cover"
                  decoding="async"
                />
              </div>
              <div
                class="w-40 h-56 sm:w-48 sm:h-64 lg:w-56 lg:h-72 rounded-tr-2xl overflow-hidden 
                shadow-2xl border-2 border-white hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-out"
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
import NewBooksSection from "~/components/NewBooksSection.vue";
import { useSearchHistory } from "~/composables/useSearchHistory";
import fallbackBg from "~/assets/images/temple.png";
import SiteFooter from "~/components/SiteFooter.vue";
import bgreek from "~/assets/images/greekpage.jpg";
import bgrImg from "~/assets/images/Bgr.jpg";
import booksImg from "~/assets/images/Books.jpg";
import serSImg from "~/assets/images/SerS.png";

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
