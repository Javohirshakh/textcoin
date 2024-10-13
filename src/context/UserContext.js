import React, { createContext, useContext, useState, useEffect } from 'react';

// Создаем контекст
const UserContext = createContext();

// Провайдер для контекста пользователя
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
      const userData = window.Telegram.WebApp.initDataUnsafe.user;

      if (userData) {
        // Сохраняем имя и URL фотографии профиля
        setUser({
          name: userData.first_name,
          profilePhoto: userData.photo_url || null, // Проверяем, если фото есть
        });
      } else {
        setUser({ name: 'Mehmon', profilePhoto: null });
      }
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

// Хук для использования данных пользователя
export const useUser = () => useContext(UserContext);
