export interface BookItem {
  "Tu dien"?: string;
  Collection?: string;
  "Tap chi"?: string;
  "Chu de Tong quat"?: string;
  "So Chu de": string;
  "So Tac gia": string;
  "So Tap"?: string;
  "So Cuon"?: string;
  "So Tai san": string;
  Tua: string;
  "Ten Tac gia": string;
  "Ho Tac gia": string;
  "Dich gia"?: string;
  "Lan Xb"?: string;
  "Noi Xb"?: string;
  "Nha Xb"?: string;
  "Nam Xb"?: string;
  "So trang"?: string;
  "Ngay nhap"?: string;
  "Ngon ngu"?: string;
  "Sach co"?: string;
  "Tinh trang": string;
  NS?: Array<any>;
}

export interface ResultEntry {
  item: BookItem;
  refIndex: number;
}
