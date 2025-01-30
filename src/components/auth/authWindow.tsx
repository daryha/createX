import React, { useState } from "react";
import AnimatedBlock from "../ui/AnimatedBlockProps";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  openPopupReg: () => void;
}

export const AuthWindow: React.FC<Props> = ({
  className,
  isOpen,
  onClose,
  openPopupReg,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const openRegWindow = () => {
    openPopupReg();
    onClose();
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка входа.");
      }

      const data = await response.json();

      
      dispatch(loginSuccess({ token: data.token, user: { name: username } }));
      alert("Вы успешно вошли!");

      onClose(); 
    } catch (err: any) {
      setError(err.message || "Произошла ошибка.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "visible" : "hidden"
      }`}
    >
      <div
        className="absolute inset-0 bg-customBlack bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <AnimatedBlock direction="top">
        <div
          className={`w-[500px] h-[700px] bg-customWhite m-auto mt-auto rounded-xl shadow-xl border border-customGray z-10 relative p-10`}
        >
          <p className="text-2xl font-Lato font-semibold text-center mb-5">
            Войти
          </p>

          <p className="text-customGray2 text-center mb-10">
            Войдите в свою учетную запись, используя логин и пароль, указанные
            при регистрации.
          </p>

          <div className="relative w-full max-w-sm mx-auto flex flex-col gap-4">
            <p className="text-lg">Логин</p>
            <input
              type="text"
              placeholder="Ваш логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-4 pr-4 py-2 border border-customGray rounded-lg focus:outline-none focus:ring-1 focus:ring-customTeal focus:border-transparent"
            />

            <p className="text-lg ">Пароль</p>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-4 pr-4 py-2 border border-customGray rounded-lg focus:outline-none focus:ring-1 focus:ring-customTeal focus:border-transparent"
            />

            <button
              onClick={handleLogin}
              disabled={isSubmitting}
              className="w-full bg-customTeal text-white py-2  mt-5 text-customWhite "
            >
              {isSubmitting ? "Входим..." : "Войти"}
            </button>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            <p className="mt-5">
              Вы не зарегистрированы?{" "}
              <span
                className="text-customTeal underline cursor-pointer"
                onClick={openRegWindow}
              >
                Регистрация
              </span>
            </p>
          </div>
        </div>
      </AnimatedBlock>
    </div>
  );
};
