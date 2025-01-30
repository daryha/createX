import React from "react";
import { Wrapper } from "./wrapper";
import { Button } from "./ui/button";
import bannerImage from "../assets/img/Man.png";

interface Props {
  className?: string;
}

export const Intro: React.FC<Props> = ({ className }) => {
  return (
    <div>
      <div
        className={`${className} relative w-full h-[800px] bg-cover bg-center`}
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <Wrapper>
          <div className="pt-[140px]">
            <p className="text-customBlack font-nunito font-bold text-xl">
              NEW COLLCTION
            </p>
            <h1 className="text-customBlack font-Lato font-extrabold text-7xl mt-10 ">
              Menswear 2024
            </h1>

            <div className="flex gap-4  w-[410px] mt-[100px]">
              <Button variant="secondary">Shop sale</Button>
              <Button variant="primary">Shop the menswear</Button>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};
