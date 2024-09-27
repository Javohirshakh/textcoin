import React, { useState, useEffect } from 'react';
import { GetAPI } from '../api/api';
import './user.css';

function BonusesPage() {
  const [userInfo, setUserInfo] = useState({});
  let mounted = true;

  useEffect(() => {
    GetAPI(777, ["user_info"])
      .then(info => {
        if(mounted) {
          setUserInfo(info.user_info);
        }
      })
    return () => mounted = false;
  }, [])

  return (
    <>
        <div className={mounted ? "loading" : ""}>salom</div>
      <h2 className="text-3xl font-bold">Jami pul: { mounted ? userInfo.jami_pul : '0'}</h2>
      <p className="text-gray-400 mt-2">Bonuslaringizni tekshiring.</p>
      <div className="mt-4 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg">Mavjud bonuslar</h3>
        <ul className="text-left text-gray-400">
          <li>Bonus 1</li>
          <li>Bonus 2</li>
          <li>Bonus 3</li>
        </ul>
      </div>
    </>
  );
}

export default BonusesPage;
