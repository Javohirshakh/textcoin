import React from 'react';
import { NavLink } from 'react-router-dom'; // Используем NavLink для активного класса

function Footer() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-800 p-4">
      <div className="flex justify-around text-center">
        {/* Главная страница */}
        <NavLink to="/" exact activeClassName="active-tab" className="nav-item">
          <span className="material-icons">home</span>
          <p>Textcoin</p>
        </NavLink>

        {/* Страница игр */}
        <NavLink to="/games" activeClassName="active-tab" className="nav-item">
          <span className="material-icons">sports_esports</span>
          <p>O'yinlar</p>
        </NavLink>

        {/* Страница бонусов */}
        <NavLink to="/bonuses" activeClassName="active-tab" className="nav-item">
          <span className="material-icons">card_giftcard</span>
          <p>Bonuslar</p>
        </NavLink>
      </div>
    </nav>
  );
}

export default Footer;
