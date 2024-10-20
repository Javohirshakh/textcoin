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
    if (!user?.user?.id) {
      // Если нет ID пользователя, прекращаем загрузку
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const info = await GetAPI(user.user.id, null, ["user_info"]);
        if (info && mounted.current) {
          setUserInfo(info.user_info);
        } else {
          console.error("Ошибка получения данных пользователя");
        }
      } catch (error) {
        console.error("Ошибка API:", error);
      } finally {
        if (mounted.current) {
          setIsLoading(false);
        }
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
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
      <button 
        onClick={handleWithdraw} 
        className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4"
      >
        Pul yechish
      </button>
    </>
  );
}

export default UserPage;
