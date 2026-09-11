<script setup lang="ts">
import { ref, computed } from "vue";
import SiteHeader from "~/components/SiteHeader.vue";

interface BookItem {
  "Tu dien": string;
  Collection: string;
  "Tap chi": string;
  "Chu de Tong quat": string;
  "So Chu de": string;
  "So Tac gia": string;
  "So Tap": string;
  "So Cuon": string;
  "So Tai san": string;
  Tua: string;
  "Ten Tac gia": string;
  "Ho Tac gia": string;
  "Dich gia": string;
  "Lan Xb": string;
  "Noi Xb": string;
  "Nha Xb": string;
  "Nam Xb": string;
  "So trang": string;
  "Ngay nhap": string;
  "Ngon ngu": string;
  "Sach co": string;
  "Tinh trang": string;
  NS: Array<Object>;
}

interface ResultEntry {
  item: BookItem;
  refIndex: number;
}

const route = useRoute();
const copied = ref(false);

const { data: book, pending } = await useAsyncData<ResultEntry>(
  "book-detail",
  async () => {
    const response: ResultEntry = await $fetch(
      "https://semi-library.free.beeceptor.com/book/" + route.params.id,
    );

    return response as ResultEntry;
  },
  { lazy: true, server: false },
);

const activeTab = ref("summary");

const citationAPA = computed(() => {
  if (!book?.value?.item) return "";
  const item = book.value.item;
  const author =
    `${item["Ho Tac gia"] || ""} ${item["Ten Tac gia"] || ""}`.trim() ||
    "Tác giả ẩn danh";
  const year = item["Nam Xb"] ? `(${item["Nam Xb"]})` : "(n.d.)";
  const title = item["Tua"] || "Không rõ tên sách";
  const publisher = item["Nha Xb"] ? `${item["Nha Xb"]}` : "";
  const place = item["Noi Xb"] ? `${item["Noi Xb"]}: ` : "";
  return `${author} ${year}. <em>${title}</em>. ${place}${publisher}.`;
});

const citationMLA = computed(() => {
  if (!book?.value?.item) return "";
  const item = book.value.item;
  const author =
    `${item["Ho Tac gia"] || ""}, ${item["Ten Tac gia"] || ""}`.trim();
  const title = item["Tua"] || "Không rõ tên sách";
  const publisher = item["Nha Xb"] || "";
  const year = item["Nam Xb"] || "";
  return `${author}. <em>${title}</em>. ${publisher}, ${year}.`;
});

const citationChicago = computed(() => {
  if (!book?.value?.item) return "";
  const item = book.value.item;
  const author =
    `${item["Ten Tac gia"] || ""} ${item["Ho Tac gia"] || ""}`.trim() ||
    "Tác giả ẩn danh";
  const title = item["Tua"] || "Không rõ tên sách";
  const place = item["Noi Xb"] ? `${item["Noi Xb"]}: ` : "";
  const publisher = item["Nha Xb"] || "";
  const year = item["Nam Xb"] || "";
  const pubInfo =
    place || publisher || year
      ? `(${place}${publisher}${publisher && year ? ", " : ""}${year})`
      : "";
  return `${author}, <em>${title}</em> ${pubInfo}.`;
});

const citationTurabian = computed(() => {
  if (!book?.value?.item) return "";
  const item = book.value.item;
  const author =
    `${item["Ten Tac gia"] || ""} ${item["Ho Tac gia"] || ""}`.trim() ||
    "Tác giả ẩn danh";
  const title = item["Tua"] || "Không rõ tên sách";
  const place = item["Noi Xb"] ? `${item["Noi Xb"]}: ` : "";
  const publisher = item["Nha Xb"] || "";
  const year = item["Nam Xb"] || "";
  const pubInfo =
    place || publisher || year
      ? `(${place}${publisher}${publisher && year ? ", " : ""}${year})`
      : "";
  const pages = item["So trang"] ? `, ${item["So trang"]}` : "";
  return `1. ${author}, <em>${title}</em> ${pubInfo}${pages}.`;
});

const copyCitation = async (text: string) => {
  // Strip HTML for plain copy
  const temp = document.createElement("div");
  temp.innerHTML = text;
  await navigator.clipboard.writeText(temp.textContent || temp.innerText || "");
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

const handleBorrow = () => {
  alert("Vui lòng liên hệ quầy thủ thư để yêu cầu mượn ấn phẩm này.");
};
</script>

<template>
  <div
    id="primoExploreRoot"
    class="min-h-screen bg-[#fafafa] font-roboto text-[#444] antialiased"
  >
    <SiteHeader />

    <!-- Main Detail Container -->
    <main class="mx-auto max-w-[1280px] px-4 py-6 md:px-8">
      <!-- Book Header Card -->
      <div
        class="bg-white p-6 md:p-8 shadow-sm border border-[#e4e4e4] rounded-lg mb-6 relative overflow-hidden"
      >
        <div class="flex flex-col md:flex-row gap-8 items-start">
          <!-- Book Cover Placeholder / Image with Badge & Shadow -->
          <div class="flex flex-col items-center gap-3">
            <div
              class="w-36 h-48 bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 rounded-md shadow-md flex flex-col items-center justify-center p-3 text-center relative overflow-hidden group"
            >
              <img
                v-if="book?.item"
                :src="`http://thuvien.dcvgiusesaigon.vn/api/books/cover/${book.item['So Tai san']}.jpg`"
                :alt="book.item['Tua']"
                class="object-cover w-full h-full absolute inset-0 z-10"
                @error="(e: Event) => { (e.target as HTMLElement).style.display = 'none'; }"
              />
              <div
                class="absolute left-0 top-0 bottom-0 w-2 bg-[#40596c]/30 z-20"
              ></div>
              <div class="absolute inset-0 flex flex-col items-center justify-center p-3 z-0 bg-slate-100">
                <svg
                  class="w-10 h-10 text-slate-400 mb-2 group-hover:scale-110 transition-transform"
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
                <span
                  class="text-[11px] text-slate-600 font-semibold line-clamp-3 leading-tight uppercase"
                >
                  {{ book?.item["Tua"] }}
                </span>
              </div>
            </div>

            <!-- Tình trạng mượn -->
            <div v-if="book?.item" class="w-full">
              <div
                v-if="book.item['Tinh trang'] === '0'"
                class="w-full text-center py-1.5 px-3 rounded bg-emerald-50 text-emerald-700 font-semibold text-xs border border-emerald-200 flex items-center justify-center gap-1.5"
              >
                <span
                  class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                ></span>
                Có thể mượn
              </div>
              <div
                v-else
                class="w-full text-center py-1.5 px-3 rounded bg-rose-50 text-rose-700 font-semibold text-xs border border-rose-200 flex items-center justify-center gap-1.5"
              >
                <span class="w-2 h-2 rounded-full bg-rose-500"></span>
                Đang được mượn
              </div>
            </div>
          </div>

          <!-- Primary Book Information -->
          <div class="flex-1 space-y-4">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span
                  class="inline-block px-2.5 py-0.5 text-xs font-semibold bg-[#d9e4ea] text-[#40596c] rounded"
                >
                  SÁCH THƯ VIỆN
                </span>
                <span
                  v-if="book?.item['Ngon ngu']"
                  class="text-xs text-slate-500 font-medium"
                >
                  Ngôn ngữ:
                  {{
                    book.item["Ngon ngu"] === "P" ? "Tiếng Pháp" : "Tiếng Việt"
                  }}
                </span>
              </div>

              <h1
                class="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3"
              >
                {{ book?.item["Tua"] }}
              </h1>

              <div class="text-base text-gray-700 space-y-1">
                <p v-if="book?.item['Ten Tac gia']">
                  <span class="font-semibold text-gray-900">Tác giả:</span>
                  {{ book.item["Ho Tac gia"] }} {{ book.item["Ten Tac gia"] }}
                </p>
                <p v-if="book?.item['Nha Xb']">
                  <span class="font-semibold text-gray-900">Nhà xuất bản:</span>
                  {{ book.item["Noi Xb"] }} : {{ book.item["Nha Xb"] }},
                  {{ book.item["Nam Xb"] }}
                </p>
                <p v-if="book?.item['So trang']">
                  <span class="font-semibold text-gray-900">Số trang:</span>
                  {{ book.item["So trang"] }} trang
                </p>
              </div>
            </div>

            <!-- Call Number / Classification Badges -->
            <div class="flex flex-wrap gap-2 text-xs text-slate-700 pt-1">
              <span
                v-if="book?.item['So Chu de']"
                class="bg-slate-100 px-2.5 py-1 rounded border border-slate-200 font-mono"
              >
                Chủ đề: {{ book.item["So Chu de"] }}
              </span>
              <span
                v-if="book?.item['So Tac gia']"
                class="bg-slate-100 px-2.5 py-1 rounded border border-slate-200 font-mono"
              >
                Mã TG: {{ book.item["So Tac gia"] }}
              </span>
              <span
                v-if="book?.item['So Tai san']"
                class="bg-slate-100 px-2.5 py-1 rounded border border-slate-200 font-mono font-bold text-[#40596c]"
              >
                Số Tài sản: {{ book.item["So Tai san"] }}
              </span>
            </div>

            <!-- Action Buttons Bar -->
            <div
              class="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100"
            >
              <button
                @click="handleBorrow()"
                class="px-4 py-2 bg-[#40596c] hover:bg-[#324554] text-white font-medium text-sm rounded shadow-sm transition active:scale-95 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Yêu cầu mượn
              </button>

              <button
                @click="copyCitation(route.fullPath || '')"
                class="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-sm rounded shadow-sm transition active:scale-95 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                Sao chép liên kết
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Action & Holdings Tabs -->
      <div class="bg-white border border-[#e4e4e4] shadow-sm rounded-sm">
        <!-- Tab Controls -->
        <div class="flex border-b border-[#e4e4e4] bg-[#fafafa]">
          <button
            @click="activeTab = 'summary'"
            :class="[
              'px-5 py-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === 'summary'
                ? 'border-[#53738c] text-[#53738c] bg-white'
                : 'border-transparent text-[#666] hover:text-[#000]',
            ]"
          >
            Giới thiệu
          </button>

          <button
            @click="activeTab = 'details'"
            :class="[
              'px-5 py-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === 'details'
                ? 'border-[#53738c] text-[#53738c] bg-white'
                : 'border-transparent text-[#666] hover:text-[#000]',
            ]"
          >
            Chi tiết
          </button>
          <button
            @click="activeTab = 'index'"
            :class="[
              'px-5 py-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === 'index'
                ? 'border-[#53738c] text-[#53738c] bg-white'
                : 'border-transparent text-[#666] hover:text-[#000]',
            ]"
          >
            Mục lục
          </button>
          <button
            @click="activeTab = 'citation'"
            :class="[
              'px-5 py-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === 'citation'
                ? 'border-[#53738c] text-[#53738c] bg-white'
                : 'border-transparent text-[#666] hover:text-[#000]',
            ]"
          >
            Mẫu trích dẫn
          </button>
        </div>

        <!-- Tab 0: Summary -->
        <div v-if="activeTab === 'summary'" class="p-6 md:p-8 space-y-6">
          <div class="prose max-w-none">
            <h3 class="font-serif text-xl font-bold text-gray-900 mb-2">
              Tổng quan ấn phẩm
            </h3>
            <p class="text-gray-700 text-base leading-relaxed">
              {{ book?.item.NS[0]?.MucLuc }}
            </p>
          </div>
        </div>

        <!-- Tab 1: Index -->
        <div v-if="activeTab === 'index'" class="p-6 md:p-8">
          <div class="flex items-center space-x-2 text-sm text-slate-600">
            <svg
              class="w-5 h-5 text-amber-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span
              >Mục lục chi tiết đang được cập nhật từ hệ thống quét dữ liệu thư
              viện.</span
            >
          </div>
        </div>

        <!-- Tab 2: Structured Details (Chi tiết) -->
        <div v-if="activeTab === 'details'" class="p-6 md:p-8">
          <div class="space-y-6">
            <div>
              <h4
                class="font-serif text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-slate-200"
              >
                Thông tin Biên mục & Xuất bản
              </h4>
              <dl
                class="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm"
              >
                <div
                  class="flex justify-between py-1 border-b border-slate-100"
                >
                  <dt class="font-medium text-slate-500">Tựa đề:</dt>
                  <dd class="font-semibold text-slate-900 text-right">
                    {{ book?.item["Tua"] }}
                  </dd>
                </div>
                <div
                  class="flex justify-between py-1 border-b border-slate-100"
                >
                  <dt class="font-medium text-slate-500">Tác giả:</dt>
                  <dd class="font-semibold text-slate-900 text-right">
                    {{ book?.item["Ho Tac gia"] }}
                    {{ book?.item["Ten Tac gia"] }}
                  </dd>
                </div>
                <div
                  class="flex justify-between py-1 border-b border-slate-100"
                  v-if="book?.item['Nha Xb']"
                >
                  <dt class="font-medium text-slate-500">Nhà xuất bản:</dt>
                  <dd class="font-semibold text-slate-900 text-right">
                    {{ book?.item["Nha Xb"] }}
                  </dd>
                </div>
                <div
                  class="flex justify-between py-1 border-b border-slate-100"
                  v-if="book?.item['Noi Xb']"
                >
                  <dt class="font-medium text-slate-500">Nơi xuất bản:</dt>
                  <dd class="font-semibold text-slate-900 text-right">
                    {{ book?.item["Noi Xb"] }}
                  </dd>
                </div>
                <div
                  class="flex justify-between py-1 border-b border-slate-100"
                  v-if="book?.item['Nam Xb']"
                >
                  <dt class="font-medium text-slate-500">Năm xuất bản:</dt>
                  <dd class="font-semibold text-slate-900 text-right">
                    {{ book?.item["Nam Xb"] }}
                  </dd>
                </div>
                <div
                  class="flex justify-between py-1 border-b border-slate-100"
                  v-if="book?.item['So trang']"
                >
                  <dt class="font-medium text-slate-500">Số trang:</dt>
                  <dd class="font-semibold text-slate-900 text-right">
                    {{ book?.item["So trang"] }}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h4
                class="font-serif text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-slate-200"
              >
                Mã định danh & Phân loại
              </h4>
              <dl
                class="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm"
              >
                <div
                  class="flex justify-between py-1 border-b border-slate-100"
                  v-if="book?.item['So Tai san']"
                >
                  <dt class="font-medium text-slate-500">ID Tài sản:</dt>
                  <dd class="font-mono font-semibold text-primary text-right">
                    {{ book?.item["So Tai san"] }}
                  </dd>
                </div>
                <div
                  class="flex justify-between py-1 border-b border-slate-100"
                  v-if="book?.item['So Chu de']"
                >
                  <dt class="font-medium text-slate-500">Mã chủ đề:</dt>
                  <dd class="font-mono font-semibold text-slate-900 text-right">
                    {{ book?.item["So Chu de"] }}
                  </dd>
                </div>
                <div
                  class="flex justify-between py-1 border-b border-slate-100"
                  v-if="book?.item['So Tac gia']"
                >
                  <dt class="font-medium text-slate-500">Mã tác giả:</dt>
                  <dd class="font-mono font-semibold text-slate-900 text-right">
                    {{ book?.item["So Tac gia"] }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <!-- Tab 3: Citation Generator -->
        <div v-if="activeTab === 'citation'" class="p-6 md:p-8 space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="font-serif text-lg font-bold text-gray-900">
              Định dạng trích dẫn học thuật
            </h3>
            <span
              v-if="copied"
              class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200"
            >
              ✓ Đã sao chép vào bộ nhớ tạm!
            </span>
          </div>

          <div class="space-y-4">
            <!-- APA -->
            <div
              class="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2"
            >
              <div class="flex items-center justify-between">
                <span
                  class="text-xs font-bold uppercase tracking-wider text-slate-600"
                  >Kiểu APA (7th Edition)</span
                >
                <button
                  @click="copyCitation(citationAPA)"
                  class="px-3 py-1 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded shadow-sm transition"
                >
                  Sao chép APA
                </button>
              </div>
              <p
                class="text-sm text-slate-800 font-sans italic"
                v-html="citationAPA"
              ></p>
            </div>

            <!-- MLA -->
            <div
              class="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2"
            >
              <div class="flex items-center justify-between">
                <span
                  class="text-xs font-bold uppercase tracking-wider text-slate-600"
                  >Kiểu MLA (9th Edition)</span
                >
                <button
                  @click="copyCitation(citationMLA)"
                  class="px-3 py-1 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded shadow-sm transition"
                >
                  Sao chép MLA
                </button>
              </div>
              <p
                class="text-sm text-slate-800 font-sans italic"
                v-html="citationMLA"
              ></p>
            </div>

            <!-- Chicago -->
            <div
              class="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2"
            >
              <div class="flex items-center justify-between">
                <span
                  class="text-xs font-bold uppercase tracking-wider text-slate-600"
                  >Kiểu Chicago</span
                >
                <button
                  @click="copyCitation(citationChicago)"
                  class="px-3 py-1 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded shadow-sm transition"
                >
                  Sao chép Chicago
                </button>
              </div>
              <p
                class="text-sm text-slate-800 font-sans italic"
                v-html="citationChicago"
              ></p>
            </div>

            <!-- Turabian 8th Edition -->
            <div
              class="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2"
            >
              <div class="flex items-center justify-between">
                <span
                  class="text-xs font-bold uppercase tracking-wider text-slate-600"
                  >Kiểu Turabian</span
                >
                <button
                  @click="copyCitation(citationTurabian)"
                  class="px-3 py-1 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded shadow-sm transition"
                >
                  Sao chép Turabian
                </button>
              </div>
              <p
                class="text-sm text-slate-800 font-sans italic"
                v-html="citationTurabian"
              ></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
