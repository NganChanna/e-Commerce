export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  ram: string;
  storage: string;
  image: string;
  descriptoin: string;
  warranty: string;
  compatibility: string;
  rating: number;
  review: number;
  feature: string[];
  weight: string;
  dimensions: string;
}

export interface ProductState {
  data: Product[];
  loading: boolean;
  error: string | null;
}

export const initialProductState: ProductState = {
  data: [],
  loading: false,
  error: null,
};
