import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchProducts } from "../redux/slices/productSlice";
import { Wrapper } from "./wrapper";
import { ProductCard } from "./productCard";
import { Product } from "./../redux/types/product";
import { useParams } from "react-router-dom";

interface Props {
  className?: string;
}

export const ProductListPage: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { categoryId } = useParams<{ categoryId: string }>();

  useEffect(() => {
    dispatch(fetchProducts(categoryId ? Number(categoryId) : undefined));
  }, [dispatch, categoryId]);

  if (loading) {
    return <div>Загрузка продуктов...</div>;
  }

  if (error) {
    return <div>Ошибка при загрузке продуктов: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div>Продукты не найдены.</div>;
  }

  return (
    <div className={className}>
      <Wrapper className="mb-[500px]">
        <div>
          <p>Название продуктов</p>
        </div>

        <div className="mb-5">
          <p>Фильтры</p>
        </div>

        <div className="grid grid-cols-5 gap-y-10" >
          
          {products.map((product: Product) => (
            
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              imageUrls={product.imageUrls}
              sizes={product.sizes}
            />
          ))}
        </div>
      </Wrapper>
    </div>
  );
};
