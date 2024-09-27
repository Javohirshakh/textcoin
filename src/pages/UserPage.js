import React, { useState, useEffect, useRef } from 'react';
import { GetAPI } from '../api/api';
import './user.css';

function UserPage() {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Состояние для лоадера
  const mounted = useRef(true); // Используем useRef для mounted

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Включаем лоадер
      const info = await GetAPI(777, ["user_info"]);
      if (mounted.current) {
        setUserInfo(info.user_info);
        setIsLoading(false); // Отключаем лоадер после загрузки данных
      }
    };

    fetchData();

    return () => {
      mounted.current = false; // Обновляем значение, когда компонент размонтируется
    };
  }, []);

  return (
    <>
      {/* Лоадер: показывается, если isLoading === true */}
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}

      {!isLoading && (
        <>
          <div>salom</div>
          <h2 className="text-3xl font-bold">
            Jami pul: {userInfo.jami_pul ? userInfo.jami_pul : '0'}
          </h2>
          <p className="text-gray-400 mt-2">Bonuslaringizni tekshiring.</p>
          <div className="mt-4 bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg">Mavjud bonuslar</h3>
            <ul className="text-left text-gray-400">
              <li>Bonus 1</li>
              <li>Bonus 2</li>
              <li>Bonus 3</li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default UserPage;
