import React from 'react';
import './header.css';


function Header() {
  const openModal = () => {
    document.getElementById('modal').classList.add('show');
    setTimeout(() => {
      document.querySelector('.modal-content').classList.add('active');
    }, 100);
  };

  return (
    <header className="p-4 flex justify-between items-center">
      <div className="header wallet-container" onClick={openModal}>
        <span className="material-icons wallet-icon">account_balance_wallet</span>
        <span className="wallet-text">Xabar yoz va pul ishla 🤑</span>
      </div>
    </header>
  );
}

export default Header;
