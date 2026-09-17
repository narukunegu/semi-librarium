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
      <!-- Hero & Catalogue Search Section (Chỉnh sửa phủ kín 1 màn hình viewport) -->
      <section
        class="relative z-0 min-h-screen flex flex-col justify-between pb-12"
      >
        <!-- Background Hero Image with Subtle Blur Overlay -->
        <div class="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden">
          <img
            alt="Hero Background"
            fetchpriority="high"
            decoding="async"
            class="object-cover w-full h-full transition-transform duration-700 ease-out hover:scale-100"
            :src="heroBgSrc"
          />
          <div
            class="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-background/90 backdrop-blur-[1px]"
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

            <form
              class="relative w-full glass-surface rounded-md p-1.5 shadow-2xl border border-white/25 transition-all duration-300 focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent text-left"
              method="GET"
              action="/search"
              @submit="onSearchSubmit"
            >
              <div class="relative flex items-center w-full">
                <input
                  class="w-full rounded-sm border-none bg-background/90 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 pr-14 h-12 font-sans transition-colors"
                  placeholder="Tra cứu tài liệu, tác giả, tác phẩm..."
                  name="q"
                  v-model="query"
                />
                <div class="absolute right-1 flex items-center pr-1">
                  <div
                    data-orientation="vertical"
                    role="none"
                    class="shrink-0 bg-border w-[1px] h-6 mr-2 hidden sm:block"
                  ></div>
                  <button
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-sm text-base font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground h-10 w-10 active:scale-95"
                    type="submit"
                    aria-label="Tìm kiếm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-search"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </form>

            <!-- Quick Suggestion Tags / Pills -->
            <QuickSearchTags />
          </div>
        </div>

        <!-- Hours & Location Bar  -->
        <div class="container mx-auto px-4 relative z-20">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 lg:col-span-10 lg:col-start-2">
              <div
                class="relative rounded-lg p-[1px] bg-gradient-to-r from-amber-200/40 via-white/30 to-amber-200/40 shadow-2xl"
              >
                <div
                  class="glass-surface bg-background/90 backdrop-blur-xl rounded-lg p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group"
                >
                  <!-- Soft Radial Glow background effect -->
                  <div
                    class="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"
                  ></div>
                  <div
                    class="absolute -left-10 -top-10 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none"
                  ></div>

                  <!-- Logo Brand -->
                  <div
                    class="py-2 px-4 flex-1 flex items-center justify-center relative z-10"
                  >
                    <img
                      alt="Biblicum Library"
                      fetchpriority="high"
                      width="450"
                      height="222"
                      decoding="async"
                      class="w-32 md:w-36 lg:w-44 h-auto drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                      src="~/assets/images/logo-lib.png"
                    />
                  </div>

                  <div
                    data-orientation="vertical"
                    role="none"
                    class="bg-border/80 w-[1px] h-14 self-center shrink-0 hidden md:block"
                  ></div>

                  <!-- Open Hours Info -->
                  <div
                    class="py-2 px-4 flex-1 flex items-center justify-center text-center relative z-10"
                  >
                    <div class="flex flex-col items-center">
                      <h3
                        class="font-serif font-bold text-foreground text-xl mb-1.5 tracking-tight"
                      >
                        {{ formattedCurrentDate }}
                      </h3>
                      <div
                        class="text-xs md:text-sm text-muted-foreground flex flex-wrap items-center justify-center gap-2"
                      >
                        <span
                          v-if="isOpen"
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                        >
                          <span
                            class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5"
                          ></span>
                          Mở cửa (đến {{ closingTimeLabel }})
                        </span>
                        <span
                          v-else
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/30"
                        >
                          <span
                            class="w-2 h-2 rounded-full bg-rose-500 mr-1.5"
                          ></span>
                          Đóng cửa
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    data-orientation="vertical"
                    role="none"
                    class="bg-border/80 w-[1px] h-14 self-center shrink-0 hidden sm:block"
                  ></div>

                  <!-- Location Info -->
                  <div
                    class="py-2 px-4 flex-1 flex items-center justify-center relative z-10"
                  >
                    <a
                      href="https://maps.app.goo.gl/eckfPwRR8yTvVJdM7"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="group/link flex items-center gap-3.5 text-center sm:text-left hover:text-accent-foreground transition-colors duration-200"
                    >
                      <div
                        class="p-3 rounded-full bg-primary/10 border border-primary/20 group-hover/link:bg-primary group-hover/link:text-primary-foreground text-primary transition-all duration-300 shadow-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-map-pin"
                        >
                          <path
                            d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
                          />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <address
                        class="not-italic text-sm leading-snug font-medium text-muted-foreground group-hover/link:text-foreground transition-colors underline-offset-4 group-hover/link:underline"
                      >
                        6 Tôn Đức Thắng, P. Bến Nghé, Q.1,<br />TP. Hồ Chí Minh
                      </address>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- About & Overview Section (Bổ sung Pattern Background) -->
      <section class="container mx-auto px-4 my-20 lg:my-28 relative">
        <div class="grid grid-cols-12 gap-6 items-center">
          <div class="col-span-12 lg:col-span-10 lg:col-start-2 relative">
            <!-- Pattern trang trí chìm phía sau -->
            <div
              class="absolute inset-0 -z-10 rounded-xl opacity-80 dark:opacity-80 pointer-events-none"
              style="
                background-image: url(&quot;https://biblioteca.biblico.it/images/bg-pattern-1.png&quot;);
                background-size: 280px;
              "
            ></div>

            <div
              class="p-8 md:p-12 rounded-lg bg-card/60 border border-border glass-surface shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div class="prose max-w-none text-foreground">
                <h2
                  class="font-serif text-3xl font-bold tracking-tight text-foreground mb-4 border-b border-border/60 pb-3"
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
                  văn cổ, từ điển ngôn ngữ, cùng các tạp chí chuyên ngành quốc
                  tế.
                </p>
                <div class="not-prose flex justify-end">
                  <NuxtLink
                    to="/about"
                    class="group relative inline-flex items-center justify-center rounded-sm text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground h-11 px-6 py-2 shadow-sm active:scale-95 overflow-hidden"
                  >
                    <span>Tìm hiểu thêm</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Library Use Cards Section (Đã cải tiến Nền Gradient & Texture) -->
      <section
        class="py-20 lg:py-28 bg-accent/10 border-y border-border/60 relative overflow-hidden"
      >
        <div
          class="absolute inset-0 opacity-15 pointer-events-none"
          style="
            background-image: url(&quot;https://biblioteca.biblico.it/images/bg-pattern-single.png&quot;);
            background-size: 180px;
          "
        ></div>

        <div class="container mx-auto px-4 mb-12 relative z-10">
          <div class="grid grid-cols-12 gap-4">
            <div
              class="col-span-12 lg:col-span-10 lg:col-start-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
            >
              <div class="prose">
                <span
                  class="text-xs uppercase font-bold tracking-widest text-primary mb-1 block"
                  >Tài liệu & Hướng dẫn</span
                >
                <h2
                  class="font-serif text-3xl font-bold tracking-tight text-foreground"
                >
                  Danh Mục & Hướng Dẫn Thư Viện
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div class="container mx-auto px-4 relative z-10">
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 lg:col-span-10 lg:col-start-2">
              <ul class="grid md:grid-cols-3 gap-6">
                <!-- Card 1 -->
                <li
                  class="group flex flex-col rounded-xl border border-border/80 hover:border-emerald-500/50 bg-card/90 backdrop-blur-md text-card-foreground p-6 lg:p-8 relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div
                    class="absolute -z-10 inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-300"
                  >
                    <img
                      alt="Tra cứu"
                      decoding="async"
                      class="object-cover w-full h-full"
                      src="https://biblioteca.biblico.it/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome-library-use-img-1.03297210.jpg&amp;w=3840&amp;q=75"
                    />
                  </div>
                  <div class="flex-1 mb-6 prose text-card-foreground">
                    <h3
                      class="font-serif text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors"
                    >
                      Cách Tra Cứu Sách
                    </h3>
                    <p class="text-sm text-muted-foreground leading-relaxed">
                      Sử dụng hệ thống tra cứu trực tuyến (OPAC) để nhanh chóng
                      tìm kiếm theo tên tác phẩm, tác giả, chủ đề hoặc mã phân
                      loại Dewey/SBC.
                    </p>
                  </div>
                </li>

                <!-- Card 2 -->
                <li
                  class="group flex flex-col rounded-xl border border-border/80 hover:border-emerald-500/50 bg-card/90 backdrop-blur-md text-card-foreground p-6 lg:p-8 relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div
                    class="absolute -z-10 inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-300"
                  >
                    <img
                      alt="Mượn trả"
                      decoding="async"
                      class="object-cover w-full h-full"
                      src="https://biblioteca.biblico.it/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome-library-use-img-2.d7e2e367.jpg&amp;w=3840&amp;q=75"
                    />
                  </div>
                  <div class="flex-1 mb-6 prose text-card-foreground">
                    <h3
                      class="font-serif text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors"
                    >
                      Cách Mượn & Trả Sách
                    </h3>
                    <p class="text-sm text-muted-foreground leading-relaxed">
                      Độc giả xuất trình thẻ thư viện tại bàn thủ thư. Quy định
                      gia hạn và giới hạn số lượng tài liệu được cập nhật công
                      khai tại quầy phục vụ.
                    </p>
                  </div>
                </li>

                <!-- Card 3 -->
                <li
                  class="group flex flex-col rounded-xl border border-border/80 hover:border-emerald-500/50 bg-card/90 backdrop-blur-md text-card-foreground p-6 lg:p-8 relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div
                    class="absolute -z-10 inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-300"
                  >
                    <img
                      alt="Nguồn tài liệu"
                      decoding="async"
                      class="object-cover w-full h-full"
                      src="https://biblioteca.biblico.it/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome-library-use-img-3.bfd27969.jpg&amp;w=3840&amp;q=75"
                    />
                  </div>
                  <div class="flex-1 mb-6 prose text-card-foreground">
                    <h3
                      class="font-serif text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors"
                    >
                      Truy Cập Tài Liệu Soạn Thảo
                    </h3>
                    <p class="text-sm text-muted-foreground leading-relaxed">
                      Hướng dẫn đăng ký tài khoản tra cứu cơ sở dữ liệu số, tiếp
                      cận tài liệu số hóa và các phòng đọc chuyên đề tại thư
                      viện.
                    </p>
                  </div>
                  <div class="flex justify-end pt-2">
                    <NuxtLink
                      to="/articles"
                      class="inline-flex items-center justify-center rounded-sm text-xs font-semibold tracking-wider uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground h-9 px-4 shadow-sm"
                    >
                      Chi tiết
                    </NuxtLink>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Library Hours & Schedule Details Section -->
      <section class="my-20 lg:my-28 container mx-auto px-4">
        <div class="grid grid-cols-12 gap-8 items-center">
          <div class="col-span-12 lg:col-span-6">
            <div
              class="glass-surface bg-card border border-border rounded-lg shadow-lg p-8 md:p-10 relative overflow-hidden"
            >
              <div class="prose mb-6">
                <h2
                  class="font-serif text-2xl font-bold text-card-foreground tracking-tight border-b border-border/40 pb-3"
                >
                  Lịch Phục Vụ Chi Tiết
                </h2>
              </div>
              <div class="space-y-3 text-sm text-card-foreground/90">
                <div
                  class="flex justify-between py-2.5 border-b border-border/30"
                >
                  <span class="font-semibold">Thứ Hai – Thứ Sáu</span>
                  <span class="font-mono font-medium"
                    >8:00 AM - 11:00 AM | 2:00 PM - 4:00 PM</span
                  >
                </div>
                <div
                  class="flex justify-between py-2.5 border-b border-border/30"
                >
                  <span class="font-semibold">Thứ Bảy</span>
                  <span class="font-mono font-medium">8:00 AM - 11:30 AM</span>
                </div>
                <div class="flex justify-between py-2.5 text-muted-foreground">
                  <span class="font-semibold"
                    >Chúa Nhật & Ngày Lễ Công Giáo</span
                  >
                  <span class="font-semibold text-destructive">Nghỉ</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Decorative Brand Crest Section -->
          <div
            class="col-span-12 lg:col-span-6 flex justify-center items-center relative min-h-[260px]"
          >
            <div
              class="w-full max-w-sm opacity-50 hover:opacity-80 transition-opacity duration-500"
            >
              <img
                alt="Saigon Seminary Crest"
                width="800"
                height="800"
                decoding="async"
                class="w-full h-auto mx-auto"
                src="~/assets/images/logo-DCV.png"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import SiteHeader from "~/components/SiteHeader.vue";
import QuickSearchTags from "~/components/QuickSearchTags.vue";
import { useSearchHistory } from "~/composables/useSearchHistory";
import fallbackBg from "~/assets/images/background.png";

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
    return "16:00";
  }
  if (day === 6) {
    return "11:30";
  }
  return "";
});
</script>
