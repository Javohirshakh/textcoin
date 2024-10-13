import React, { createContext, useContext, useState, useEffect } from 'react';

// Создаем контекст
const UserContext = createContext();

// Провайдер для контекста пользователя
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
      const userData = window.Telegram.WebApp;

      if (userData) {
        setUser({
          name: userData.first_name,
          profilePhoto: userData.photo_url || null,
          user: userData
        });
      } else {
        setUser({ name: 'Mehmon', profilePhoto: null, user: 'null' });
      }
    }
  }, []); // Нет больше использования 'user', массив зависимостей пуст

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

// Хук для использования данных пользователя
export const useUser = () => useContext(UserContext);
