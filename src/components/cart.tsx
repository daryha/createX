// src/components/Cart.tsx

import React, { useEffect } from "react";
import { Wrapper } from "./wrapper";
import { Cartitem } from "./cartitem";
import { Button } from "./ui/button";
import { Car } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getCart } from "../redux/slices/cartSlice";

interface Props {
  className?: string;
}

export const Cart: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { items, totalQuantity, totalPrice } = useAppSelector(
    (state) => state.cart
  );

  // При загрузке компонента тянем корзину
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div className="bg-customWhite3 h-[80vh] pt-10">
      <Wrapper>
        <div className="flex justify-between">
          {/* Список товаров */}
          <div className="w-[1024px] rounded-2xl pl-10 pt-5 bg-customWhite shadow-xl">
            <h1 className="text-customBlack text-4xl font-bold mb-4">
              Корзина
            </h1>
            <p className="font-semibold text-customGray2">
              {totalQuantity} {totalQuantity === 1 ? "товар" : "товара"}
            </p>

            <div className="mt-10 flex flex-col gap-10">
              {items.length > 0 ? (
                items.map((item) => (
                  <Cartitem
                    key={item.id}
                    // Важно: передаём cartItemId в "id"
                    id={item.id}
                    image={item.product.image}
                    title={item.product.name}
                    size={item.product.size}
                    price={item.product.price}
                    quantity={item.quantity}
                    brand={item.product.brand}
                  />
                ))
              ) : (
                <p className="text-customGray2 text-lg">Ваша корзина пуста.</p>
              )}
            </div>
          </div>

          {/* Информация о заказе */}
          <div className="w-[380px] h-[250px] bg-customWhite rounded-xl shadow-custom-card p-5">
            <div className="flex justify-between items-center mb-2">
              <p className="text-customGray2 font-medium">
                Товары: {totalQuantity} шт.
              </p>
              <p className="text-customGray2 font-medium">{totalPrice} ₸</p>
            </div>
            <div className="flex justify-between">
              <p className="text-3xl font-medium">Итого</p>
              <p className="text-4xl text-customTeal font-semibold mb-7">
                {totalPrice} ₸
              </p>
            </div>
            <div className="text-center mb-5">
              <Button className="w-[330px] rounded-2xl">
                <span className="font-Roboto font-semibold text-lg">
                  Заказать
                </span>
              </Button>
            </div>

            <p className="flex gap-3 items-center">
              <Car className="text-customGray2" size={20} />
              Товар доступен к отправке
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
