import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './SplashScreen.css'; // Стили для анимации

const SplashScreen = ({ onFinish }) => {
  const [textVisible, setTextVisible] = useState(false);
  const [screenJump, setScreenJump] = useState(false); // Для анимации прыжка экрана

  useEffect(() => {
    const timer = setTimeout(() => {
      setTextVisible(true); // Показать текст
    }, 2500); // Через 2.5 секунды текст появляется

    const jumpTimer = setTimeout(() => {
      setScreenJump(true); // Запускаем анимацию прыжка экрана
    }, 4500); // Через 4.5 секунд запускаем анимацию прыжка

    const finishTimer = setTimeout(() => {
      onFinish(); // Убираем сплэш-скрин через 5.5 секунд
    }, 5500); // Ускорено до 5.5 секунд

    return () => {
      clearTimeout(timer);
      clearTimeout(jumpTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <motion.div
      className="splash-screen"
      animate={screenJump ? { y: -1000, opacity: 0 } : {}} // Анимация прыжка вверх
      transition={{ duration: 1, ease: "easeInOut" }} // Время прыжка
    >
      {/* Логотип анимируется быстрее и смещается */}
      <motion.img
        src="./logo2.png"
        alt="Logo"
        className="logo-animation"
        initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }} // Начальное смещение
        animate={{
          scale: [0.5, 1, 1.5, 1],
          rotate: [0, 360, 360, 0],
          opacity: [0.5, 1, 1, 0.9, 0.9],
          borderRadius: ["20%", "50%", "50%", "20%"],
          x: "-50%", // Сохранение центра по оси X
          y: "-50%", // Сохранение центра по оси Y
        }}
        transition={{
          duration: 2.5, // Ускоренная анимация логотипа
          ease: "easeInOut", // Плавный переход
        }}
        style={{
          width: "80px",
          height: "80px",
          position: "absolute", // Абсолютное позиционирование для центрирования
          top: "50%",
          left: "50%",
        }}
      />

      {/* Текст появляется быстрее */}
      {textVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }} // Ускоренное появление текста
          className="ending-text"
        >
          <h1>TextCoin da pul ishla!</h1>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SplashScreen;