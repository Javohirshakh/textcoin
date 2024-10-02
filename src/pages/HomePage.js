import React, { useState, useEffect } from 'react';

function HomePage() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Проверяем, доступен ли объект Telegram для получения данных о пользователе
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      setUserName(user ? user.first_name : 'Гость'); // Получаем имя пользователя, или отображаем 'Гость'
    }
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold">Привет, {userName}!</h1>
      <p className="text-gray-400">Balans</p>
      <h2 className="text-3xl font-bold">14 800 uzs</h2>
      <button className="custom-button text-white py-2 px-6 rounded-full mt-6">Yutuqlaringiz</button>

      <div className="custom-flex mt-8">
        <div className="custom-card">
          <div className="custom-icon-container">
            <span className="material-icons custom-icon">emoji_events</span>
          </div>
          <p className="custom-text">Bronze Level</p>
        </div>
        <div className="custom-card">
          <div className="custom-icon-container">
            <span className="material-icons custom-icon">group</span>
          </div>
          <p className="custom-text">2 Frens</p>
        </div>
        <div className="custom-card">
          <div className="custom-icon-container">
            <span className="material-icons custom-icon">more_horiz</span>
          </div>
          <p className="custom-text">More</p>
        </div>
      </div>

      <div className="mt-4 bg-gray-800 p-2 rounded-lg">
        <h3 className="text-base">Everyone is playing</h3>
        <div className="flex justify-between items-center m2-4">
          <div className="flex items-center">
            <div className="bg-blue-500 p-2 rounded-full">
              <span className="material-icons">pets</span>
            </div>
            <div className="ml-2">
              <span className="text-sm">Not Games</span>
              <p className="text-xs text-gray-400">Lost Dogs: The Way</p>
            </div>
          </div>
          <button className="bg-gray-700 text-white py-1 px-3 rounded">Play</button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
