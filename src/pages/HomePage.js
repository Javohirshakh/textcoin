import React from 'react';
import { useUser } from '../context/UserContext'; // Подключаем хук для работы с пользователем

function HomePage() {
  const user = useUser(); // Получаем данные пользователя через контекст

  return (
    <>
      <h1 className="text-2xl font-bold">
        Salom, {user ? user.name : 'Mehmon'}!
      </h1>

      {user?.profilePhoto && (
        <div className="mt-4">
          <img 
            src={user.profilePhoto} 
            alt={`${user.name}'s profile`} 
            className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-lg" 
          />
        </div>
      )}
    </>
  );
}

export default HomePage;
