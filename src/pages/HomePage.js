import React from 'react';
import { useUser } from '../context/UserContext';

function HomePage() {
  const user = useUser();
  
  console.log(user); // Логируем данные пользователя в консоль для проверки

  return (
    <>
      <h1 className="text-2xl font-bold">
        Salom, {user ? user.name : 'Mehmon'}!
      </h1>

      {user?.profilePhoto && (
        <img 
          src={user.profilePhoto} 
          alt="Profile" 
          className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-lg mt-4" 
        />
      )}

      {/* Отображаем все данные пользователя как строку для отладки */}
      <pre className="mt-4 bg-gray-100 p-2 rounded shadow">
        {JSON.stringify(user, null, 2)}
      </pre>
    </>
  );
}

export default HomePage;
