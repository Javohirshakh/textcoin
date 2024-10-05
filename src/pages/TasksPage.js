import React from 'react';
import './tasks.css';

function TasksPage() {
  // Массив с задачами
  const tasks = [
    { 
      name: "Telegramga obuna boʻlish!", 
      reward: "+5000 UZS", 
      actionLink: "https://t.me/bmwgacha",
      check: false 
    },
    { 
      name: "Instagramda repost qilish!", 
      reward: "+300 UZS", 
      actionLink: "https://instagram.com/",
      check: false 
    },
    { 
      name: "YouTubega obuna boʻlish!", 
      reward: "+700 UZS", 
      actionLink: "https://youtube.com/",
      check: false 
    }
  ];

  // Обработчик клика по кнопке "Check"
  const handleCheck = (index) => {
    tasks[index].check = true;
    alert(`Siz ${tasks[index].name} uchun ${tasks[index].reward} oldingiz!`);
  };

  return (
    <>
    <h2 className="text-3xl font-bold">Vazifalar</h2> 
    <div className="tasks-container mt-4 bg-gray-800 mt-4 mb-8 bg-gray-800 p-2 pb-2 rounded-lg">
      {tasks.map((task, index) => (
        <div key={index} className="task-item bg-gray-700">
          <div className="task-info">
            <span className="task-name">{task.name}</span>
            <div className="task-bottom">
              <span className="task-reward">{task.reward}</span>
              <button 
                className="check-button"
                onClick={() => handleCheck(index)}
              >
                Tekshirish
              </button>
            </div>
          </div>
          <button 
            className="task-button bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded ml-4" 
            onClick={() => window.open(task.actionLink, "_blank")}
          >
            Bajarish
          </button>
        </div>
      ))}
    </div>
    </>
  );
}

export default TasksPage;
