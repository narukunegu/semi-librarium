import { useState } from '#imports'

export interface BookItem {
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
  NS: Array<any>;
}

export const useResearchShelf = () => {
  const savedBooks = useState<BookItem[]>('research-shelf-books', () => {
    if (import.meta.client) {
      const stored = localStorage.getItem('semi_librarium_shelf');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          return [];
        }
      }
    }
    return [];
  })

  const toggleSaveBook = (book: BookItem) => {
    const exists = savedBooks.value.some(b => b["So Tai san"] === book["So Tai san"]);
    if (exists) {
      savedBooks.value = savedBooks.value.filter(b => b["So Tai san"] !== book["So Tai san"]);
    } else {
      savedBooks.value.push(book);
    }
    if (import.meta.client) {
      localStorage.setItem('semi_librarium_shelf', JSON.stringify(savedBooks.value));
    }
  }

  const isSaved = (id: string) => {
    return savedBooks.value.some(b => b["So Tai san"] === id);
  }

  return {
    savedBooks,
    toggleSaveBook,
    isSaved
  }
}
