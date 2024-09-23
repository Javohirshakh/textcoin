import React from 'react';

function Header() {
  const openModal = () => {
    document.getElementById('modal').classList.add('show');
    setTimeout(() => {
      document.querySelector('.modal-content').classList.add('active');
    }, 100);
  };

  return (
    <header className="p-4 flex justify-between items-center">
      <div className="wallet-container" onClick={openModal}>
        <span className="material-icons wallet-icon">account_balance_wallet</span>
        <span className="wallet-text">Karta ulash</span>
      </div>
    </header>
  );
}

export default Header;
