import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";
import timerReducer from "./slices/timerSlice";
import { userReducer } from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice"; // Импорт слайса корзины

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
    timer: timerReducer,
    user: userReducer,
    auth: authReducer,
    cart: cartReducer, // Подключаем слайс корзины
  },
});

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
