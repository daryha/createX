import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { CategoriesCard } from "./categoriesCard";
import { fetchCategory } from "../redux/slices/categorySlice";

interface Props {
  className?: string;
}

export const Categories: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, categories } = useSelector(
    (state: RootState) => state.categories
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/products/category/${categoryId}`);
  };

  return (
    <div className={className}>
      <div className="mb-[300px]">
        <h1 className="text-center text-5xl font-bold text-customBlack mb-16">
          Popular categories
        </h1>

        {/* Отображение категорий */}
        <div className="flex justify-center gap-12">
          {categories?.slice(0, 6).map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              <CategoriesCard
                key={category.id}
                id={category.id}
                name={category.name}
                imgUrl={category.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
