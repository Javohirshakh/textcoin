import React, { useState, useEffect } from 'react';
import { GetAPI } from '../api/api'; 
import Loader from '../components/Loader'; 
import './referralPage.css';

function ReferralPage() {
  const [referralData, setReferralData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false); // Состояние для отображения уведомления о копировании

  useEffect(() => {
    const fetchReferralData = async () => {
      const result = await GetAPI(777, null, ["ref"]);

      if (result.status) {
        setReferralData(result.ref);
      } else {
        alert("Do'stlar topilmadi.");
      }
      setIsLoading(false);
    };

    fetchReferralData();
  }, []);

  // Функция для открытия ссылки в Telegram
  const handleShare = () => {
    const shareUrl = `https://t.me/share/url?url=https://t.me/textcoinro_bot?start=1&text=TextCoinga ulan va xabar yozib bilan pul ishla!`;
    window.open(shareUrl, '_blank');
  };

  // Функция для копирования ссылки
  const handleCopy = () => {
    const inviteLink = `https://t.me/textcoinro_bot?start=1`; // Ссылка для копирования
    navigator.clipboard.writeText(inviteLink).then(() => {
      setIsCopied(true); // Показываем уведомление о копировании
      setTimeout(() => setIsCopied(false), 2000); // Убираем уведомление через 2 секунды
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h2 className="text-3xl font-bold">Do'stlar</h2>
      <div className="referral-container mt-4 p-2 rounded-lg text-left text-xl">
        {referralData ? (
          <>
            <span className='text-sm'>Chaqirilgan do'stlar: {referralData.count}</span><br></br>
            <span className='text-sm'>Do'stlardan kelgan to'lovlar: {referralData.ref_pul} UZS</span>
          </>
        ) : (
          <p>Siz hali do'stlaringizni chaqirmagansiz.</p>
        )}

        <div className="flex items-center mt-1 sharebutton">
          <button 
            className="w-full bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded"
            onClick={handleShare}
          >
            Do'stlaringiz bilan bo'lishing
          </button>
          <button 
            className="ml-4 bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded"
            onClick={handleCopy}
          >
            <span className="material-icons">content_copy</span> {/* Иконка копирования */}
          </button>
        </div>
        
        {isCopied && alert('Ko\'chirildi')} {/* Уведомление о копировании */}
      </div>
    </>
  );
}

export default ReferralPage;
