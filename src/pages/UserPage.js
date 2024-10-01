import React, { useState, useEffect, useRef } from 'react';
import { GetAPI } from '../api/api';
import Loader from '../components/Loader'; // Импортируем лоадер

function UserPage() {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const mounted = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const info = await GetAPI(777, ["user_info"]);
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

  return (
    <>
      {isLoading && <Loader />} {/* Показываем лоадер */}
      {!isLoading && (
        <>
          <h2 className="text-3xl font-bold">
            Jami pul: {userInfo.jami_pul ? userInfo.jami_pul : '0'}
          </h2>
          {/* Остальной контент */}
        </>
      )}
    </>
  );
}

export default UserPage;
