// src/components/ProductCard.tsx
import React from "react";
import { Heart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchProductById } from "../redux/slices/productSlice";

interface Props {
  className?: string;
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrls: string[];
  sizes: string[];
}

export const ProductCard: React.FC<Props> = ({
  id,
  className,
  name,
  price,
  description,
  imageUrls,
  sizes,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | null>(
    null
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleMouseEnter = () => {
    let index = currentIndex;
    const id = setInterval(() => {
      index = (index + 1) % imageUrls.length; // Перебор изображений
      setCurrentIndex(index);
    }, 1000); // Интервал смены изображений
    setIntervalId(id);
  };

  const handleMouseLeave = () => {
    if (intervalId) {
      clearInterval(intervalId); // Остановка интервала
      setIntervalId(null);
    }
    setCurrentIndex(0); // Сброс на первое изображение
  };

  const handelCardClick = () => {
    dispatch(fetchProductById(id));
  };

  return (
    <NavLink to={`/product/${id}`} onClick={handelCardClick}>
      <div
        className="flex-col gap-10 h-max size-[250px] p-3 transition hover:rounded-xl hover:shadow-xl hover:cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative">
          <img
            src={imageUrls[currentIndex]}
            alt={name}
            className="mb-5 rounded-md shadow-md w-full h-[301px] object-cover"
          />
          <div className="group absolute bottom-2 right-3 rounded-full flex items-center justify-center w-[25px] h-[25px] bg-customWhite transition-transform transform hover:scale-125">
            <Heart
              size={17}
              width={17}
              color="#787A80"
              className="w-max h-max cursor-pointer group-hover:fill-customTeal group-hover:stroke-none transition-colors"
            />
          </div>
        </div>
        <p className="font-Lato font-semibold text-customGray2 min-h-[70px]">
          {name}
        </p>
        <p className="font-Lato font-bold mt-2">{price.toFixed(2)} ₸</p>

        <div className="flex items-center gap-1">
          <p className="font-Lato text-sm text-customGray2">Sizes:</p>
          <p className="font-Lato font-bold  text-sm h-[24px] flex items-center  text-customGray2">
            {sizes.join(" | ")}
          </p>
        </div>
      </div>
    </NavLink>
  );
};
