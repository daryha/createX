import React from "react";
import { Wrapper } from "./wrapper";
import { Heart } from "lucide-react";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <footer>
        <div className="w-full h-[250px] bg-customBlack">
          <Wrapper className="flex flex-col justify-center gap-4 items-center py-10">
            <h1 className="text-customWhite uppercase">Get in touch</h1>
            <p className="text-customWhite">
              Call:
              <span className="text-customGray2"> +7 (747) 971 68 57</span>
            </p>
            <p className="text-customWhite">
              Email:{" "}
              <span className="text-customGray2"> daryha56@gmail.com</span>
            </p>
          </Wrapper>

          <Wrapper className="flex  justify-between py-5 border-t border-customGray2">
            <p className="text-customWhite flex items-center gap-1">
              © All rights reserved. Made with by{" "}
              <Heart size={17} className="text-customTeal" /> Dauren Studio{" "}
            </p>
            <p className="text-customGray2 font-bold">Go to top</p>
          </Wrapper>
        </div>
      </footer>
    </div>
  );
};
