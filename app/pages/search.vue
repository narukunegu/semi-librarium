<script setup lang="ts">
import sampleData from "~/assets/data/sample.json";

interface BookItem {
  "Chu de Tong quat": string;
  "So Chu de": string;
  "So Tac gia": string;
  "So Tai san": string;
  Tua: string;
  "Ten Tac gia": string;
  "Ho Tac gia": string;
  "Noi Xb": string;
  "Nha Xb": string;
  "Nam Xb": string;
  "So trang": string;
  "Ngon ngu": string;
  "Tinh trang": string;
}

interface ResultEntry {
  item: BookItem;
  refIndex: number;
}

interface RawData {
  results: Array<ResultEntry>;
}

const route = useRoute();
const searchQuery = ref("");
const selectedLanguage = ref("all");
const currentPage = ref(1);
const itemsPerPage = ref(5);

// Giả lập API Server Fetch Data (Lazy loading với useAsyncData)
const { data: rawResults, pending } = await useAsyncData<ResultEntry[]>(
  "books-search",
  async () => {
    // Giả lập network latency 600ms như server thật
    searchQuery.value = route.query.q as string;
    const response: RawData = await $fetch(
      "https://semi-library.free.beeceptor.com/books?q=" + searchQuery.value,
    );
    return response.results as ResultEntry[];
  },
  { lazy: true, server: false },
);

// Trả về danh sách đã lọc theo từ khóa & ngôn ngữ
const filteredResults = computed(() => {
  if (!rawResults.value) return [];

  return rawResults.value.filter(({ item }) => {
    return (
      selectedLanguage.value === "all" ||
      item["Ngon ngu"] === selectedLanguage.value
    );
  });
});

// Tính toán phân trang
const totalPages = computed(
  () => Math.ceil(filteredResults.value.length / itemsPerPage.value) || 1,
);

const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredResults.value.slice(start, start + itemsPerPage.value);
});

// Reset về trang 1 khi đổi từ khóa hoặc bộ lọc
watch([searchQuery, selectedLanguage, itemsPerPage], () => {
  currentPage.value = 1;
});

// Thống kê số lượng sách có thể mượn (Tinh trang === "0")
const availableCount = computed(() => {
  return filteredResults.value.filter((r) => r.item["Tinh trang"] === "0")
    .length;
});
</script>

<template>
  <div
    class="min-h-screen bg-[#fafafa] font-sans text-gray-800 flex flex-col text-base"
  >
    <!-- Header -->
    <SiteHeader />

    <!-- Search Bar Banner -->
    <section class="bg-[#40596c] py-8 px-4 shadow-inner">
      <div class="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3">
        <div class="relative flex-grow">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm sách, tác giả, chủ đề..."
            class="w-full h-12 px-4 pr-10 text-lg rounded border-none shadow focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-base font-bold"
          >
            ✕
          </button>
        </div>
        <NuxtLink
          class="h-12 px-8 bg-[#3ea03e] hover:bg-emerald-600 text-white font-semibold text-base rounded shadow transition-colors flex items-center justify-center uppercase tracking-wider"
          :to="'/search?q=' + searchQuery"
        >
          Tìm kiếm
        </NuxtLink>
      </div>
    </section>

    <!-- Content Layout -->
    <main
      class="max-w-7xl mx-auto w-full px-4 py-8 flex-grow flex flex-col lg:flex-row gap-8"
    >
      <!-- Facet Sidebar -->
      <aside class="w-full lg:w-72 flex-shrink-0 space-y-6">
        <div class="bg-white p-5 rounded-lg shadow-sm border border-[#e4e4e4]">
          <h3
            class="font-bold text-base text-[#40596c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e4e4e4]"
          >
            Lọc kết quả
          </h3>
          <ul class="space-y-3 text-base text-gray-700">
            <li
              @click="selectedLanguage = 'all'"
              :class="{
                'font-semibold text-[#40596c]': selectedLanguage === 'all',
              }"
              class="flex justify-between items-center cursor-pointer hover:text-[#40596c]"
            >
              <span>Tất cả ngôn ngữ</span>
              <span
                class="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600"
              >
                {{ rawResults?.length || 0 }}
              </span>
            </li>
            <li
              @click="selectedLanguage = 'P'"
              :class="{
                'font-semibold text-[#40596c]': selectedLanguage === 'P',
              }"
              class="flex justify-between items-center cursor-pointer hover:text-[#40596c]"
            >
              <span>Tiếng Pháp (P)</span>
              <span
                class="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600"
              >
                {{
                  rawResults?.filter((r) => r.item["Ngon ngu"] === "P")
                    .length || 0
                }}
              </span>
            </li>
            <li
              @click="selectedLanguage = 'V'"
              :class="{
                'font-semibold text-[#40596c]': selectedLanguage === 'V',
              }"
              class="flex justify-between items-center cursor-pointer hover:text-[#40596c]"
            >
              <span>Tiếng Việt (V)</span>
              <span
                class="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600"
              >
                {{
                  rawResults?.filter((r) => r.item["Ngon ngu"] === "V")
                    .length || 0
                }}
              </span>
            </li>
          </ul>

          <div class="mt-6 pt-4 border-t border-[#e4e4e4]">
            <p class="text-sm text-gray-500">
              Sách có sẵn:
              <strong class="text-emerald-700">{{ availableCount }}</strong>
            </p>
          </div>
        </div>
      </aside>

      <!-- Main Results Column -->
      <section class="flex-grow space-y-5">
        <!-- Results Counter & Controls Bar -->
        <div
          class="bg-white px-5 py-3.5 rounded-lg shadow-sm border border-[#e4e4e4] flex flex-wrap items-center justify-between gap-4 text-base"
        >
          <span class="text-gray-600">
            Hiển thị
            <strong class="text-black">{{ filteredResults.length }}</strong> kết
            quả
          </span>

          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <label
                for="perPage"
                class="text-xs text-gray-500 uppercase font-bold"
                >Hiển thị:</label
              >
              <select
                id="perPage"
                v-model="itemsPerPage"
                class="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none"
              >
                <option :value="5">5 / trang</option>
                <option :value="10">10 / trang</option>
                <option :value="20">20 / trang</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Skeleton Loading State -->
        <div v-if="pending" class="space-y-4">
          <div
            v-for="n in 3"
            :key="n"
            class="bg-white p-5 rounded-lg border border-gray-200 animate-pulse flex gap-4"
          >
            <div class="w-24 h-32 bg-gray-200 rounded flex-shrink-0"></div>
            <div class="flex-grow space-y-3">
              <div class="h-6 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
              <div class="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="paginatedResults.length === 0"
          class="bg-white p-12 text-center rounded-xl border border-dashed border-slate-300 shadow-sm flex flex-col items-center justify-center space-y-3"
        >
          <div
            class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-1"
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
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p class="text-lg font-semibold text-slate-700">
            Không tìm thấy kết quả phù hợp.
          </p>
          <p class="text-sm text-slate-500 max-w-sm">
            Hãy thử thay đổi từ khóa tìm kiếm hoặc chọn bộ lọc ngôn ngữ khác.
          </p>
        </div>

        <!-- Book Results List -->
        <div v-else class="space-y-4">
          <article
            v-for="(res, idx) in paginatedResults"
            :key="res.item['So Tai san'] || idx"
            class="group bg-white p-5 rounded-xl shadow-sm border border-[#e4e4e4] hover:border-emerald-500/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col md:flex-row gap-5 justify-between relative overflow-hidden"
          >
            <!-- Decorative accent border on hover -->
            <div
              class="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>

            <!-- Cover Placeholder & Main Details -->
            <div class="flex gap-4 flex-grow">
              <!-- Book Cover Placeholder / Image with fallback -->
              <div
                class="w-24 h-32 flex-shrink-0 bg-slate-100 border border-slate-200/80 rounded-lg flex flex-col items-center justify-center p-1 text-center select-none shadow-sm group-hover:shadow group-hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
              >
                <img
                  :src="`http://thuvien.dcvgiusesaigon.vn/api/books/cover/${res.item['So Tai san']}.jpg`"
                  :alt="res.item.Tua"
                  class="object-cover w-full h-full absolute inset-0 z-10"
                  @error="(e: Event) => { (e.target as HTMLElement).style.display = 'none'; }"
                />
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
                    {{ res.item.Tua }}
                  </span>
                </div>
              </div>

              <!-- Info Container -->
              <div class="space-y-2 flex-grow">
                <div class="flex items-start gap-2">
                  <span class="text-sm font-bold text-slate-400 pt-0.5">
                    {{ (currentPage - 1) * itemsPerPage + idx + 1 }}.
                  </span>
                  <div>
                    <NuxtLink
                      class="text-lg font-bold text-[#35536c] hover:underline cursor-pointer leading-snug"
                      :to="'/book-' + res.item['So Tai san']"
                    >
                      {{ res.item.Tua }}
                    </NuxtLink>
                    <p class="text-base text-gray-700 mt-1">
                      <span class="font-semibold text-gray-900">
                        {{ res.item["Ho Tac gia"] }}
                        {{ res.item["Ten Tac gia"] }}
                      </span>
                      <span v-if="res.item['Nam Xb']" class="text-gray-500">
                        ({{ res.item["Nam Xb"] }})
                      </span>
                    </p>
                  </div>
                </div>

                <!-- Metadata Chips / Details -->
                <div class="text-sm text-gray-600 space-y-1.5 pt-1">
                  <p
                    v-if="res.item['Chu de Tong quat']"
                    class="italic text-slate-600 font-medium"
                  >
                    Chủ đề: {{ res.item["Chu de Tong quat"] }}
                  </p>
                  <div
                    class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500"
                  >
                    <span v-if="res.item['Nha Xb']"
                      ><strong>NXB:</strong> {{ res.item["Nha Xb"] }}</span
                    >
                    <span v-if="res.item['Noi Xb']"
                      ><strong>Nơi XB:</strong> {{ res.item["Noi Xb"] }}</span
                    >
                    <span v-if="res.item['So trang']"
                      ><strong>Số trang:</strong>
                      {{ res.item["So trang"] }} trang</span
                    >
                    <span v-if="res.item['Ngon ngu']">
                      <strong>Ngôn ngữ:</strong>
                      {{
                        res.item["Ngon ngu"] === "P"
                          ? "Tiếng Pháp"
                          : "Tiếng Việt"
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Holding Status & Call Number -->
            <div
              class="md:w-52 flex-shrink-0 border-t md:border-t-0 md:border-l border-[#e4e4e4] pt-3 md:pt-0 md:pl-5 flex flex-col justify-between text-sm"
            >
              <div class="space-y-1.5">
                <div
                  class="font-mono bg-[#d9e4ea] px-2.5 py-1 rounded text-[#40596c] inline-block font-bold text-sm"
                >
                  <p>{{ res.item["So Chu de"] }}</p>
                  <p>{{ res.item["So Tac gia"] }}</p>
                  <p>{{ res.item["So Tai san"] }}</p>
                </div>
              </div>

              <!-- Tình trạng mượn dựa trên Tinh trang === "0" -->
              <div class="mt-4 md:mt-0">
                <div
                  v-if="res.item['Tinh trang'] === '0'"
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-[#3ea03e] font-semibold text-xs border border-emerald-200"
                >
                  <span class="w-2 h-2 rounded-full bg-[#3ea03e]"></span>
                  Có sẵn
                </div>
                <div
                  v-else
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 font-semibold text-xs border border-rose-200"
                >
                  <span class="w-2 h-2 rounded-full bg-rose-500"></span>
                  Đang mượn
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Pagination Controls -->
        <div
          v-if="totalPages > 1 && !pending"
          class="flex justify-center items-center gap-2 pt-6"
        >
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1.5 rounded border border-gray-300 text-sm font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Trước
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-3.5 py-1.5 rounded text-sm font-medium border transition',
              currentPage === page
                ? 'bg-[#40596c] text-white border-[#40596c]'
                : 'bg-white border-gray-300 hover:bg-gray-50',
            ]"
          >
            {{ page }}
          </button>

          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-1.5 rounded border border-gray-300 text-sm font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Sau
          </button>
        </div>
      </section>
    </main>

    <!-- Footer Component -->
    <footer
      class="bg-[#40596c] text-white text-xs py-6 mt-12 border-t border-[#53738c]"
    >
      <div class="max-w-7xl mx-auto px-4 text-center space-y-2">
        <p>
          © Archdiocese Saigon Seminary Library System. All rights reserved.
        </p>
        <div class="flex justify-center space-x-4 text-slate-300">
          <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
          <NuxtLink to="/search" class="hover:underline">Search</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>
