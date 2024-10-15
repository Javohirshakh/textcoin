import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

function Header() {
  const [isCardAdded, setIsCardAdded] = useState(false); // Мок: карта добавлена
  const currentLevel = 1; // Мок: текущий уровень
  const invitedFriends = 17; // Мок: приглашенные друзья
  const progress = Math.min((invitedFriends / 50) * 100, 100); // Прогресс к следующему уровню

  const openModal = () => {
    document.getElementById('modal').classList.add('show');
    setTimeout(() => {
      document.querySelector('.modal-content').classList.add('active');
    }, 100);
    setIsCardAdded(true);
  };

  return (
    <header className="p-1 flex justify-between items-center">
      {isCardAdded ? (
        <NavLink to="/level" className="header wallet-container">
          <span className="material-icons wallet-icon">insights</span>
          <div className="wallet-text-with-progress">
            <span className="wallet-text">{currentLevel}-daraja 🎉</span>
          </div>
          <div className="mini-progress-bar">
              <div
                className="mini-progress"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className='text-sm'>
              {invitedFriends}/50
            </div>
        </NavLink>
      ) : (
        <div className="header wallet-container" onClick={openModal}>
          <span className="material-icons wallet-icon">account_balance_wallet</span>
          <span className="wallet-text">Xabar yoz va pul ishla 🤑</span>
        </div>
      )}
    </header>
  );
}

export default Header;
