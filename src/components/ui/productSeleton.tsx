import React from "react";
import ContentLoader from "react-content-loader";

const AmazonLoader = () => (
  <ContentLoader
    speed={2}
    width={1920} // Исправленная общая ширина
    height={800} // Высота остаётся прежней
    viewBox="0 0 1920 800"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    {/* Миниатюры изображений (высота 600px, ширина миниатюры 84px x 110px) */}
    <rect x="210" y="50" rx="10" ry="10" width="84" height="110" />
    <rect x="210" y="190" rx="10" ry="10" width="84" height="110" />
    <rect x="210" y="330" rx="10" ry="10" width="84" height="110" />
    <rect x="210" y="470" rx="10" ry="10" width="84" height="110" />

    {/* Основное изображение (ширина 526px x высота 700px) */}
    <rect x="310" y="50" rx="10" ry="10" width="526" height="700" />

    {/* Название бренда */}
    <rect x="860" y="50" rx="5" ry="5" width="100" height="20" />

    {/* Название продукта */}
    <rect x="860" y="100" rx="5" ry="5" width="400" height="40" />

    {/* Миниатюра продукта (ширина 65px x высота 90px) */}
    <rect x="666" y="110" rx="5" ry="5" width="65" height="90" />

    {/* Таблица размеров */}
    <rect x="860" y="310" rx="5" ry="5" width="50" height="35" />
    <rect x="930" y="310" rx="5" ry="5" width="50" height="35" />
    <rect x="1000" y="310" rx="5" ry="5" width="50" height="35" />
    <rect x="1070" y="310" rx="5" ry="5" width="50" height="35" />

    {/* Характеристики (ширина 200px x высота 20px, с отступами) */}

    <rect x="860" y="400" rx="5" ry="5" width="300" height="20" />
    <rect x="860" y="430" rx="5" ry="5" width="300" height="20" />
    <rect x="860" y="460" rx="5" ry="5" width="300" height="20" />
    <rect x="860" y="490" rx="5" ry="5" width="300" height="20" />
    <rect x="860" y="520" rx="5" ry="5" width="300" height="20" />
    <rect x="860" y="550" rx="5" ry="5" width="300" height="20" />
    <rect x="860" y="580" rx="5" ry="5" width="300" height="20" />
    <rect x="860" y="610" rx="5" ry="5" width="300" height="20" />
    <rect x="860" y="640" rx="5" ry="5" width="300" height="20" />
    <rect x="860" y="670" rx="5" ry="5" width="300" height="20" />
    <rect x="860" y="700" rx="5" ry="5" width="300" height="20" />
    <rect x="860" y="730" rx="5" ry="5" width="300" height="20" />




    {/* Дополнительная информация (ширина 340px x высота 250px) */}
    <rect x="1360" y="40" rx="10" ry="10" width="340" height="250" />
  </ContentLoader>
);

export default AmazonLoader;
