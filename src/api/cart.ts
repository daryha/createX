// src/api/cart.ts
import apiClient from "./apiClient";

// 1) Получить корзину: GET /api/cart
export const fetchCart = async () => {
  const { data } = await apiClient.get("/cart");
  return data;
};

// 2) Добавить товар: POST /api/cart/add + query params
export const addItemToCart = async (productId: number, quantity: number) => {
  const { data } = await apiClient.post("/cart/add", null, {
    params: { productId, quantity },
  });
  return data;
};

// 3) Обновить: PUT /api/cart/update/:itemId?quantity=...
export const updateItemInCart = async (itemId: number, quantity: number) => {
  const { data } = await apiClient.put(`/cart/update/${itemId}`, null, {
    params: { quantity },
  });
  return data;
};

// 4) Удалить: DELETE /api/cart/remove/:itemId
export const removeItemFromCart = async (itemId: number) => {
  const { data } = await apiClient.delete(`/cart/remove/${itemId}`);
  return data;
};

// 5) Очистить: DELETE /api/cart/clear
export const clearCart = async () => {
  await apiClient.delete("/cart/clear");
};
