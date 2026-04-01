export interface ProductVariation {
  id: string;
  weight: string;
  price: number;
  originalPrice: number;
  inStock: boolean;
  savingsIndicator?: string;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  image: string;
  description: string;
  variations: ProductVariation[];
}

export interface Coupon {
  id: string;
  code: string;
  discountValue: string;
  title: string;
  subtitle: string;
}

// Mock Data

export const MOCK_PRODUCT: Product = {
  id: 'p1',
  brand: 'Tata Tea',
  name: 'Gold Premium Assam Tea Rich in Aroma',
  image: 'https://images.unsplash.com/photo-1571212879685-303c6239f606?q=80&w=600&auto=format&fit=crop', // Temporary placeholder
  description:
    'Enjoy the rich aroma and strong taste of Tata Tea Gold Premium Assam Tea. Carefully selected tea leaves from the finest gardens of Assam to bring you a perfect cup of tea',
  variations: [
    {
      id: 'v1',
      weight: '1 kg',
      price: 444,
      originalPrice: 925,
      inStock: true,
      savingsIndicator: '52% OFF',
    },
    {
      id: 'v2',
      weight: '500 g',
      price: 240,
      originalPrice: 480,
      inStock: true,
      savingsIndicator: '50% OFF',
    },
    {
      id: 'v3',
      weight: '250 g',
      price: 130,
      originalPrice: 200,
      inStock: false,
    },
  ],
};

export const MOCK_SIMILAR_PRODUCTS: Product[] = [
  {
    id: 'p2',
    brand: 'Tata Tea',
    name: 'Gold Premium Assam Tea Rich',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8c0a1?q=80&w=300&auto=format&fit=crop',
    description: '',
    variations: [{ id: 'v2_1', weight: '1 kg', price: 444, originalPrice: 925, inStock: true }],
  },
  {
    id: 'p3',
    brand: 'Tata Tea',
    name: 'Gold Premium Assam Tea Rich',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=300&auto=format&fit=crop',
    description: '',
    variations: [{ id: 'v3_1', weight: '1 kg', price: 444, originalPrice: 925, inStock: true }],
  },
  {
    id: 'p4',
    brand: 'Tata Tea',
    name: 'Organic apple',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?q=80&w=300&auto=format&fit=crop',
    description: '',
    variations: [{ id: 'v4_1', weight: '1 kg', price: 444, originalPrice: 925, inStock: true }],
  },
];

export const MOCK_COUPONS: Coupon[] = [
  {
    id: 'c1',
    code: 'ABCDEFGHI',
    title: '₹250 OFF',
    subtitle: 'Upto ₹120 on orders above ₹1200',
    discountValue: '250',
  },
  {
    id: 'c2',
    code: 'ABCDEFGHJ',
    title: '6% OFF',
    subtitle: 'Upto ₹120 on orders above ₹1200',
    discountValue: '120',
  },
];
