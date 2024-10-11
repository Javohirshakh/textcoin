import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './footer.css';

function Footer() {
  const location = useLocation(); // Получаем текущий путь

  // Проверяем, находится ли пользователь на странице вывода денег или странице пользователя
  const isUserPageActive = location.pathname === '/userPage' || location.pathname === '/withdraw';

  return (
    <nav className="fixed footer bottom-0 left-0 w-full py-2">
      <div className="flex justify-around text-center">
        {/* Главная страница */}
        <NavLink 
          to="/" 
          className={({ isActive }) => `nav-item ${isActive ? 'active-tab' : ''}`}
        >
          <span className="material-icons">home</span>
          <p className="text-xs">Textcoin</p>
        </NavLink>

        {/* Страница групп (Guruhlar) */}
        <NavLink 
          to="/groupsPage" 
          className={({ isActive }) => `nav-item ${isActive ? 'active-tab' : ''}`}
        >
          <span className="material-icons">groups</span> 
          <p className="text-xs">Guruhlar</p>
        </NavLink>

        {/* Страница Do'stlar (Рефералки) */}
        <NavLink 
          to="/referralPage" 
          className={({ isActive }) => `nav-item ${isActive ? 'active-tab' : ''}`}
        >
          <span className="material-icons">group</span> 
          <p className="text-xs">Do'stlar</p>
        </NavLink>

        {/* Страница задач (Vazifalar) */}
        <NavLink 
          to="/tasksPage" 
          className={({ isActive }) => `nav-item ${isActive ? 'active-tab' : ''}`}
        >
          <span className="material-icons">assignment_turned_in</span> 
          <p className="text-xs">Vazifalar</p>
        </NavLink>

        {/* Страница пользователя */}
        <NavLink 
          to="/userPage" 
          className={`nav-item ${isUserPageActive ? 'active-tab' : ''}`}  // Делаем таб активным для обеих страниц
        >
          <span className="material-icons">account_circle</span> 
          <p className="text-xs">Hisob</p>
        </NavLink>
      </div>
    </nav>
  );
}

export default Footer;
