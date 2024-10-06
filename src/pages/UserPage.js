import React, { useState, useEffect, useRef } from 'react';
import { GetAPI } from '../api/api';
import Loader from '../components/Loader'; // Импортируем лоадер
import { useUser } from '../context/UserContext'; // Импортируем хук для получения данных пользователя

function UserPage() {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const mounted = useRef(true);
  
  // Получаем данные пользователя из контекста
  const user = useUser();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const info = await GetAPI(777, null, ["user_info"]);
      if (mounted.current) {
        setUserInfo(info.user_info);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <>
      {isLoading && <Loader />} {/* Показываем лоадер */}
      {!isLoading && (
        <>
          <h2 className="text-3xl font-bold">
            {/* Используем имя пользователя из контекста */}
            Salom, {user?.name || 'Mehmon'}!
          </h2>
          <h2 className="text-3xl font-bold">
            {/* Отображаем Jami pul */}
            Jami pul: {userInfo.jami_pul ? userInfo.jami_pul : '0'} UZS
          </h2>
          {/* Остальной контент */}
        </>
      )}
    </>
  );
}

export default UserPage;
