import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.css';

function Footer() {
  return (
    <nav className="fixed footer bottom-0 left-0 w-full bg-gray-800 p-4">
      <div className="flex justify-around text-center">
        {/* Главная страница */}
        <NavLink 
          to="/" 
          className={({ isActive }) => `nav-item ${isActive ? 'active-tab' : ''}`}
        >
          <span className="material-icons">home</span>
          <p>Textcoin</p>
        </NavLink>

        {/* Страница групп (Guruhlar) */}
        <NavLink 
          to="/groupsPage" 
          className={({ isActive }) => `nav-item ${isActive ? 'active-tab' : ''}`}
        >
          <span className="material-icons">groups</span> {/* Иконка для групп или чатов */}
          <p>Guruhlar</p>
        </NavLink>

        {/* Страница Do'stlar (Рефералки) */}
        <NavLink 
          to="/referrals" 
          className={({ isActive }) => `nav-item ${isActive ? 'active-tab' : ''}`}
        >
          <span className="material-icons">group</span>
          <p>Do'stlar</p>
        </NavLink>

        {/* Страница задач (Vazifalar) */}
        <NavLink 
          to="/tasksPage" 
          className={({ isActive }) => `nav-item ${isActive ? 'active-tab' : ''}`}
        >
          <span className="material-icons">assignment_turned_in</span> {/* Иконка для задач */}
          <p>Vazifalar</p>
        </NavLink>

        {/* Страница пользователя */}
        <NavLink 
          to="/userPage" 
          className={({ isActive }) => `nav-item ${isActive ? 'active-tab' : ''}`}
        >
          <span className="material-icons">account_circle</span>
          <p>User Page</p>
        </NavLink>
      </div>
    </nav>
  );
}

export default Footer;
