import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.css';

function Footer() {
  return (
    <nav className="fixed footer bottom-0 left-0 w-full bg-gray-800 py-2"> {/* Уменьшена высота */}
      <div className="flex justify-around text-center">
        {/* Главная страница */}
        <NavLink 
          to="/" 
          className={({ isActive }) => `nav-item ${isActive ? 'active-tab' : ''}`}
        >
          <span className="material-icons">home</span>
          <p className="text-xs">Textcoin</p> {/* Уменьшен только размер текста */}
        </NavLink>

        {/* Страница групп (Guruhlar) */}
        <NavLink 
          to="/groupsPage" 
          className={({ isActive }) => `nav-item ${isActive ? 'active-tab' : ''}`}
        >
          <span className="material-icons">groups</span> 
          <p className="text-xs">Guruhlar</p> {/* Уменьшен только размер текста */}
        </NavLink>

        {/* Страница Do'stlar (Рефералки) */}
        <NavLink 
          to="/referrals" 
          className={({ isActive }) => `nav-item ${isActive ? 'active-tab' : ''}`}
        >
          <span className="material-icons">group</span> 
          <p className="text-xs">Do'stlar</p> {/* Уменьшен только размер текста */}
        </NavLink>

        {/* Страница задач (Vazifalar) */}
        <NavLink 
          to="/tasksPage" 
          className={({ isActive }) => `nav-item ${isActive ? 'active-tab' : ''}`}
        >
          <span className="material-icons">assignment_turned_in</span> 
          <p className="text-xs">Vazifalar</p> {/* Уменьшен только размер текста */}
        </NavLink>

        {/* Страница пользователя */}
        <NavLink 
          to="/userPage" 
          className={({ isActive }) => `nav-item ${isActive ? 'active-tab' : ''}`}
        >
          <span className="material-icons">account_circle</span> 
          <p className="text-xs">Hisob</p> {/* Уменьшен только размер текста */}
        </NavLink>
      </div>
    </nav>
  );
}

export default Footer;
