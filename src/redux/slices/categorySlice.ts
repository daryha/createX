import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from ".././types/category";

export const fetchCategory = createAsyncThunk<Category[]>(
  "categories/fetchCategories",
  async () => {
    const response = await fetch("http://localhost:8080/api/categories");
    if (!response.ok) {
      throw new Error("Ошибка при получении категорий");
    }

    return await response.json();
  }
);

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true; // Устанавливаем загрузку
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false; // Сбрасываем загрузку
        state.categories = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false; // Сбрасываем загрузку
        state.error = action.error.message || "Ошибка";
      });
  },
});

export default categorySlice.reducer;
