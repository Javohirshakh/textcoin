import React, { createContext, useContext, useState, useEffect } from 'react';

// Создаем контекст
const UserContext = createContext();

// Провайдер для контекста пользователя
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Получаем данные пользователя через Telegram WebApp SDK
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
      const userData = window.Telegram.WebApp.initDataUnsafe.user;
      setUser(userData ? { name: userData.first_name } : { name: 'Mehmon' });
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
