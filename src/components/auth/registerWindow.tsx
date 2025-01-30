import React, { useState } from "react";
import AnimatedBlock from "../ui/AnimatedBlockProps";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./../../redux/store";
import { registerUser } from "../../redux/slices/userSlice";

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  openPopup: () => void;
}

export const RegisterWindow: React.FC<Props> = ({
  className,
  isOpen,
  onClose,
  openPopup,
}) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.user);

  if (!isOpen) return null;

  const validateFields = () => {
    const newErrors: string[] = [];

    if (!email) {
      newErrors.push("Email обязателен.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.push(
        "Введите корректный email (должен содержать '@' и домен)."
      );
    }

    if (!username) {
      newErrors.push("Логин обязателен.");
    } else if (username.length < 4) {
      newErrors.push("Логин должен быть не менее 4 символов.");
    }

    if (!password) {
      newErrors.push("Пароль обязателен.");
    } else if (password.length < 8) {
      newErrors.push("Пароль должен быть не менее 8 символов.");
    }

    if (password !== confirmPassword) {
      newErrors.push("Пароли не совпадают.");
    }

    return newErrors;
  };

  const handleRegister = async () => {
    const fieldErrors = validateFields();

    if (fieldErrors.length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors([]);
    try {
      const result = await dispatch(
        registerUser({ email, username, password })
      );
      if (registerUser.fulfilled.match(result)) {
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        onClose();
      } else {
        throw result.payload || "Ошибка регистрации. Попробуйте снова.";
      }
    } catch (err: any) {
      setErrors([
        typeof err === "string"
          ? err
          : err?.message || "Произошла неизвестная ошибка.",
      ]);
    }
  };

  const openPopupSing = () => {
    openPopup();
    onClose();
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
        <div className="relative z-10 w-[750px] h-[800px] bg-customWhite m-auto mt-auto rounded-xl shadow-xl border border-customGray p-5">
          <p className="text-2xl font-Lato font-semibold text-center mb-10">
            Регистрация
          </p>

          <div className="relative w-full max-w-sm mx-auto flex flex-col gap-4">
            <p className="text-lg font-bold ">Почта</p>
            <input
              type="text"
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-4 pr-4 py-2 border border-customGray rounded-lg focus:outline-none focus:ring-1 focus:ring-customTeal focus:border-transparent"
            />

            <p className="text-lg font-bold ">Логин</p>
            <input
              type="text"
              placeholder="Логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-4 pr-4 py-2 border border-customGray rounded-lg focus:outline-none focus:ring-1 focus:ring-customTeal focus:border-transparent"
            />

            <p className="text-lg font-bold text-center ">Пароль</p>
            <div className=" flex flex-col gap-4">
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-4 py-2 border border-customGray rounded-lg focus:outline-none focus:ring-1 focus:ring-customTeal focus:border-transparent"
              />

              <input
                type="password"
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-4 pr-4 py-2 border border-customGray rounded-lg focus:outline-none focus:ring-1 focus:ring-customTeal focus:border-transparent"
              />
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-customTeal text-white py-2 rounded-lg mt-5"
            >
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </button>

            {errors.length > 0 && (
              <div className="mt-4">
                {errors.map((err, index) => (
                  <p className="text-customRed" key={index}>
                    {err}
                  </p>
                ))}
              </div>
            )}

            {error && (
              <p className="text-customRed">
                {typeof error === "string"
                  ? error
                  : "Произошла ошибка регистрации."}
              </p>
            )}

            <p className="mt-5">
              Вы уже зарегистрированы?{" "}
              <span
                className="text-customTeal underline cursor-pointer"
                onClick={openPopupSing}
              >
                Войти
              </span>
            </p>
          </div>
        </div>
      </AnimatedBlock>
    </div>
  );
};
