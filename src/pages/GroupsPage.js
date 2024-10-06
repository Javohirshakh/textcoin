import React, { useState, useEffect } from 'react';
import { GetAPI } from '../api/api';
import Loader from '../components/Loader';
import './groups.css';

function GroupsPage() {
  const [userInfo, setUserInfo] = useState({});
  const [showClaimMessage, setShowClaimMessage] = useState(false);
  const [claimMessage, setClaimMessage] = useState(''); // Сообщение о клейме
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false); // Добавляем состояние ошибки

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    GetAPI(777, null, ["group"]).then(info => {
      if (mounted) {
        setUserInfo(info);
        setIsLoading(false);
      }
    });

    return () => mounted = false;
  }, []);

  const handleClaim = async (groupName, chatId) => {
    try {
      console.log(`Отправляем запрос для группы: ${groupName}, chat_id: ${chatId}`);
      
      const result = await GetAPI(777, ["getball"], { chat_id: chatId });

      console.log("Ответ от API:", result); // Логируем весь ответ

      if (result.status) {
        console.log("Успешный результат:", result.msg); 
        setClaimMessage(result.msg || "Muvaffaqiyatli bajarildi!"); 
        setIsError(false);
      } else {
        console.error(`Serverdan xatolik: ${result.msg || "Keyinroq urinib ko'ring"}`); 
        setClaimMessage(`${result.msg || "Keyinroq urinib ko'ring!"}`); 
        setIsError(true);
      }

      setShowClaimMessage(true);
      setTimeout(() => {
        setShowClaimMessage(false);
        setClaimMessage('');
      }, 3000);

    } catch (error) {
      console.error(`Ошибка запроса: ${error.message}`); 
      setClaimMessage(`Ошибка: Повторите позже`);
      setIsError(true);
      setShowClaimMessage(true);
      setTimeout(() => {
        setShowClaimMessage(false);
        setClaimMessage('');
      }, 3000);
    }
  };

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
                  <span>{group.xabarlar} ta</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Jami pul:</span>
                  <span>{group.jami_pul} UZS</span>
                </div>
              </div>
              <button 
                onClick={() => handleClaim(group.name, group.chat_id)} 
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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-3xl font-bold">Guruhlar</h2>

          {showClaimMessage && (
            <div className={`notification ${isError ? 'bg-red-500' : 'bg-green-500'}`}>
              <p>{claimMessage}</p>
            </div>
          )}

          <div className="mt-4 mb-8 bg-gray-800 p-2 pb-2 rounded-lg">
            <GroupList groups={userInfo.group} />
          </div>
        </>
      )}
    </>
  );
}

export default GroupsPage;
