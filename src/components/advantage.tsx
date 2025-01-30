import React from "react";
import { Wrapper } from "./wrapper";
import advantage from "./../assets/img/advantageImg.png";
import icCall from "./../assets/img/Svg/ic-call-center.svg";
import icCard from "./../assets/img/Svg/ic-credit-card.svg";
import icDelivery from "./../assets/img/Svg/ic-delivery.svg";
import icShield from "./../assets/img/Svg/ic-shield.svg";
import AnimatedBlock from "./ui/AnimatedBlockProps";

interface Props {
  className?: string;
}

const advantages = [
  {
    icon: icDelivery,
    title: "Fast Worldwide Shipping",
    description: "Get free shipping over $250",
  },
  {
    icon: icCall,
    title: "24/7 Customer Support",
    description: "Friendly 24/7 customer support",
  },
  {
    icon: icShield,
    title: "Money Back Guarantee",
    description: "We return money within 30 days",
  },
  {
    icon: icCard,
    title: "Secure Online Payment",
    description: "Accept all major credit cards",
  },
];

export const Advantage: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <div>
        <div className="bg-customBlack h-[300px] w-full mb-[200px]">
          <Wrapper className="flex justify-between">
            <img src={advantage} alt="img" className="-translate-y-[29px]" />
            <p className="text-customWhite mt-[60px] font-bold text-3xl">
              Enjoy mobile shopping with our Createx <br /> Store App!
            </p>
          </Wrapper>
        </div>

        <Wrapper>
          <div className="w-full h-[140px] flex justify-between mb-[200px]">
            {advantages.map(({ icon, title, description }, index) => (
              <AnimatedBlock direction="top" key={index}>
                <div
                  className={`flex flex-col items-center gap-2 w-[300px] ${
                    index !== advantages.length - 1
                      ? "border-r-[1px] border-customGray"
                      : ""
                  } px-6`}
                >
                  <img src={icon} alt={title} className="w-[48px] h-[48px]" />
                  <h2 className="font-medium text-lg">{title}</h2>
                  <p className="text-customGray2 text-sm">{description}</p>
                </div>
              </AnimatedBlock>
            ))}
          </div>
        </Wrapper>
      </div>
    </div>
  );
};
