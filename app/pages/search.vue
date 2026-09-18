<script setup lang="ts">
import type { ResultEntry } from "~/types/book";
import { useSearchHistory } from "~/composables/useSearchHistory";
import LibrarySearchBar from "~/components/LibrarySearchBar.vue";

// const booksData = await import("~/assets/data/books.json");

interface RawData {
  books: ResultEntry[];
}

const route = useRoute();
const searchQuery = ref("");
const { addSearch } = useSearchHistory();

// Save to history when route query changes and has value
watch(
  () => route.query.q,
  (newQ) => {
    if (typeof newQ === "string" && newQ.trim()) {
      addSearch(newQ);
      searchQuery.value = newQ;
    }
  },
  { immediate: true },
);

useHead({
  title: computed(() =>
    route.query.q
      ? `Kết quả tìm kiếm "${route.query.q}" | Thư Viện Đại Chủng Viện Thánh Giuse Sài Gòn`
      : `Tra cứu danh mục sách | Thư Viện Đại Chủng Viện Thánh Giuse Sài Gòn`,
  ),
});
const selectedLanguage = ref("all");
const currentPage = ref(1);
const itemsPerPage = ref(5);

const {
  data: rawResults,
  pending,
  error,
  refresh,
} = await useAsyncData<ResultEntry[]>(
  () => "books-search-" + (route.query.q || "all"),
  async () => {
    const q = route.query.q as string;
    if (!q) {
      return [];
    }

    const response = await $fetch<{ books?: ResultEntry[] }>(
      "//data.dcvgiusesaigon.vn/api/books?q=" + q,
    );
    return response.books as ResultEntry[];
  },
);

const selectedSubject = ref("all");
const selectedYearRange = ref("all");
const sortBy = ref("relevance");

const availableLanguages = computed(() => {
  if (!rawResults.value) return [];
  let viCount = 0;
  let enCount = 0;
  let frCount = 0;
  let otherCount = 0;

  rawResults.value.forEach((r) => {
    const lang = r.item["Ngon ngu"];
    if (!lang) {
      otherCount++;
      return;
    }
    const c = lang.trim().toLowerCase();
    if (c === "v" || c === "vi") {
      viCount++;
    } else if (c === "a" || c === "en") {
      enCount++;
    } else if (c === "p" || c === "fr") {
      frCount++;
    } else {
      otherCount++;
    }
  });

  const list = [];
  if (viCount > 0)
    list.push({ code: "vietnamese", label: "Tiếng Việt", count: viCount });
  if (enCount > 0)
    list.push({ code: "english", label: "Tiếng Anh", count: enCount });
  if (frCount > 0)
    list.push({ code: "french", label: "Tiếng Pháp", count: frCount });
  if (otherCount > 0)
    list.push({
      code: "other",
      label: "Những ngôn ngữ khác",
      count: otherCount,
    });

  return list;
});

const availableSubjects = computed(() => {
  if (!rawResults.value) return [];
  const subjects = new Set<string>();
  rawResults.value.forEach((r) => {
    if (r.item["Chu de Tong quat"]) {
      subjects.add(r.item["Chu de Tong quat"]);
    }
  });
  return Array.from(subjects);
});

const availableYearRanges = computed(() => {
  if (!rawResults.value) return [];
  const years: number[] = [];
  rawResults.value.forEach((r) => {
    const y = parseInt(r.item["Nam Xb"] || "0");
    if (!isNaN(y) && y > 0) {
      years.push(y);
    }
  });

  const ranges = [{ id: "all", label: "Tất cả các năm" }];
  if (years.length > 0) {
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    if (minYear < 2000 || years.some((y) => y < 2000)) {
      ranges.push({ id: "before2000", label: "Trước năm 2000" });
    }
    if (years.some((y) => y >= 2000 && y <= 2010)) {
      ranges.push({ id: "2000to2010", label: "2000 – 2010" });
    }
    if (maxYear > 2010 || years.some((y) => y > 2010)) {
      ranges.push({ id: "after2010", label: "Sau năm 2010" });
    }
  } else {
    ranges.push(
      { id: "before2000", label: "Trước năm 2000" },
      { id: "2000to2010", label: "2000 – 2010" },
      { id: "after2010", label: "Sau năm 2010" },
    );
  }

  return ranges;
});

const filteredResults = computed(() => {
  if (!rawResults.value) return [];

  let results = rawResults.value.filter(({ item }) => {
    let matchesLang = true;
    if (selectedLanguage.value !== "all") {
      const lang = (item["Ngon ngu"] || "").trim().toLowerCase();
      if (selectedLanguage.value === "vietnamese") {
        matchesLang = lang === "v" || lang === "vi";
      } else if (selectedLanguage.value === "english") {
        matchesLang = lang === "a" || lang === "en";
      } else if (selectedLanguage.value === "french") {
        matchesLang = lang === "p" || lang === "fr";
      } else if (selectedLanguage.value === "other") {
        matchesLang =
          lang !== "v" &&
          lang !== "vi" &&
          lang !== "a" &&
          lang !== "en" &&
          lang !== "p" &&
          lang !== "fr";
      }
    }

    const matchesSubject =
      selectedSubject.value === "all" ||
      item["Chu de Tong quat"] === selectedSubject.value;

    let matchesYear = true;
    if (selectedYearRange.value !== "all") {
      const year = parseInt(item["Nam Xb"] || "0") || 0;
      if (selectedYearRange.value === "before2000") matchesYear = year < 2000;
      else if (selectedYearRange.value === "2000to2010")
        matchesYear = year >= 2000 && year <= 2010;
      else if (selectedYearRange.value === "after2010")
        matchesYear = year > 2010;
    }

    return matchesLang && matchesSubject && matchesYear;
  });

  if (sortBy.value === "yearNewest") {
    results.sort(
      (a, b) =>
        (parseInt(b.item["Nam Xb"] || "0") || 0) -
        (parseInt(a.item["Nam Xb"] || "0") || 0),
    );
  } else if (sortBy.value === "yearOldest") {
    results.sort(
      (a, b) =>
        (parseInt(a.item["Nam Xb"] || "0") || 0) -
        (parseInt(b.item["Nam Xb"] || "0") || 0),
    );
  } else if (sortBy.value === "titleAZ") {
    results.sort((a, b) => (a.item.Tua || "").localeCompare(b.item.Tua || ""));
  }

  return results;
});

const totalPages = computed(
  () => Math.ceil(filteredResults.value.length / itemsPerPage.value) || 1,
);

const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredResults.value.slice(start, start + itemsPerPage.value);
});

watch(
  [
    searchQuery,
    selectedLanguage,
    selectedSubject,
    selectedYearRange,
    sortBy,
    itemsPerPage,
  ],
  () => {
    currentPage.value = 1;
  },
);

const formatLanguage = (langCode: string) => {
  if (!langCode) return "";
  const code = langCode.trim().toLowerCase();
  if (code === "p" || code === "fr" || code === "french") return "Tiếng Pháp";
  if (code === "v" || code === "vi" || code === "vietnamese")
    return "Tiếng Việt";
  if (code === "a" || code === "en" || code === "english") return "Tiếng Anh";
  return langCode;
};

const availableCount = computed(() => {
  return filteredResults.value.filter((r) => r.item["Tinh trang"] === "0")
    .length;
});

const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 2;
  const range: (number | string)[] = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number | undefined;

  range.push(1);
  for (let i = current - delta; i <= current + delta; i++) {
    if (i < total && i > 1) {
      range.push(i);
    }
  }
  if (total > 1) {
    range.push(total);
  }

  for (const i of range) {
    if (l) {
      if (typeof i === "number" && i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (typeof i === "number" && i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = typeof i === "number" ? i : l;
  }

  return rangeWithDots;
});
</script>

<template>
  <div
    class="min-h-screen bg-[#fafafa] font-sans text-gray-800 flex flex-col text-base"
  >
    <!-- Error Banner -->
    <div v-if="error" class="w-full col-span-full">
      <div
        class="bg-rose-50 border border-rose-200 text-rose-800 px-5 py-4 rounded-xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div class="flex items-center gap-3">
          <svg
            class="w-6 h-6 text-rose-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <h3 class="font-bold text-sm">
              Không thể kết nối hoặc tải dữ liệu từ máy chủ thư viện
            </h3>
            <p class="text-xs text-rose-600">
              Vui lòng kiểm tra lại đường truyền hoặc thử lại sau.
            </p>
          </div>
        </div>
        <button
          @click="refresh()"
          class="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded shadow transition flex-shrink-0"
        >
          Thử lại
        </button>
      </div>
    </div>

    <!-- Header -->
    <SiteHeader />

    <!-- Search Bar Banner -->
    <section class="bg-[#40596c] py-8 px-4 shadow-inner">
      <div class="max-w-4xl mx-auto flex flex-col gap-3">
        <LibrarySearchBar
          variant="banner"
          v-model="searchQuery"
          @submit="(q) => addSearch(q)"
        />

        <!-- Quick / History Suggestion Tags -->
        <QuickSearchTags />
      </div>
    </section>

    <!-- Content Layout -->
    <main
      class="max-w-7xl mx-auto w-full px-4 py-8 flex-grow flex flex-col lg:flex-row gap-8"
    >
      <!-- Facet Sidebar -->
      <aside class="w-full lg:w-72 flex-shrink-0 space-y-6">
        <div
          class="bg-white p-5 rounded-lg shadow-sm border border-[#e4e4e4] space-y-6"
        >
          <div>
            <h3
              class="font-bold text-base text-[#40596c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e4e4e4]"
            >
              Lọc kết quả
            </h3>

            <!-- Language Filter -->
            <div class="space-y-2">
              <span
                class="text-xs font-semibold text-gray-500 uppercase tracking-wider block"
                >Ngôn ngữ</span
              >
              <ul class="space-y-2 text-sm text-gray-700">
                <li
                  @click="selectedLanguage = 'all'"
                  :class="{
                    'font-semibold text-[#40596c] bg-slate-50 px-2 py-1 rounded':
                      selectedLanguage === 'all',
                  }"
                  class="flex justify-between items-center cursor-pointer hover:text-[#40596c]"
                >
                  <span>Tất cả ngôn ngữ</span>
                  <span
                    class="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600"
                  >
                    {{ rawResults?.length || 0 }}
                  </span>
                </li>
                <li
                  v-for="lang in availableLanguages"
                  :key="lang.code"
                  @click="selectedLanguage = lang.code"
                  :class="{
                    'font-semibold text-[#40596c] bg-slate-50 px-2 py-1 rounded':
                      selectedLanguage === lang.code,
                  }"
                  class="flex justify-between items-center cursor-pointer hover:text-[#40596c]"
                >
                  <span>{{ lang.label }}</span>
                  <span
                    class="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600"
                  >
                    {{ lang.count }}
                  </span>
                </li>
              </ul>
            </div>

            <!-- Subject Category Filter -->
            <div class="space-y-2 mt-5">
              <span
                class="text-xs font-semibold text-gray-500 uppercase tracking-wider block"
                >Chủ đề tổng quát</span
              >
              <select
                v-model="selectedSubject"
                class="w-full text-sm border border-gray-300 rounded px-2.5 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#40596c]"
              >
                <option value="all">Tất cả chủ đề</option>
                <option
                  v-for="subj in availableSubjects"
                  :key="subj"
                  :value="subj"
                >
                  {{ subj }}
                </option>
              </select>
            </div>

            <!-- Publication Year Range Filter -->
            <div class="space-y-2 mt-5">
              <span
                class="text-xs font-semibold text-gray-500 uppercase tracking-wider block"
                >Năm xuất bản</span
              >
              <select
                v-model="selectedYearRange"
                class="w-full text-sm border border-gray-300 rounded px-2.5 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#40596c]"
              >
                <option
                  v-for="range in availableYearRanges"
                  :key="range.id"
                  :value="range.id"
                >
                  {{ range.label }}
                </option>
              </select>
            </div>
          </div>

          <div class="pt-4 border-t border-[#e4e4e4]">
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
                for="sortBy"
                class="text-xs text-gray-500 uppercase font-bold"
                >Sắp xếp:</label
              >
              <select
                id="sortBy"
                v-model="sortBy"
                class="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none"
              >
                <option value="relevance">Mặc định (Độ liên quan)</option>
                <option value="yearNewest">Năm xuất bản (Mới nhất)</option>
                <option value="yearOldest">Năm xuất bản (Cũ nhất)</option>
                <option value="titleAZ">Tựa đề (A - Z)</option>
              </select>
            </div>

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
              <!-- Book Cover Component with fallback -->
              <div class="w-24 h-32 flex-shrink-0">
                <BookCoverImage
                  :assetId="res.item['So Tai san']"
                  :title="res.item.Tua"
                  class="w-full h-full"
                />
              </div>

              <!-- Info Container -->
              <div class="space-y-2 flex-grow">
                <div class="flex items-start gap-2">
                  <span class="text-sm font-bold text-slate-400 pt-0.5">
                    {{ (currentPage - 1) * itemsPerPage + idx + 1 }}.
                  </span>
                  <div>
                    <NuxtLink
                      class="text-lg font-bold text-[#35536c] hover:underline cursor-pointer leading-snug line-clamp-2"
                      :to="'/book-' + res.item['So Tai san']"
                      :title="res.item.Tua"
                      target="_blank"
                    >
                      {{ res.item.Tua }}
                    </NuxtLink>
                    <p class="text-base text-gray-700 mt-1">
                      <NuxtLink
                        :to="`/search?q=${res.item['Ho Tac gia']} ${res.item['Ten Tac gia']}`"
                        class="font-semibold text-gray-900 hover:underline cursor-pointer"
                      >
                        {{ res.item["Ho Tac gia"] }}
                        {{ res.item["Ten Tac gia"] }}
                      </NuxtLink>
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
                      {{ formatLanguage(res.item["Ngon ngu"]) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Holding Status & Call Number -->
            <div
              class="md:w-52 flex-shrink-0 border-t md:border-t-0 md:border-l border-[#e4e4e4] pt-3 md:pt-0 md:pl-5 flex flex-col justify-between text-sm"
            >
              <div class="space-y-1">
                <span
                  class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1"
                >
                  Mã phân loại
                </span>
                <div
                  class="font-mono bg-slate-100/80 border border-slate-200/80 px-3 py-2 rounded-md text-[#40596c] inline-block font-bold text-xs space-y-0.5 shadow-2xs"
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
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-[#3ea03e] font-semibold text-xs border border-emerald-200 shadow-2xs"
                >
                  <span class="w-2 h-2 rounded-full bg-[#3ea03e]"></span>
                  Có sẵn
                </div>
                <div
                  v-else
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 font-semibold text-xs border border-rose-200 shadow-2xs"
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
          class="flex justify-center items-center gap-1.5 pt-6 flex-wrap"
        >
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1.5 rounded border border-gray-300 text-sm font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Trước
          </button>

          <template v-for="(page, idx) in displayedPages" :key="idx">
            <span v-if="page === '...'" class="px-2 text-gray-500 select-none"
              >...</span
            >
            <button
              v-else
              @click="currentPage = Number(page)"
              :class="[
                'px-3.5 py-1.5 rounded text-sm font-medium border transition',
                currentPage === page
                  ? 'bg-[#40596c] text-white border-[#40596c]'
                  : 'bg-white border-gray-300 hover:bg-gray-50',
              ]"
            >
              {{ page }}
            </button>
          </template>

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
    <SiteFooter />
  </div>
</template>
