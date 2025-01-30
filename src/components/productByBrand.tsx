import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchProductById, fetchProducts } from "../redux/slices/productSlice";
import { NavLink } from "react-router-dom";

interface Props {
  className?: string;
  brand: string;
  id: number;
}

export const ProductByBrand: React.FC<Props> = ({ className, brand, id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const filterBrand = products.filter(
    (product) => product.brand === brand && product.id !== id
  );

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="flex gap-3">
      {filterBrand.map((product) => (
        <NavLink key={product.id} to={`/product/${product.id}`}>
          <div className="w-[75px] ">
            {product.imageUrls && product.imageUrls.length > 0 ? (
              <img src={product.imageUrls[0]} alt={product.name} className="rounded-xl transition-transform hover:scale-105 " />
            ) : (
              <p>Нет изображения</p>
            )}
          </div>
        </NavLink>
      ))}
    </div>
  );
};
