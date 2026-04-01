import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductVariation, Coupon } from '../data/dummyData';

export interface CartItemType {
  id: string; // derived from productId + variationId
  product: Product;
  variation: ProductVariation;
  quantity: number;
}

export interface CartState {
  items: CartItemType[];
  isLoggedIn: boolean;
  selectedAddress: string | null;
  appliedCoupon: Coupon | null;
}

const initialState: CartState = {
  items: [],
  isLoggedIn: false,
  selectedAddress: null,
  appliedCoupon: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; variation: ProductVariation }>
    ) => {
      const { product, variation } = action.payload;
      const itemId = `${product.id}-${variation.id}`;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: itemId,
          product,
          variation,
          quantity: 1,
        });
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; amount: number }>
    ) => {
      const { id, amount } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = amount;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setAddress: (state, action: PayloadAction<string | null>) => {
      state.selectedAddress = action.payload;
    },
    applyCoupon: (state, action: PayloadAction<Coupon | null>) => {
      state.appliedCoupon = action.payload;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  setLogin,
  setAddress,
  applyCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
