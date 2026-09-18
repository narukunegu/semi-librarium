import { useState } from "#imports";
import type { BookItem } from "~/types/book";

export const useResearchShelf = () => {
  const savedBooks = useState<BookItem[]>("research-shelf-books", () => {
    if (import.meta.client) {
      const stored = localStorage.getItem("semi_librarium_shelf");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          return [];
        }
      }
    }
    return [];
  });

  const toggleSaveBook = (book: BookItem) => {
    const exists = savedBooks.value.some(
      (b) => b["So Tai san"] === book["So Tai san"],
    );
    if (exists) {
      savedBooks.value = savedBooks.value.filter(
        (b) => b["So Tai san"] !== book["So Tai san"],
      );
    } else {
      savedBooks.value.push(book);
    }
    if (import.meta.client) {
      localStorage.setItem(
        "semi_librarium_shelf",
        JSON.stringify(savedBooks.value),
      );
    }
  };

  const isSaved = (id: string) => {
    return savedBooks.value.some((b) => b["So Tai san"] === id);
  };

  return {
    savedBooks,
    toggleSaveBook,
    isSaved,
  };
};
