import React from 'react';
import { useUser } from '../context/UserContext'; 
import './homePage.css';

function HomePage() {
  const user = useUser();
  const defaultPhoto = 'https://via.placeholder.com/150'; // Дефолтное фото профиля

  return (
    <div className="flex items-center p-2 user rounded-lg">
      {/* Фото профиля или дефолтное изображение */}
      <img
        src={user?.profilePhoto || defaultPhoto}
        alt="Profile"
        className="w-16 h-16 rounded-full border-2 border-gray-300 shadow-lg"
      />

      {/* Имя пользователя и баланс */}
      <div className="ml-4 text-left">
        <h1 className="text-xl font-bold">
          {user ? user.name : 'Mehmon'}!
        </h1>
        <p className="text-lg mt-2">
          Balans: {user?.user?.jami_pul || 0} UZS
        </p>
      </div>
    </div>
  );
}

export default HomePage;
