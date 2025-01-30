import React, { useState } from "react";
import { Wrapper } from "./wrapper";
import EmailMen from "./../assets/img/EmailMen.png";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import check from "./../assets/img/Svg/check.svg";

interface Props {
  className?: string;
}
type Category = string;

const humanCategory: Category[] = ["Women", "Men", "Girls", "Boys"];

export const Subscribe: React.FC<Props> = ({ className }) => {
  const [category, setCategory] = React.useState<Category[]>([]);

  const handleCategoryClick = (value: Category) => {
    setCategory(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) 
          : [...prev, value] 
    );
  };

  return (
    <div className={className}>
      <div className="w-full h[500px] bg-customWhite2">
        <Wrapper className="flex justify-between items-center">
          <div>
            <p className="font-extrabold text-5xl mb-[24px]">
              Subscribe for updates
            </p>
            <p className="font-medium text-xl text-customGray2 mb-[24px]">
              Subscribe for exclusive early sale access and new arrivals.
            </p>
            <ul className="flex gap-3 mb-[24px]">
              {humanCategory.map((value, index) => (
                <li
                  key={index}
                  className={`font-semibold text-customGray2 border border-customGray py-1 px-4 rounded-[4px] transition hover:cursor-pointer ${
                    category.includes(value)
                      ? "bg-customTeal text-customWhite"
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(value)}
                >
                  {value}
                </li>
              ))}
            </ul>
            <p className="mb-2">Email</p>

            <div className="flex mb-5">
              <input
                type="text"
                placeholder="Your working email"
                className="w-full h-[50px] pl-4 ring-customGray ring-1 focus:outline-none  focus:ring-customTeal  focus:ring-1 z-10"
              />
              <Button className="py-[13px]  rounded-none font-bold flex items-center relative group transition-all z-10">
                Subscribe
                <ArrowRight
                  size={19}
                  className="absolute  opacity-0 text-customTeal right-14 transition-all duration-300 group-hover:right-4 group-hover:opacity-100 "
                />
              </Button>
            </div>

            <label className="flex  items-center gap-3">
              <input
                type="checkbox"
                style={{
                  backgroundImage: `url(${check})`,
                  backgroundSize: "10px",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="appearance-none w-[15px] h-[15px]  rounded-sm border-[1px] border-customGray2 checked:bg-customTeal checked:border-none hover:cursor-pointer"
              />
              <p>I agree to receive communications from Createx Store.</p>
            </label>
          </div>

          <img src={EmailMen} alt="#EmailMen" className="p-10" />
        </Wrapper>
      </div>
    </div>
  );
};
