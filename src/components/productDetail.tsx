// src/components/ProductDetail.tsx

import React from "react";
import { Wrapper } from "./wrapper";
import { ArrowRight, Car, Store } from "lucide-react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Button } from "./ui/button";
import { fetchProductById } from "../redux/slices/productSlice";
import { ProductByBrand } from "./productByBrand";
import AmazonLoader from "./ui/productSeleton";
import { addItem } from "../redux/slices/cartSlice";

interface Props {
  className?: string;
}

export const ProductDetail: React.FC<Props> = ({ className }) => {
  const [selectImg, setSelectImg] = React.useState<number>(0);
  const [hoveredImg, setHoveredImg] = React.useState<number | null>(null);
  const [message, setMessage] = React.useState("");

  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const dispatch = useAppDispatch();

  const { product, loading, error } = useAppSelector((state) => state.products);
  const auth = useAppSelector((state) => state.auth);

  // Выбор изображения по индексу
  const handleImageNumber = (index: number) => {
    setSelectImg(index);
  };
  const handleMouseLeave = () => {
    if (hoveredImg !== null) {
      setHoveredImg(hoveredImg);
    }
  };

  // Сброс индекса при смене товара
  React.useEffect(() => {
    setSelectImg(0);
    setHoveredImg(null);
  }, [product]);

  // Загружаем товар при заходе на страницу
  React.useEffect(() => {
    dispatch(fetchProductById(numericId));
    window.scrollTo(0, 0);
  }, [numericId, dispatch]);

  // Детали товара
  const details = [
    { label: "Артикул", value: product?.article },
    { label: "Состав", value: product?.composition },
    { label: "Страна производства", value: product?.countryOfManufacture },
    { label: "Рост модели", value: product?.modelHeight },
    { label: "Параметры модели", value: product?.modelMeasurements },
    { label: "Особенности модели", value: product?.modelFeatures },
    { label: "Декоративные элементы", value: product?.decorativeElements },
    { label: "Текстура материала", value: product?.materialTexture },
    { label: "Вырез горловины", value: product?.fit },
    { label: "Комплектация", value: product?.setComponents },
    { label: "Инструкции по уходу", value: product?.careInstructions },
  ];

  // Состояние загрузки
  if (loading) return <AmazonLoader />;
  if (error) return <div>Ошибка загрузки: {error}</div>;
  if (!product) return <div>Товар не найден</div>;

  // Добавить в корзину (1 штука)
  const handleAddToCart = async () => {
    // Проверяем авторизацию
    if (!auth.user) {
      setMessage("Нужно авторизоваться, чтобы добавлять товары в корзину!");
      return;
    }
    try {
      await dispatch(addItem({ productId: product.id, quantity: 1 })).unwrap();
      setMessage("Товар добавлен в корзину!");
    } catch (err) {
      setMessage("Ошибка при добавлении товара.");
    }
  };

  return (
    <div className={className}>
      <Wrapper className="flex justify-between mt-12 mb-[100px]">
        <div className="flex gap-4">
          {/* Галерея маленьких изображений */}
          <div
            className={`h-[650px] pt-2 ${
              product.imageUrls.length > 5 ? "custom-scroll direction-rtl" : ""
            }`}
          >
            {product?.imageUrls.map((url, index) => (
              <div key={index}>
                <img
                  src={url}
                  alt={`Img:${index}`}
                  className={`w-[84px] h-[110px] mb-5 rounded-xl hover:outline-2 outline-2 ${
                    hoveredImg === index || selectImg === index
                      ? "outline outline-customTeal"
                      : ""
                  }`}
                  onMouseEnter={() => handleImageNumber(index)}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            ))}
          </div>

          {/* Большое изображение */}
          <div className="w-[500px] h-[700px]">
            <img
              src={product?.imageUrls[selectImg]}
              alt=""
              className="rounded-xl transition-transform duration-300 ease-in-out"
            />
          </div>
        </div>

        {/* Блок с описанием */}
        <div className="w-[470px] h-[600px]">
          <div className="bg-customWhite2 w-fit flex items-center gap-1 p-1 px-2 rounded-md cursor-pointer mb-2">
            <p className="whitespace-nowrap text-sm">{product?.brand}</p>
            <ArrowRight size={19} className="text-customGray2" />
          </div>

          <div>
            <p className="text-2xl font-nunito font-bold mb-3 h-[70px]">
              {product?.name}
            </p>
          </div>

          {/* Пример бренда */}
          <div className="mb-5">
            <div className="flex gap-4">
              <div className="w-[65px] h-[90px] rounded">
                <ProductByBrand brand={product.brand} id={product.id} />
              </div>
            </div>
          </div>

          {/* Размеры */}
          <div>
            <p className="mb-3">Таблица размеров</p>
            <div className="flex gap-4">
              {product?.sizes.map((size, index) => (
                <div
                  key={index}
                  className="w-[50px] h-[35px] select-none text-center px-3 py-1 border border-customGray rounded-md mb-12"
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Детали */}
          <div className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-3 text-sm font-sans text-gray-800">
            {details.map((detail, index) => (
              <React.Fragment key={index}>
                <div className="flex items-start w-[200px] whitespace-nowrap">
                  <p className="text-customGray2">{detail.label}</p>
                  <span className="border-[0.5px] w-full mt-4 ml-4 border-dashed border-customGray"></span>
                </div>
                <div>
                  <p className="text-gray-600 w-[200px]">{detail.value}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Блок с ценой и кнопкой */}
        <div className="w-[340px] h-[250px] rounded-xl shadow-custom-card p-5">
          <p className="text-4xl text-customTeal font-semibold font-Roboto mb-5">
            {product?.price} ₸
          </p>
          <div className="text-center mb-5">
            <Button className="w-[300px] rounded-2xl" onClick={handleAddToCart}>
              Добавить в корзину
            </Button>
          </div>
          {/* Сообщение об успехе / ошибке */}
          {message && (
            <p className="mb-4 text-center text-red-500">{message}</p>
          )}

          <p className="flex gap-3 mb-2 items-center">
            <Store className="text-customGray2" size={20} />
            {product?.brand}
          </p>
          <p className="flex gap-3 items-center">
            <Car className="text-customGray2" size={20} />
            Товар доступен к отправке
          </p>
        </div>
      </Wrapper>
    </div>
  );
};
