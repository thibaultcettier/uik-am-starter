export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  currency: string;
  brand?: string;
  category?: string;
  description?: string;
  tags?: string[];
  warranty?: string;
  offer?: string | null;
  discount?: string | null;
  specifications?: {label: string; value: string}[];
}

