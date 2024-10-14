import React, { useState, useEffect, useRef } from 'react';
import { GetAPI } from '../api/api'; 
import Loader from '../components/Loader'; 
import { useUser } from '../context/UserContext'; 
import './homePage.css';

function HomePage() {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const mounted = useRef(true);
  const user = useUser();
  const defaultPhoto = 'https://via.placeholder.com/150'; 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const info = await GetAPI(777, null, ["user_info"]);
      if (mounted.current) {
        setUserInfo(info.user_info);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted.current = false;
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="home-container">
      <div className="flex items-center p-2 user rounded-lg">
        <img
          src={user?.profilePhoto || defaultPhoto}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-gray-300 shadow-lg"
        />

        <div className="ml-4 text-left">
          <h1 className="text-xl font-bold">{user ? user.name : 'Mehmon'}</h1>
          <p className="text-xs mt-2">Balans: {userInfo.jami_pul || 0} UZS</p>
        </div>

        <div className="level ml-auto text-center">
          <span>{userInfo.level || 1}</span>
          <br />
          daraja
        </div>
      </div>

      <div className="social-links p-2 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-2">Bizning sahifalarimiz:</h2>
        <ul className="flex gap-2">
          <li>
            <a
              href="https://t.me/zolimbot"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              Telegram
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              YouTube
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
