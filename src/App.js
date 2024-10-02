import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; // Импортируем Footer
import Modal from './components/Modal';
import HomePage from './pages/HomePage';
import GroupsPage from './pages/GroupsPage';
import BonusesPage from './pages/BonusesPage';
import TasksPage from './pages/TasksPage';
import UserPage from './pages/UserPage';
import { UserProvider } from './context/UserContext'; // Импортируем UserProvider
import './styles.css';

function App() {
  return (
    <UserProvider> {/* Оборачиваем приложение в UserProvider */}
      <Router>
        <div className="App">
          <Header />
          <main className="container mx-auto text-center p-6 pb-20" id="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/groupsPage" element={<GroupsPage />} />
              <Route path="/bonuses" element={<BonusesPage />} />
              <Route path="/userPage" element={<UserPage />} />
              <Route path="/tasksPage" element={<TasksPage />} />
            </Routes>
          </main>
          <Footer /> {/* Добавляем Footer */}
          <Modal />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
