import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "px-[40px] py-4 rounded-sm font-Lato transition-colors duration-300 outline-customTeal";
  const primaryStyles =
    "text-customWhite bg-customTeal hover:bg-opacity-0 outline hover:text-customTeal ";
  const secondaryStyles =
    "text-customTeal bg-white outline hover:bg-customTeal hover:text-customWhite";

  // Определение стилей на основе варианта
  const variantStyles = variant === "primary" ? primaryStyles : secondaryStyles ;

  // Объединение базовых стилей, стилей варианта и переданного className
  const styles = `${baseStyles} ${variantStyles} ${className}`;

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
};
