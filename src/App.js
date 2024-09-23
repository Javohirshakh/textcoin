import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; // Импортируем Footer
import Modal from './components/Modal';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import BonusesPage from './pages/BonusesPage';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container mx-auto text-center p-6 pb-20" id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/bonuses" element={<BonusesPage />} />
          </Routes>
        </main>
        <Footer /> {/* Добавляем Footer */}
        <Modal />
      </div>
    </Router>
  );
}

export default App;
