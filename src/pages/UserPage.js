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
  const defaultPhoto = './user.png'; 
  
  const user = useUser();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const info = await GetAPI(user.user.id, null, ["user_info"]);
      if (mounted.current) {
        setUserInfo(info.user_info);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted.current = false;
    };
  }, [user?.user?.id]);

  const handleWithdraw = () => {
    navigate('/withdraw'); // Перенаправляем пользователя на страницу вывода
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="user-info-container">
          

      <div className="flex items-center p-2 user rounded-lg">
        <img
          src={user?.profilePhoto || defaultPhoto}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-gray-300 shadow-lg"
        />

        <div className="ml-4 text-left">
          <h1 className="text-xl font-bold">{user ? user.name : 'Mehmon'}</h1>
          <p className="text-xs mt-2">Balans: {userInfo.jami_pul || 0} UZS</p>
        </div>

        <div className="level ml-auto text-center">
          <span>{userInfo.level || 1}</span>
          <br />
          daraja
        </div>
        </div>
        {/* <div className="user-info-grid">
            <div className="user-info-card">
              <p><strong>Guruhlar soni:</strong> {userInfo.azo_guruhlari || 0}</p>
              <p><strong>Bugungi postlar:</strong> {userInfo.bugungi_post || 0}</p>
              <p><strong>Karta:</strong> {userInfo.card || 'Ko\'rsatilmagan'}</p>
              <p><strong>Umumiy balans:</strong> {userInfo.jami_pul || 0} UZS</p>
            </div>
          </div> */}
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
