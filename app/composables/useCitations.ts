import { computed, type Ref } from "vue";
import type { BookItem } from "~/types/book";

export const useCitations = (book: Ref<BookItem | null>) => {
  const citationAPA = computed(() => {
    if (!book.value) return "";
    const item = book.value;
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
    if (!book.value) return "";
    const item = book.value;
    const author =
      `${item["Ho Tac gia"] || ""}, ${item["Ten Tac gia"] || ""}`.trim();
    const title = item["Tua"] || "Không rõ tên sách";
    const publisher = item["Nha Xb"] || "";
    const year = item["Nam Xb"] || "";
    return `${author}. <em>${title}</em>. ${publisher}, ${year}.`;
  });

  const citationChicago = computed(() => {
    if (!book.value) return "";
    const item = book.value;
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
    if (!book.value) return "";
    const item = book.value;
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

  return {
    citationAPA,
    citationMLA,
    citationChicago,
    citationTurabian,
  };
};
