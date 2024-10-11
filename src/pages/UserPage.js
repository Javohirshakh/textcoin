import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем хук для навигации
import { GetAPI } from '../api/api';
import Loader from '../components/Loader';
import { useUser } from '../context/UserContext';

function UserPage() {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const mounted = useRef(true);
  const navigate = useNavigate(); // Создаем навигатор
  
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

  const handleWithdraw = () => {
    navigate('/withdraw'); // Перенаправляем пользователя на страницу вывода
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="user-info-container">
          <h2 className="text-3xl font-bold">Salom, {user?.name || 'Mehmon'}!</h2>

          <div className="user-info-grid">
            <div className="user-info-card">
              <p><strong>Guruhlar soni:</strong> {userInfo.azo_guruhlari || 0}</p>
              <p><strong>Bugungi postlar:</strong> {userInfo.bugungi_post || 0}</p>
              <p><strong>Ko'rsatilmagan:</strong> {userInfo.card || 'Ko\'rsatilmagan'}</p>
              <p><strong>Umumiy balans:</strong> {userInfo.jami_pul || 0} UZS</p>
            </div>
          </div>

          <button 
            onClick={handleWithdraw} 
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4"
          >
            Pul yechish
          </button>
        </div>
      )}
    </>
  );
}

export default UserPage;
