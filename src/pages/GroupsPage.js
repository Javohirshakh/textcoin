import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext'; 
import { GetAPI } from '../api/api';
import Loader from '../components/Loader';
import './groups.css';

function GroupsPage() {
  const user = useUser()
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    GetAPI(user.user.id, null, ["group"]).then(info => {
      if (mounted) {
        setUserInfo(info);
        setIsLoading(false);
      }
    });

    return () => mounted = false;
  }, [user?.user?.id]);

  const handleClaim = async (groupName, chatId) => {
    try {
      console.log(`Отправляем запрос для группы: ${groupName}, chat_id: ${chatId}`);
      
      const result = await GetAPI(user.user.id, "getball", { chat_id: chatId });

      console.log("Ответ от API:", result); 

      // Проверяем статус ответа
      if (result.status) {
        alert(result.msg || "Muvaffaqiyatli bajarildi!"); // Обычный alert для успешного сообщения
      } else {
        alert(result.msg || "Keyinroq urinib ko'ring!"); // Обычный alert для ошибки
      }

    } catch (error) {
      console.error(`Ошибка запроса: ${error.message}`); 
      alert("Ошибка: Повторите позже");
    }
  };

  const GroupList = ({ groups }) => {
    if (!groups || groups.length === 0) {
      return <p className="text-gray-400">Guruhlar topilmadi!</p>;
    }

    return (
      <div>
        {groups.map((group, index) => (
          <div key={index} className="flex justify-between items-center p-2 rounded-lg item">
            <div className="flex items-center group_item">
              <img src={group.img} alt={group.name} className="w-12 h-12 rounded-full mr-4" />
              <div className="flex flex-col w-full text-left">
                <p className="text-white font-bold">{group.name}</p>
                <div className="flex justify-between text-xs">
                  <span>Xabarlar:</span>
                  <span>{group.xabarlar} ta</span>
                </div>
                <div className="flex justify-between text-xs  ">
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
          <div className="groups mt-4 mb-8 pb-2 rounded-lg">
            <GroupList groups={userInfo.group} />
          </div>
        </>
      )}
    </>
  );
}

export default GroupsPage;
