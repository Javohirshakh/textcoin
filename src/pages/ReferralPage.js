import React, { useState, useEffect } from 'react';
import { GetAPI } from '../api/api'; 
import Loader from '../components/Loader'; 
import './referralPage.css';

function ReferralPage() {
  const [referralData, setReferralData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    if (window.Telegram.WebApp) {
        console.log(window.Telegram.WebApp)
      window.Telegram.WebApp.shareText({ 
        text: "TextCoinga ulan va biz bilan pul ishla!" 
      });
    } else {
      alert("Telegram orqali oching!");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h2 className="text-3xl font-bold">Do'stlar</h2>
      <div className="referral-container mt-4 bg-gray-800 p-4 rounded-lg text-left">
        {referralData ? (
          <>
            <p>Chaqirilgan do'stlar: {referralData.count}</p>
            <p>Do'stlardan kelgan to'lovlar: {referralData.ref_pul} UZS</p>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              onClick={handleShare}
            >
              Do'stlaringiz bilan bo'lishing
            </button>
          </>
        ) : (
          <p>Siz hali do'stlaringizni chaqirmagansiz.</p>
        )}
      </div>
    </>
  );
}

export default ReferralPage;
