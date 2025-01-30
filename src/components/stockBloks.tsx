import React from "react";
import bannerWomen from "./../assets/img/Stok_img/women2.png";
import bannerMen from "./../assets/img/Stok_img/men.png";
import bannerMakasin from "./../assets/img/Stok_img/makasin.png";
import bannerHuman from "./../assets/img/Stok_img/image.png";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./../redux/store";
import { updateTimeLeft } from "./../redux/slices/timerSlice";
import AnimatedBlock from "./ui/AnimatedBlockProps";

interface Props {
  className?: string;
}

export const StockBloks: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const timeLeft = useSelector((state: RootState) => state.timer);

  React.useEffect(() => {
    const timer = setInterval(() => {
      dispatch(updateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <div className={"flex"}>
      <div className="mx-auto">
        <div className="flex gap-[16px] mb-[16px]">
          <AnimatedBlock direction="top">
            <div
              style={{ backgroundImage: `url(${bannerWomen})` }}
              className="w-[735px] h-[500px]"
            >
              <div className="px-14 py-14">
                <p className="font-Lato text-sm font-bold uppercase text-customBlack mb-4">
                  Summer Collections
                </p>
                <h1 className="font-Lato text-4xl font-bold mb-14 text-customBlack">
                  Sale Up to 70%
                </h1>
                <Button
                  variant="secondary"
                  className="rounded-md py-[12px] font-bold "
                >
                  Explore new prices
                </Button>
              </div>
            </div>
          </AnimatedBlock>
          <AnimatedBlock direction="right">
            <div
              style={{ backgroundImage: `url(${bannerMen})` }}
              className="w-[1109px] h-[500px]"
            >
              <div className="px-14 py-14">
                <p className="font-Lato text-sm font-bold uppercase text-customBlack mb-4">
                  Deal of the week
                </p>
                <h1 className="font-Lato text-4xl font-bold mb-10 max-w-[350px] leading-[50px] text-customBlack">
                  Stay Warm With Our New Sweater
                </h1>
                <Button
                  variant="secondary"
                  className="rounded-md py-[12px] font-bold "
                >
                  Shop now
                </Button>
              </div>

              <div className="px-14 mt-6">
                <p className="font-Lato text-sm font-bold uppercase text-customBlack mb-4">
                  Limited time offer
                </p>

                <div className="flex gap-6">
                  {[
                    { value: timeLeft.days, label: "Days" },
                    { value: timeLeft.hours, label: "Hours" },
                    { value: timeLeft.minutes, label: "Mins" },
                    { value: timeLeft.seconds, label: "Sec" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="w-[33px] flex flex-col justify-center items-center text-customBlack"
                    >
                      <p
                        className="font-Lato font-bold text-3xl"
                        text-customBlack
                      >
                        {item.value}
                      </p>
                      <p className="text-md ">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedBlock>
        </div>
        <div className="flex  gap-[16px]  mb-[150px] ">
          <AnimatedBlock direction="left">
            <div
              style={{ backgroundImage: `url(${bannerMakasin})` }}
              className="w-[1109px] h-[500px]"
            >
              <div className="px-14 py-14">
                <p className="font-Lato text-sm font-bold uppercase text-customBlack mb-4">
                  New collection
                </p>
                <h1 className="font-Lato text-4xl font-bold mb-14 max-w-[400px] leading-[50px] text-customBlack">
                  Shoes & Bags autumn / winter 2020
                </h1>

                <Button
                  variant="secondary"
                  className="rounded-md py-[12px] font-bold flex items-center relative group transition-all"
                >
                  See offers
                  <ArrowRight
                    size={19}
                    className="absolute opacity-0 text-customWhite right-14 transition-all duration-300 group-hover:right-4 group-hover:opacity-100 "
                  />
                </Button>
              </div>
            </div>
          </AnimatedBlock>
          <AnimatedBlock direction="bottom">
            <div
              style={{
                backgroundImage: `url(${bannerHuman})`,
                backgroundPosition: "right bottom",
                backgroundRepeat: "no-repeat",
              }}
              className="w-[735px] h-[500px] bg-customGray relative"
            >
              <div className="px-14 py-14">
                <p className="font-Lato text-sm font-bold uppercase text-customBlack mb-4">
                  For All new Email Subscribers
                </p>
                <h1 className="font-Lato text-4xl font-bold mb-14 leading-[50px] text-customBlack">
                  Get 5% Off & Free Delivery
                </h1>

                <div className="flex w-[360px]">
                  <input
                    type="text"
                    placeholder="Your working email"
                    className="w-full h-[50px] pl-4  focus:outline-none  focus:ring-customTeal focus:ring-1 z-10"
                  />
                  <Button className="py-[13px]  rounded-none font-bold flex items-center relative group transition-all z-10">
                    Subscribe
                    <ArrowRight
                      size={19}
                      className="absolute  opacity-0 text-customTeal right-14 transition-all duration-300 group-hover:right-4 group-hover:opacity-100 "
                    />
                  </Button>
                </div>
                <p className="mt-6 text-md font-bold ">
                  *Sign up to be the first to hear <br /> about exclusive deals
                </p>
              </div>
              <img
                src={bannerHuman}
                alt="men"
                className="absolute block right-0 bottom-0 -z-20 max-w-[50%] max-h-[100%] object-contain"
              />
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </div>
  );
};
