import { motion } from "framer-motion";
import React from "react";

interface AnimatedBlockProps {
  direction: "left" | "right" | "top" | "bottom"; // Направление появления
  children: React.ReactNode;
}

const AnimatedBlock: React.FC<AnimatedBlockProps> = ({
  direction,
  children,
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "top" ? -100 : direction === "bottom" ? 100 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Показывать анимацию при 20% видимости
      variants={variants}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedBlock;



// const variants = {
//     hidden: {
//       opacity: 0,
//       x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
//       y: direction === "top" ? -100 : direction === "bottom" ? 100 : 0,
//       scale: 0.8, // Уменьшаем размер
//       visibility: "hidden", // Полностью скрываем
//     },
//     visible: {
//       opacity: 1,
//       x: 0,
//       y: 0,
//       scale: 1, // Возвращаем элемент в нормальный размер
//       visibility: "visible", // Делаем элемент видимым
//       transition: { duration: 0.6 }, // Настраиваем длительность анимации
//     },
//   };