import React from 'react';

function UserPage() {
  return (
    <>
      <h2 className="text-3xl font-bold">Bonuslar</h2>
      <p className="text-gray-400 mt-2">Bonuslaringizni tekshiring.</p>
      <div className="mt-4 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg">Mavjud bonuslar</h3>
        <ul className="text-left text-gray-400">
          <li>Bonus 1</li>
          <li>Bonus 2</li>
          <li>Bonus 3</li>
        </ul>
      </div>
    </>
  );
}

export default UserPage;


