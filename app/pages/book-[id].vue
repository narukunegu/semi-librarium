<script setup lang="ts">
import { ref, computed } from "vue";
import SiteHeader from "~/components/SiteHeader.vue";
import SiteFooter from "~/components/SiteFooter.vue";
import BookCoverImage from "~/components/BookCoverImage.vue";
import { useResearchShelf } from "~/composables/useResearchShelf";
import { useCitations } from "~/composables/useCitations";
import type { BookItem } from "~/types/book";

const { toggleSaveBook, isSaved } = useResearchShelf();

interface rawData {
  book: BookItem;
}

const route = useRoute();
const copied = ref(false);

const {
  data: book,
  pending,
  error,
  refresh,
} = await useAsyncData<BookItem>(
  () => "book-detail-" + route.params.id,
  async () => {
    const response: rawData = await $fetch(
      "//data.dcvgiusesaigon.vn/api/book/" + route.params.id,
    );

    return response.book as BookItem;
  },
);

useHead({
  title: computed(() => {
    return (
      (book.value?.Tua
        ? book.value.Tua.slice(0, 50) + `...`
        : `Chi tiết ấn phẩm`) + ` | Thư Viện Đại Chủng Viện Thánh Giuse Sài Gòn`
    );
  }),
});

const activeTab = ref("summary");
const isIndexExpanded = ref(false);

const { citationAPA, citationMLA, citationChicago, citationTurabian } =
  useCitations(book);

const copyCitation = async (text: string) => {
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
    <!-- Error Banner -->
    <div v-if="error" class="w-full">
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
              Không thể kết nối hoặc tải dữ liệu chi tiết ấn phẩm từ máy chủ API
            </h3>
            <p class="text-xs text-rose-600">
              Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau.
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

    <SiteHeader />

    <!-- Main Detail Container -->
    <main class="mx-auto max-w-[1280px] px-4 py-6 md:px-8">
      <!-- Book Header Card -->
      <div
        class="bg-white p-6 md:p-8 shadow-sm border border-[#e4e4e4] rounded-lg mb-6 relative overflow-hidden"
      >
        <div class="flex flex-col md:flex-row gap-8 items-start">
          <!-- Book Cover Component -->
          <div class="flex flex-col items-center gap-3">
            <div class="w-36 h-48 shadow-md rounded-md overflow-hidden">
              <BookCoverImage
                v-if="book"
                :assetId="book['So Tai san']"
                :title="book.Tua"
                class="w-full h-full"
              />
            </div>

            <!-- Tình trạng mượn -->
            <div v-if="book" class="w-full">
              <div
                v-if="book['Tinh trang'] === '0'"
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
                  v-if="book!['Ngon ngu']"
                  class="text-xs text-slate-500 font-medium"
                >
                  Ngôn ngữ:
                  {{ book!["Ngon ngu"] === "P" ? "Tiếng Pháp" : "Tiếng Việt" }}
                </span>
              </div>

              <h1
                class="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3"
              >
                {{ book!["Tua"] }}
              </h1>

              <div class="text-base text-gray-700 space-y-1">
                <p v-if="book!['Ten Tac gia']">
                  <span class="font-semibold text-gray-900">Tác giả:</span>
                  {{ book!["Ho Tac gia"] }} {{ book!["Ten Tac gia"] }}
                </p>
                <p v-if="book!['Nha Xb']">
                  <span class="font-semibold text-gray-900">Nhà xuất bản:</span>
                  {{ book!["Noi Xb"] }} : {{ book!["Nha Xb"] }},
                  {{ book!["Nam Xb"] }}
                </p>
                <p v-if="book!['So trang']">
                  <span class="font-semibold text-gray-900">Số trang:</span>
                  {{ book!["So trang"] }} trang
                </p>
              </div>
            </div>

            <!-- Call Number / Classification Badges -->
            <div class="flex flex-wrap gap-2 text-xs text-slate-700 pt-1">
              <span
                v-if="book!['So Chu de']"
                class="bg-slate-100 px-2.5 py-1 rounded border border-slate-200 font-mono"
              >
                Chủ đề: {{ book!["So Chu de"] }}
              </span>
              <span
                v-if="book!['So Tac gia']"
                class="bg-slate-100 px-2.5 py-1 rounded border border-slate-200 font-mono"
              >
                Mã TG: {{ book!["So Tac gia"] }}
              </span>
              <span
                v-if="book!['So Tai san']"
                class="bg-slate-100 px-2.5 py-1 rounded border border-slate-200 font-mono font-bold text-[#40596c]"
              >
                Số Tài sản: {{ book!["So Tai san"] }}
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

              <button
                v-if="book"
                @click="toggleSaveBook(book)"
                class="px-4 py-2 bg-amber-50 border border-amber-300 hover:bg-amber-100 text-amber-800 font-medium text-sm rounded shadow-sm transition active:scale-95 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                {{
                  isSaved(book["So Tai san"])
                    ? "Đã lưu vào kệ"
                    : "Lưu vào kệ sách"
                }}
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
              {{ book!.NS[0]!.GioiThieu }}
            </p>
          </div>
        </div>

        <!-- Tab 1: Index -->
        <div v-if="activeTab === 'index'" class="p-6 md:p-8">
          <div v-if="book?.NS?.[0]?.MucLuc" class="prose max-w-none space-y-4">
            <h3 class="font-serif text-xl font-bold text-gray-900 mb-2">
              Mục lục ấn phẩm
            </h3>
            <div class="relative">
              <p
                class="text-gray-700 text-base leading-relaxed transition-all duration-300"
                :class="{ 'max-h-96 overflow-hidden': !isIndexExpanded }"
                style="white-space: pre-wrap"
              >
                {{ book.NS[0].MucLuc }}
              </p>
              <div
                v-if="!isIndexExpanded && book.NS[0].MucLuc.length > 300"
                class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"
              ></div>
            </div>
            <div v-if="book.NS[0].MucLuc.length > 300" class="text-center pt-2">
              <button
                @click="isIndexExpanded = !isIndexExpanded"
                class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg shadow-sm transition inline-flex items-center gap-1.5"
              >
                <span>{{
                  isIndexExpanded
                    ? "Thu gọn mục lục"
                    : "Xem thêm toàn bộ mục lục"
                }}</span>
                <svg
                  class="w-4 h-4 transition-transform"
                  :class="{ 'rotate-180': isIndexExpanded }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            v-else
            class="flex items-center space-x-2 text-sm text-slate-600"
          >
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
                    {{ book!["Tua"] }}
                  </dd>
                </div>
                <div
                  class="flex justify-between py-1 border-b border-slate-100"
                >
                  <dt class="font-medium text-slate-500">Tác giả:</dt>
                  <dd class="font-semibold text-slate-900 text-right">
                    {{ book!["Ho Tac gia"] }}
                    {{ book!["Ten Tac gia"] }}
                  </dd>
                </div>
                <div
                  class="flex justify-between py-1 border-b border-slate-100"
                  v-if="book!['Nha Xb']"
                >
                  <dt class="font-medium text-slate-500">Nhà xuất bản:</dt>
                  <dd class="font-semibold text-slate-900 text-right">
                    {{ book!["Nha Xb"] }}
                  </dd>
                </div>
                <div
                  class="flex justify-between py-1 border-b border-slate-100"
                  v-if="book!['Noi Xb']"
                >
                  <dt class="font-medium text-slate-500">Nơi xuất bản:</dt>
                  <dd class="font-semibold text-slate-900 text-right">
                    {{ book!["Noi Xb"] }}
                  </dd>
                </div>
                <div
                  class="flex justify-between py-1 border-b border-slate-100"
                  v-if="book!['Nam Xb']"
                >
                  <dt class="font-medium text-slate-500">Năm xuất bản:</dt>
                  <dd class="font-semibold text-slate-900 text-right">
                    {{ book!["Nam Xb"] }}
                  </dd>
                </div>
                <div
                  class="flex justify-between py-1 border-b border-slate-100"
                  v-if="book!['So trang']"
                >
                  <dt class="font-medium text-slate-500">Số trang:</dt>
                  <dd class="font-semibold text-slate-900 text-right">
                    {{ book!["So trang"] }}
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
                  v-if="book!['So Tai san']"
                >
                  <dt class="font-medium text-slate-500">ID Tài sản:</dt>
                  <dd class="font-mono font-semibold text-primary text-right">
                    {{ book!["So Tai san"] }}
                  </dd>
                </div>
                <div
                  class="flex justify-between py-1 border-b border-slate-100"
                  v-if="book!['So Chu de']"
                >
                  <dt class="font-medium text-slate-500">Mã chủ đề:</dt>
                  <dd class="font-mono font-semibold text-slate-900 text-right">
                    {{ book!["So Chu de"] }}
                  </dd>
                </div>
                <div
                  class="flex justify-between py-1 border-b border-slate-100"
                  v-if="book!['So Tac gia']"
                >
                  <dt class="font-medium text-slate-500">Mã tác giả:</dt>
                  <dd class="font-mono font-semibold text-slate-900 text-right">
                    {{ book!["So Tac gia"] }}
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

    <SiteFooter />
  </div>
</template>
