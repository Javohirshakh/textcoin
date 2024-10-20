import React, { useState, useEffect } from 'react';
import { GetAPI } from '../api/api';
import { useUser } from '../context/UserContext';
import Loader from '../components/Loader';
import './referralPage.css';

function ReferralPage() {
  const [referralData, setReferralData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const user = useUser();

  // Mock data for invited users (if API data is not available)
  const mockInvitedUsers = [
    { id: 1, photo: './user.png', name: 'Ali Valiyev', profit: 500 },
    { id: 2, photo: null, name: 'MR Shahzodbek', profit: 700 },
    { id: 3, photo: null, name: 'Obmenchi boshliq', profit: 300 },
  ];

  // Fetch referral data from the API
  useEffect(() => {
    if (!user?.user?.id) {
      setIsLoading(false); // If there's no user ID, stop loading
      return;
    }

    const fetchReferralData = async () => {
      try {
        setIsLoading(true); // Start loading before the API call
        const result = await GetAPI(user.user.id, null, ["ref"]);
        if (result.status) {
          setReferralData(result.ref);
        } else {
          console.error("Error fetching referral data.");
        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setIsLoading(false); // Stop loading once the API call is done
      }
    };

    fetchReferralData();
  }, [user?.user?.id]); // Dependency array ensures the effect runs when user ID is available

  // Share the referral link
  const handleShare = () => {
    const shareUrl = `https://t.me/share/url?url=https://t.me/textcoinro_bot?start=1&text=TextCoinga ulan va xabar yozib bilan pul ishla!`;
    window.open(shareUrl, '_blank');
  };

  // Copy referral link to clipboard
  const handleCopy = () => {
    const inviteLink = `https://t.me/textcoinro_bot?start=1`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Notification fades after 2 seconds
    });
  };

  if (isLoading) {
    return <Loader />; // Show loader if the data is still being fetched
  }

  return (
    <>
      <h2 className="text-3xl font-bold">Do'stlar</h2>
      <div className="referral-container mt-4 p-2 rounded-lg text-left text-xl">
        <span className="ref-text">
          Ko'proq do'stlaringizni chaqiring va yanada ko'proq pul ishlang! Har bir chaqirgan do'stingiz uchun <b>500 UZS</b> dan oling.
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
          <button className="share w-full bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded" onClick={handleShare}>
            Do'stlaringiz bilan bo'lishing
          </button>
          <button className="ml-2 bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded" onClick={handleCopy}>
            <span className="material-icons">content_copy</span>
          </button>
        </div>
        {isCopied && alert("Ko'chirildi")}
      </div>

      {/* Display list of invited users */}
      <div className="invited-users mt-6">
        <h3 className="text-xl font-bold text-left mb-2">Taklif qilingan do'stlar ({mockInvitedUsers.length})</h3>
        {mockInvitedUsers.map((user) => (
          <div key={user.id} className="user-item flex items-center mb-2 p-2 rounded shadow">
            <img src={user.photo ? user.photo : './user.png'} alt={user.name} className="w-12 h-12 rounded-full border-2 border-gray-300" />
            <div className="ml-2">
              <p className="font-bold text-left">{user.name}</p>
              <p className="text-sm">Kelgan foyda: {user.profit} UZS</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ReferralPage;
