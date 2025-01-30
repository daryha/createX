// src/App.tsx

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header";
import { Intro } from "./components/intro";
import { CategoryBanners } from "./components/categoryBanners";
import { NewArrivals } from "./components/NewArrivals";
import { StockBloks } from "./components/stockBloks";
import { Subscribe } from "./components/Subscribe";
import { Categories } from "./components/categories";
import { Footer } from "./components/footer";
import { ProductListPage } from "./components/productListPage";
import { ProductDetail } from "./components/productDetail";
import { Advantage } from "./components/advantage";
import { Cart } from "./components/cart";

import { useAppDispatch } from "./redux/hooks";
import { loadUserFromStorage } from "./redux/slices/authSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Загружаем данные пользователя из localStorage (если есть)
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Intro />
              <CategoryBanners />
              <NewArrivals />
              <StockBloks />
              <Categories />
              <Advantage />
              <Subscribe />
            </>
          }
        />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route
          path="/products/category/:categoryId"
          element={<ProductListPage />}
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
