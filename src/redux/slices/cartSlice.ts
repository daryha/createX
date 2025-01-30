// src/redux/slices/cartSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCart,
  addItemToCart,
  removeItemFromCart,
  updateItemInCart,
} from "../../api/cart";

// Типизация одной позиции в корзине
interface CartItem {
  id: number; // ID самой позиции в корзине (cartItemId)
  product: {
    id: number; // ID продукта
    name: string;
    image: string;
    size: string;
    price: number;
    brand: string;
  };
  quantity: number;
}

// Состояние корзины
interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  status: "idle" | "loading" | "failed";
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  status: "idle",
};

// Получить корзину с сервера
export const getCart = createAsyncThunk("cart/getCart", async () => {
  const response = await fetchCart();
  // Ожидаем, что вернётся объект { items: [...] }
  return response;
});

// Добавить товар
export const addItem = createAsyncThunk(
  "cart/addItem",
  async ({ productId, quantity }: { productId: number; quantity: number }) => {
    const response = await addItemToCart(productId, quantity);
    return response; // Ожидаем { items: [...] }
  }
);

// Удалить товар
export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (itemId: number) => {
    const response = await removeItemFromCart(itemId);
    return response; // Ожидаем { items: [...] }
  }
);

// Обновить количество
export const updateItem = createAsyncThunk(
  "cart/updateItem",
  async ({ itemId, quantity }: { itemId: number; quantity: number }) => {
    const response = await updateItemInCart(itemId, quantity);
    return response; // Ожидаем { items: [...] }
  }
);

// Подсчёт итоговых сумм
const calculateTotals = (items: CartItem[]) => {
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  return { totalQuantity, totalPrice };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ---------------- GET CART ----------------
    builder.addCase(getCart.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.items = action.payload.items;
      const { totalQuantity, totalPrice } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      state.status = "idle";
    });
    builder.addCase(getCart.rejected, (state) => {
      state.status = "failed";
    });

    // ---------------- ADD ITEM ----------------
    builder.addCase(addItem.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addItem.fulfilled, (state, action) => {
      state.items = action.payload.items;
      const { totalQuantity, totalPrice } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      state.status = "idle";
    });
    builder.addCase(addItem.rejected, (state) => {
      state.status = "failed";
    });

    // ---------------- REMOVE ITEM ----------------
    builder.addCase(removeItem.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(removeItem.fulfilled, (state, action) => {
      state.items = action.payload.items;
      const { totalQuantity, totalPrice } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      state.status = "idle";
    });
    builder.addCase(removeItem.rejected, (state) => {
      state.status = "failed";
    });

    // ---------------- UPDATE ITEM ----------------
    builder.addCase(updateItem.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateItem.fulfilled, (state, action) => {
      state.items = action.payload.items;
      const { totalQuantity, totalPrice } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      state.status = "idle";
    });
    builder.addCase(updateItem.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default cartSlice.reducer;
