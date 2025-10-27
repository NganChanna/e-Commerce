// src/types/accessory.ts

export interface Accessory {
  id: number;
  name: string;
  brand: string;
  type: string;
  color: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  warranty: string;
  compatibility: string[];
  rating: number;
  review: number;
  features: string[];
  weight: string;
  dimensions: string;
}

export interface AccessoryState {
  data: Accessory[];
  loading: boolean;
  error: string | null;
}

export const initialAccessoryState: AccessoryState = {
  data: [],
  loading: false,
  error: null,
};
