export type SearchCriteria = 'lowest' | 'highest' | 'average' | 'all';

export interface Category {
  id: string;
  name: string;
}

export interface SellerReputation {
  level_id: string;
  power_seller_status: string | null;
}

export interface Seller {
  nickname: string;
  seller_reputation?: SellerReputation;
}

export interface ProductAttribute {
  id: string;
  name: string;
  value_name: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  permalink: string;
  seller: Seller;
  attributes: ProductAttribute[];
  category_id?: string;
}

export interface ChartDataPoint {
  name: string;
  precio: number;
}