import React, { useState, useEffect } from 'react';
import { GetAPI } from '../api/api';
import Loader from '../components/Loader'; // Импортируем лоадер
import './groups.css'; 

function GroupsPage() {
  const [userInfo, setUserInfo] = useState({});
  const [showClaimMessage, setShowClaimMessage] = useState(false);
  const [claimMessage, setClaimMessage] = useState(''); // Сообщение о клейме
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки

  useEffect(() => {
    let mounted = true;
    setIsLoading(true); // Включаем лоадер при старте запроса

    GetAPI(777, ["group"])
      .then(info => {
        if (mounted) {
          setUserInfo(info);
          setIsLoading(false); // Отключаем лоадер после загрузки данных
        }
      });

    return () => mounted = false;
  }, []);

  // Обработка "клейма" суммы для каждой группы
  const handleClaim = (groupName, jamiPul) => {
    setClaimMessage(`Siz ${groupName} guruhidan ${jamiPul} UZS oldingiz!`);
    setShowClaimMessage(true);
    setTimeout(() => {
      setShowClaimMessage(false);
      setClaimMessage('');
    }, 4000); // Уведомление пропадет через 4 секунды
  };

  // Проверяем, есть ли группы, и считаем общую сумму
  const GroupList = ({ groups }) => {
    if (!groups || groups.length === 0) {
      return <p className="text-gray-400">Guruhlar topilmadi!</p>;
    }


    return (
      <div>
        {groups.map((group, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-700 p-2 rounded-lg item">
            <div className="flex items-center group_item">
              <img src={group.img} alt={group.name} className="w-12 h-12 rounded-full mr-4" />
              <div className="flex flex-col w-full text-left">
                <p className="text-white font-bold">{group.name}</p>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Xabarlar:</span>
                  <span>{group.xabarlar}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Jami pul:</span>
                  <span>{group.jami_pul} UZS</span>
                </div>
              </div>
              {/* Кнопка клейма для каждой группы */}
              <button 
                onClick={() => handleClaim(group.name, group.jami_pul)} 
                className="claim-button bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded ml-4"
              >
                Olish
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Показываем лоадер, если данные загружаются */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-3xl font-bold">Guruhlar</h2>

          {/* Уведомление о клейме суммы */}
          {showClaimMessage && (
            <div className="notification">
              <p>{claimMessage}</p>
            </div>
          )}

          {/* Список групп */}
          <div className="mt-4 mb-8 bg-gray-800 p-2 pb-2 rounded-lg">
            <GroupList groups={userInfo.group} />
          </div>
        </>
      )}
    </>
  );
}

export default GroupsPage;
