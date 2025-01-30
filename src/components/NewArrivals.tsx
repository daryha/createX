import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchProducts } from "../redux/slices/productSlice";
import { Wrapper } from "./wrapper";
import { ProductCard } from "./productCard";

interface Props {
  className?: string;
}

export const NewArrivals: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);



  return (
    <div className={className}>
      <Wrapper>
        <div className="flex-col text-center mt-[180px] mb-[100px]">
          <div>
            <h2 className="text-3xl font-extrabold font-Lato mb-[30px]">
              New arrivals
            </h2>
            <p className="text-lg mb-[10px] font-Lato text-customGray2">
              Check out our latest arrivals for the upcoming season.
            </p>
            <a href="#" className="font-Lato text-customTeal underline">
              See the collection here
            </a>
          </div>
        </div>
      </Wrapper>

      <div className="mb-[200px] w-1200px flex gap-8  justify-center">
        {products.slice(0, 6).map((product) => (
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
    </div>
  );
};
