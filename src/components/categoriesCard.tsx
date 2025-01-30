import React from "react";

interface CategoriesCardProps {
  id: string | number;
  name: string;
  imgUrl: string;
}

export const CategoriesCard: React.FC<CategoriesCardProps> = ({
  id,
  name,
  imgUrl,
}) => {
  return (
    <div className="flex flex-col justify-center outline-customGray transition  hover:outline hover:rounded-lg hover:shadow-lg items-center p-2 hover:cursor-pointer">
      <img
        src={imgUrl}
        alt={name}
        className="w-32 h-32 object-cover rounded-full shadow-md mb-2"
      />
      <h2 className="text-lg font-semibold ">{name}</h2>
    </div>
  ); 
};
