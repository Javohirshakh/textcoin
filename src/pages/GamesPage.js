import React, { useState } from 'react';
import GroupList from '../components/GroupList';

function GamesPage() {
  const [showGroups, setShowGroups] = useState(false);

  return (
    <>
      <h2 className="text-3xl font-bold">O'yinlar</h2>
      <p className="text-gray-400 mt-2">O'zingizga yoqqan o'yinni o'ynang va pul ishlang.</p>
      <div className="mt-4 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg">Mashxur o'yinlar</h3>
        <ul className="text-left text-gray-400">
          <li>
            <button onClick={() => setShowGroups(!showGroups)} className="text-blue-500 hover:underline">
              O'yin guruhlari
            </button>
          </li>
        </ul>
        {showGroups && <GroupList />}
      </div>
    </>
  );
}

export default GamesPage;
