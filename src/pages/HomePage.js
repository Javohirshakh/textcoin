import React from 'react';
import { useUser } from '../context/UserContext';

function HomePage() {
  const user = useUser();

  return (
    <>
      <h1 className="text-2xl font-bold">
        Salom, {user ? user.name : 'Mehmon'}!
      </h1>

      {user?.profilePhoto && (
        <img 
          src={user.profilePhoto} 
          alt="Profile" 
          className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-lg mt-4" 
        />
      )}
    </>
  );
}

export default HomePage;
