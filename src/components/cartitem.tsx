// src/components/Cartitem.tsx

import { Heart, Minus, Plus, Trash } from "lucide-react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeItem, updateItem } from "../redux/slices/cartSlice";

interface Props {
  id: number; // ID позиции в корзине (cartItemId)
  image: string;
  title: string;
  size: string;
  price: number;
  quantity: number;
  brand: string;
}

export const Cartitem: React.FC<Props> = ({
  id,
  image,
  title,
  size,
  price,
  quantity,
  brand,
}) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  // Увеличить количество
  const handlePlus = () => {
    if (!auth.user) {
      alert("Авторизуйтесь, чтобы изменить корзину!");
      return;
    }
    dispatch(updateItem({ itemId: id, quantity: quantity + 1 }));
  };

  // Уменьшить количество
  const handleMinus = () => {
    if (!auth.user) {
      alert("Авторизуйтесь, чтобы изменить корзину!");
      return;
    }
    if (quantity > 1) {
      dispatch(updateItem({ itemId: id, quantity: quantity - 1 }));
    } else {
      // Если было 1 — удаляем товар
      dispatch(removeItem(id));
    }
  };

  // Удалить
  const handleRemove = () => {
    if (!auth.user) {
      alert("Авторизуйтесь, чтобы изменить корзину!");
      return;
    }
    dispatch(removeItem(id));
  };

  return (
    <div className="h-[130px] flex gap-20 mb-5">
      {/* Изображение товара */}
      <div className="w-[100px] h-[130px] bg-customWhite3">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Информация о товаре */}
      <div className="flex flex-col justify-between">
        <p className="text-lg font-bold font-nunito">{title}</p>
        <p className="font-Roboto font-medium text-customGray2">
          Размер: {size}
        </p>
        <p className="font-Roboto font-medium text-customGray2">
          Бренд: {brand}
        </p>

        <div className="flex gap-4">
          <Heart
            size={22}
            className="text-customGray2 hover:text-customBlack cursor-pointer"
            onClick={() => {
              if (!auth.user) {
                alert("Авторизуйтесь, чтобы добавить в избранное!");
                return;
              }
              // TODO: добавить логику избранного
            }}
          />
          <Trash
            size={22}
            className="text-customGray2 hover:text-customBlack cursor-pointer"
            onClick={handleRemove}
          />
        </div>
      </div>

      {/* Количество */}
      <div>
        <div className="flex gap-2 items-center">
          <div
            className="w-[30px] h-[33px] pt-1.5 bg-customGray rounded-lg text-center cursor-pointer"
            onClick={handleMinus}
          >
            <Minus className="m-auto" size={20} />
          </div>

          <div>{quantity}</div>

          <div
            className="w-[30px] h-[33px] pt-1.5 bg-customGray rounded-lg text-center cursor-pointer"
            onClick={handlePlus}
          >
            <Plus className="m-auto" size={20} />
          </div>
        </div>
      </div>

      {/* Цена */}
      <div className="text-3xl font-bold text-customTeal">
        {price * quantity} ₸
      </div>
    </div>
  );
};
