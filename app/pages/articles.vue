<script setup lang="ts">
// Import header & footer dùng chung toàn site
import SiteHeader from "~/components/SiteHeader.vue";
import SiteFooter from "~/components/SiteFooter.vue";
import oldTempleImg from "~/assets/images/oldtempleS.png";
useHead({
  title: "Bài Viết & Hướng Dẫn | Thư Viện Đại Chủng Viện Thánh Giuse Sài Gòn",
});
</script>
<template>
  <div
    class="min-h-screen bg-[#fafafa] font-sans text-gray-800 flex flex-col text-base"
  >
    <!-- Header chung -->
    <SiteHeader />

    <main class="max-w-6xl mx-auto px-4 py-12 flex-grow space-y-8">
      <!-- ========== Banner đầu trang (căn giữa) ========== -->
      <div
        class="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-[#e4e4e4] space-y-3 "
      >
        <span
          class="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-emerald-500/15 text-emerald-800 border border-emerald-500/30"
        >
          Góc thông tin & Bài viết
        </span>
        <h1 class="font-serif text-3xl md:text-4xl font-bold text-[#40596c]">
          Tài Liệu Hướng Dẫn & Thông Báo
        </h1>
        <p class="text-gray-600 text-base mx-auto">
          Cập nhật các hướng dẫn tra cứu, thông báo mới và tài liệu nghiên cứu
          thần học, triết học từ thư viện.
        </p>
      </div>

      <!--  2 KHUNG HƯỚNG DẪN -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

        <!-- Khung trái: Cách Mượn & Trả Sách —-->
        <div
          class="group relative flex flex-col overflow-hidden min-h-[320px]
                 shadow-md hover:shadow-xl hover:-translate-y-1
                 transition-all duration-300 ease-out rounded-xl
                 animate-slide-in-left"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-[#f7efe8] via-[#f0e4d8] to-[#e8d5c4]"
          ></div>
          <div
            class="absolute inset-0 opacity-[0.06]"
            style="background-image: radial-gradient(circle at 1px 1px, #8b6f5c 1px, transparent 0); background-size: 18px 18px;"
          ></div>

          <div class="relative z-10 flex flex-col flex-1 p-7 md:p-8">
            <div class="flex-1 space-y-3">
              <h3
                class="font-serif text-2xl md:text-3xl text-center font-bold text-[#3d2e24] mb-2">Cách Mượn & Trả Sách
              </h3>

              <p class="text-lg font-bold text-[#3d2e24] underline">Mượn Sách
              </p>
              <ul
                class="list-disc pl-5 space-y-1.5 text-base font-medium text-[#4a3b32] leading-relaxed"
              >
                <li>
                  Độc giả muốn mượn sách về cần phải có
                  <strong class="text-[#092d49]">Thẻ Thư Viện</strong>
                  của Đại Chủng Viện cấp.
                </li>
                <li>
                  Mỗi lần mượn
                  <strong class="text-[#7A1C1C]">5 cuốn</strong>, thời gian
                  mượn
                  <strong class="text-[#7A1C1C]">15 ngày</strong>. Đối với từ
                  điển và các loại sách tra cứu quý hiếm, chỉ được tham khảo
                  tại chỗ.
                </li>
              </ul>

              <p
                class="text-lg font-bold text-[#3d2e24] underline pt-1"
              >
                Trả Sách
              </p>
              <ul
                class="list-disc pl-5 space-y-1.5 text-base font-medium text-[#4a3b32] leading-relaxed"
              >
                <li>Trả ít nhất 2 cuốn trước khi mượn lại.</li>
                <li>Có thể gia hạn nếu chưa có độc giả khác cần mượn.</li>
              </ul>

              <p
                class="text-lg font-bold text-[#3d2e24] underline pt-1"
              >
                Quy Định Khác
              </p>
              <ul
                class="list-disc pl-5 space-y-1.5 text-base font-medium text-[#4a3b32] leading-relaxed"
              >
                <li>Không cho người khác mượn thẻ Thư Viện.</li>
                <li>
                  Nếu làm mất, viết, vẽ hay làm hư hỏng tác phẩm, độc giả phải
                  bồi thường với giá tiền tương đương hiện nay. Ngoại trừ
                  những tác phẩm quý, hiếm… tùy theo quyết định của Quản thủ
                  thư viện.
                </li>
                <li>
                  Độc giả không thuộc Đại Chủng Viện xin tham khảo tại chỗ.
                </li>
              </ul>

              <p
                class="text-sm font-medium text-[#5c4a3d] text-center italic pt-2"
              >
                Chân thành cảm ơn
              </p>
              <p class="text-sm font-medium text-[#5c4a3d] text-center italic">
                Ban Thư Viện
              </p>
            </div>
          </div>
        </div>

        <!-- Khung phải: Cách Tra Cứu Sách —-->
        <div
          class="group relative flex flex-col overflow-hidden min-h-[320px]
                 shadow-md hover:shadow-xl hover:-translate-y-1
                 transition-all duration-300 ease-out rounded-xl
                 animate-slide-in-right"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-[#5a5468] via-[#4a4458] to-[#3d3848]"
          ></div>
          <div
            class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"
          ></div>

          <div class="relative z-10 flex flex-col flex-1">
            <div class="px-7 md:px-8 pt-7 md:pt-8 pb-2 space-y-3">
              <h3
                class="font-serif text-center text-2xl md:text-3xl font-bold text-white mb-2"
              >
                Cách Tra Cứu Sách
              </h3>

              <p
                class="text-lg font-bold text-amber-200 underline"
              >
                Hướng dẫn
              </p>
              <ol
                class="list-decimal pl-5 space-y-2 text-base font-medium text-white/95 leading-relaxed"
              >
                <li>
                  Sách được xếp theo hệ thập phân Dewey từ 001–999.
                </li>
                <li>
                  Để xác định vị trí sách, độc giả có thể: xem bảng chỉ dẫn ở
                  mỗi kệ hoặc tra cứu trên trang
                  <strong class="text-amber-200">WEBSITE</strong>
                  của Thư Viện.
                </li>
                <li>
                  Xin đánh dấu vị trí sách đã lấy ra bằng thẻ đánh dấu vị trí.
                </li>
                <li>
                  Nếu muốn mượn sách về, xin quý độc giả ghi phiếu mượn sách và
                  đặt vào đúng vị trí sách đã lấy ra.
                </li>
                <li>
                  Xin đem sách đến quầy
                  <strong class="text-amber-200">MƯỢN TRẢ</strong>
                  để thủ thư lưu vào hồ sơ của độc giả.
                </li>
              </ol>

              <p
                class="text-sm font-medium text-white/80 text-center italic pt-3"
              >
                Chân thành cảm ơn
              </p>
              <p class="text-sm font-medium text-white/80 text-center italic">
                Ban Thư Viện
              </p>
           <div class="mt-auto w-full flex justify-center">
              <img
                :src="oldTempleImg"
                alt="Minh họa tra cứu sách"
                class="w-full max-h-[180px] md:max-h-[220px] object-contain object-bottom"
                decoding="async"
              />
            </div>
            </div>
          </div>
        </div>
      </div>

      <!--  THÔNG BÁO MỚI -->
      <div
        class="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-[#e4e4e4]
               border-l-4 border-l-[#4a4458]"
      >
        <h2
          class="font-serif text-xl underline md:text-2xl font-bold text-[#40596c] mb-4"
        >
          Thông Báo Mới
        </h2>
        <p class="text-base text-gray-700 leading-relaxed">
          Ban thư viện đang tìm cộng tác viên để thiết kế và tối ưu hóa trang
          web của thư viện. Mời quý anh em dấn thân cùng góp phần xây dựng kho
          tàng tri thức số của Đại Chủng Viện Thánh Giuse Sài Gòn.
        </p>
      </div>
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
/* Hiệu ứng chạy từ trái vào */
@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-48px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Hiệu ứng chạy từ phải vào */
@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(48px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-left {
  animation: slide-in-left 0.7s ease-out both;
}

.animate-slide-in-right {
  animation: slide-in-right 0.7s ease-out 0.12s both;
}
</style>