import React from "react";
import niga from "./../assets/img/niga.png";
import women from "./../assets/img/women.png";
import kid from "./../assets/img/kid.png";
import { Wrapper } from "./wrapper";

interface Props {
  className?: string;
}

export const CategoryBanners: React.FC<Props> = ({ className }) => {
  return (
    <div className={`${className} `}>
      <Wrapper>
        <div className="relative -mt-20 md:-mt-32 lg:-mt-[70px]  flex justify-center gap-8  md:gap-12">
          <div className="flex flex-col items-center size-[300px] transition duration-700 hover:scale-110 hover:cursor-pointer">
            <img
              src={women}
              alt="women"
              className=" rounded-lg shadow-lg object-cover"
            />
            <p className="font-Lato text-center mt-3">Women’s</p>
          </div>

          <div className="flex flex-col items-center size-[300px] transition duration-700 hover:scale-110 hover:cursor-pointer">
            <img
              src={niga}
              alt="men"
              className=" rounded-lg shadow-lg object-cover"
            />
            <p className="font-Lato text-center mt-3">Men’s</p>
          </div>

          <div className="flex flex-col items-center size-[300px] transition duration-700 hover:scale-110 hover:cursor-pointer">
            <img
              src={kid}
              alt="kids"
              className=" rounded-lg shadow-lg object-cover"
            />
            <p className="font-Lato text-center mt-3">Kids’</p>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
