import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "./../types/product";
import { ProductCard } from "../../components/productCard";

// Fetch all products or by category
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (categoryId?: number) => {
    const url = categoryId
      ? `http://localhost:8080/api/products/by-category/${categoryId}`
      : `http://localhost:8080/api/products`;
    const response = await axios.get<Product[]>(url);
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById", // Уникальный идентификатор
  async (id: number) => {
    // Ожидаем `id` как аргумент
    const response = await fetch(`http://localhost:8080/api/products/${id}`); // Ваш API для получения продукта
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return response.json(); // Возвращаем JSON-ответ
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [] as Product[],
    product: null as Product | null, // Для конкретного продукта
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при загрузке продуктов";
      })

      // Fetch a single product
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = null; // Очищаем предыдущий продукт перед загрузкой
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при загрузке продукта";
      });
  },
});

export default productSlice.reducer;
