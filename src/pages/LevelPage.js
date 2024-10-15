import React from 'react';
import './levelPage.css'; // Импортируем CSS

function LevelPage() {
    const currentLevel = 1
//   const [currentLevel, setCurrentLevel] = useState(1); // Текущий уровень
  const invitedFriends = 17; // Количество приглашенных друзей (пример для прогресса)

  const levels = [
    {
      id: 1,
      name: "1-daraja",
      limit: 250,
      condition: "Aktiv", 
    },
    {
      id: 2,
      name: "2-daraja",
      limit: 350,
      condition: "50 ta do'st", 
    },
    {
      id: 3,
      name: "3-daraja",
      limit: 500,
      condition: "100 ta do'st", 
    }
  ];

  // Прогресс к следующему уровню
  const progress = Math.min((invitedFriends / 50) * 100, 100); 

  return (
    <div className="level-page">
      <h2 className="text-3xl font-bold mb-4">Sizning darajangiz</h2>

      {/* Прогресс бар */}
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-center mt-2">
        Keyingi darajagacha: {invitedFriends} / 50
      </p>

      {/* Информация о уровнях */}
      <div className="levels-container">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`level-item ${
              level.id === currentLevel ? 'active-level' : ''
            }`}
          >
            <h3 className="text-xl font-bold">{level.name}</h3>
            <p>Kunlik limit: {level.limit} ta xabar</p>
            <p>Shart: {level.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LevelPage;
