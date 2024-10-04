import React from 'react';
import './tasks.css';

function TasksPage() {
  // Массив с задачами
  const tasks = [
    { 
      name: "Telegramga obuna!", 
      reward: "+5000 UZS", 
      actionLink: "https://t.me/bmwgacha",
      check: false 
    },
    { 
      name: "Instagramga obuna!", 
      reward: "+300 UZS", 
      actionLink: "https://instagram.com/",
      check: false 
    },
    { 
      name: "Youtubega obuna!", 
      reward: "+700 UZS", 
      actionLink: "https://youtube.com/",
      check: false 
    }
  ];

  // Обработчик клика по кнопке "Check"
  const handleCheck = (index) => {
    // Обновление задачи при нажатии "Check"
    tasks[index].check = true;
    alert(`Siz ${tasks[index].name} uchun ${tasks[index].reward} oldingiz!`);
  };

  return (
    <div className="tasks-container">
      <h2>Vazifalar</h2>
      {tasks.map((task, index) => (
        <div key={index} className="task-item">
          <div className="task-info">
            <p className="task-name">{task.name}</p>
            <div className='task-bottom'>
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
            className="task-button" 
            onClick={() => window.open(task.actionLink, "_blank")}
          >
            Join
          </button>
        </div>
      ))}
    </div>
  );
}

export default TasksPage;
