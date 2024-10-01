import React, { useState, useEffect } from 'react';
import { GetAPI } from '../api/api';
import Loader from '../components/Loader'; // Импортируем лоадер

function GroupsPage() {
  const [userInfo, setUserInfo] = useState({});
  const [totalEarned, setTotalEarned] = useState(0); // Для общей суммы
  const [showClaimMessage, setShowClaimMessage] = useState(false);
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

  // Обработка "клейма" суммы
  const handleClaim = () => {
    setShowClaimMessage(true);
    setTimeout(() => {
      setShowClaimMessage(false);
    }, 3000); // Уведомление пропадет через 3 секунды
  };

  // Обновляем общую сумму через этот метод
  const handleTotalSumChange = (sum) => {
    setTotalEarned(sum);
  };

  // Проверяем, есть ли группы, и считаем общую сумму
  const GroupList = ({ groups }) => {
    if (!groups || groups.length === 0) {
      return <p className="text-gray-400">Guruhlar topilmadi!</p>;
    }

    // Суммируем значение jami_pul, обязательно приводим к числу
    const totalSum = groups.reduce((sum, group) => sum + Number(group.jami_pul), 0);
    handleTotalSumChange(totalSum); // Обновляем общую сумму

    return (
      <div>
        {groups.map((group, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg mb-2">
            <div className="flex items-center">
              <img src={group.img} alt={group.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="text-white font-bold">{group.name}</p>
                <p className="text-xs text-gray-400">Xabarlar: {group.xabarlar}</p>
                <p className="text-xs text-gray-400">Jami pul: {group.jami_pul} UZS</p>
              </div>
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
            <div className="bg-green-500 text-white p-2 rounded-lg mb-4">
              Pul muvaffaqiyatli olindi!
            </div>
          )}

          {/* Общая информация о сумме */}
          <div className="mt-4 bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg">Jami ishlangan summa: {totalEarned} UZS</h3>
            <button 
              onClick={handleClaim} 
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mt-4"
            >
              Pulni olish
            </button>
          </div>

          {/* Список групп */}
          <div className="mt-4 mb-8 bg-gray-800 p-4 rounded-lg">
            <GroupList groups={userInfo.group} />
          </div>
        </>
      )}
    </>
  );
}

export default GroupsPage;
