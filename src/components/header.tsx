import React from "react";
import cn from "classnames";
import { Wrapper } from "./wrapper";
import logo from "./../assets/img/logo.png";
import SearchInput from "./searchInput";
import { ArrowDown, CircleUser, Heart, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { AuthWindow } from "./auth/authWindow";
import { RegisterWindow } from "./auth/registerWindow";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const [isOpenPopup, setIsOpenPopup] = React.useState<boolean>(false);
  const [isOpenPopupReg, setIsOpenPopupReg] = React.useState<boolean>(false);
  const [logoutPopup, setLogoutPopup] = React.useState<boolean>(false);

  // Получаем имя пользователя и состояние аутентификации из Redux
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const openLogoutPopup = () => {
    setLogoutPopup(true);
  };
  const closeLogoutPopup = () => {
    setLogoutPopup(false);
  };

  const openPopup = () => {
    setIsOpenPopup(true);
  };

  const closePopup = () => {
    setIsOpenPopup(false);
  };

  const openPopupReg = () => {
    setIsOpenPopupReg(true);
  };

  const closePopupReg = () => {
    setIsOpenPopupReg(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={cn(className)}>
      <div className="bg-customBlack w h-12 pt-3">
        <Wrapper className="">
          <div className=" flex justify-between  ">
            <p className="text-customGray3">
              поддержка 24/7
              <span className="ml-10 text-customGray3 hover:text-customWhite  duration-300">
                номер: +7 747 971 6857
              </span>
            </p>

            <div className="flex gap-2 items-center group">
              <CircleUser
                size={23}
                strokeWidth={1.5}
                className="text-customGray3 group-hover:text-customWhite  duration-300 cursor-pointer "
              />
              {user ? (
                <>
                  <p
                    className="text-customGray3 group-hover:text-customWhite  duration-300 cursor-pointer"
                    onClick={openLogoutPopup}
                  >
                    <div className="flex items-center h-120px">
                      {user.name} <ArrowDown width={20} />
                    </div>
                  </p>
                </>
              ) : (
                <p
                  className="text-customGray3 group-hover:text-customWhite  duration-300 cursor-pointer"
                  onClick={openPopup}
                >
                  войти / регистрация
                </p>
              )}
            </div>

            {logoutPopup && (
              <div className="bg-customWhite w-[125px] h-[40px] absolute top-[50px] right-[210px] p-2 rounded-lg shadow-xl outline outline-customGray ">
                <p
                  className="text-customRed  hover:cursor-pointer"
                  onClick={() => {
                    closeLogoutPopup();
                    handleLogout();
                  }}
                >
                  Выйти
                </p>
              </div>
            )}
          </div>
        </Wrapper>
      </div>
      <Wrapper className="flex items-center justify-between py-8">
        {/* Лево */}
        <div className="flex gap-20">
          <NavLink to={"/"}>
            <img src={logo} alt="logo" />
          </NavLink>

          <ul className="flex gap-4 font-nunito font-medium text-[16px] hover:cursor-pointer">
            <li className="link-item">New arrivals</li>
            <li className="link-item">New collection</li>
            <li className="link-item">Popular categories</li>
            <li className="link-item">Subscribe </li>
          </ul>
        </div>

        <SearchInput />

        {/* Право */}
        <div className="flex items-center ">
          <div className="flex gap-5">
            <div className="flex justify-between gap-3 items-center">
              <div className="flex gap-2 items-center">
                <Heart strokeWidth={1.5} size={20} />
                <p>11</p>
              </div>
              <span className="w-[1px] h-6 bg-customTeal"></span>
              <div className="flex gap-2 items-center">
                <ShoppingCart strokeWidth={1.5} size={20} />
                <p className="bg-customGreen w-7 text-customWhite flex justify-center rounded">
                  22
                </p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>

      <div className="w h-10 bg-customTeal text-customWhite flex justify-center items-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
      </div>

      {isOpenPopup && (
        <AuthWindow
          isOpen={isOpenPopup}
          onClose={closePopup}
          openPopupReg={openPopupReg}
        />
      )}
      <RegisterWindow
        isOpen={isOpenPopupReg}
        onClose={closePopupReg}
        openPopup={openPopup}
      />
    </header>
  );
};
