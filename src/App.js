import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import HomePage from './pages/HomePage';
import GroupsPage from './pages/GroupsPage';
import ReferralPage from './pages/ReferralPage';
import TasksPage from './pages/TasksPage';
import UserPage from './pages/UserPage';
import WithdrawPage from './pages/WithdrawPage';
import { UserProvider } from './context/UserContext'; 
import './styles.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <UserProvider>
      <Router>
        <div className="App">
        {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
          <Header />
          <main className="container mx-auto text-center p-2 pb-20" id="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/groupsPage" element={<GroupsPage />} />
              <Route path="/referralPage" element={<ReferralPage />} />
              <Route path="/userPage" element={<UserPage />} />
              <Route path="/withdraw" element={<WithdrawPage />} />
              <Route path="/tasksPage" element={<TasksPage />} />
            </Routes>
          </main>
          <Footer />
          <Modal />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
