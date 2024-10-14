import React, { useState, useEffect } from 'react';
import { GetAPI } from '../api/api';
import Loader from '../components/Loader';
import './referralPage.css';

function ReferralPage() {
  const [referralData, setReferralData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  // Мок-данные для списка приглашенных пользователей
  const mockInvitedUsers = [
    {
      id: 1,
      photo: './user.png',
      name: 'Ali Valiyev',
      profit: 500,
    },
    {
      id: 2,
      photo: null,
      name: 'MR Shahzodbek',
      profit: 700,
    },
    {
      id: 3,
      photo: null,
      name: 'Obmenchi boshliq',
      profit: 300,
    },
  ];

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

  const handleShare = () => {
    const shareUrl = `https://t.me/share/url?url=https://t.me/textcoinro_bot?start=1&text=TextCoinga ulan va xabar yozib bilan pul ishla!`;
    window.open(shareUrl, '_blank');
  };

  const handleCopy = () => {
    const inviteLink = `https://t.me/textcoinro_bot?start=1`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h2 className="text-3xl font-bold">Do'stlar</h2>
      <div className="referral-container mt-4 p-2 rounded-lg text-left text-xl">

          <span className="ref-text">
              Ko'proq do'stlaringizni chaqiring va yanada ko'proq pul ishlang! Har bir chaqirgan do'stingiz uchun <b>500 UZS</b> dan oling. <br></br>
            </span>
        {referralData ? (
          <>
            <span className="text-sm">
              Chaqirilgan do'stlar: {referralData.count}
            </span>
            <br />
            <span className="text-sm">
              Do'stlardan kelgan foyda: {referralData.ref_pul} UZS
            </span>
          </>
        ) : (
          <p>Siz hali do'stlaringizni chaqirmagansiz.</p>
        )}

        <div className="flex items-center mt-1 sharebutton">
          <button
            className="share w-full bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded"
            onClick={handleShare}
          >
            Do'stlaringiz bilan bo'lishing
          </button>
          <button
            className="ml-2 bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded"
            onClick={handleCopy}
          >
            <span className="material-icons">content_copy</span>
          </button>
        </div>

        {isCopied && alert("Ko'chirildi")}

        
      </div>{/* Список приглашенных пользователей */}
        <div className="invited-users mt-6">
          <h3 className="text-xl font-bold text-left mb-2">Taklif qilingan do'stlar ({mockInvitedUsers.length})</h3>
          {mockInvitedUsers.map((user) => (
            <div
              key={user.id}
              className="user-item flex items-center mb-2 p-2 rounded shadow"
            >
              <img
                src={user.photo ? user.photo : './user.png'}
                alt={user.name}
                className="w-12 h-12 rounded-full border-2 border-gray-300"
              />
              <div className="ml-2">
                <p className="font-bold text-left">{user.name}</p>
                <p className="text-sm">
                  Kelgan foyda: {user.profit} UZS
                </p>
              </div>
            </div>
          ))}
        </div>
    </>
  );
}

export default ReferralPage;
