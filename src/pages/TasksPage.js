import React, { useState, useEffect } from 'react';
import { GetAPI } from '../api/api'; // Импортируем API-функцию
import Loader from '../components/Loader'; // Импортируем компонент Loader
import './tasks.css';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Используем useEffect для запроса к API при монтировании компонента
  useEffect(() => {
    const fetchTasks = async () => {
      const result = await GetAPI(1234, null, ["gettask"]);
      
      if (result.status) {
        setTasks(result.gettask);
      }
      setIsLoading(false);
    };

    fetchTasks();
  }, []);

  // Обработчик для выполнения задачи
  const handleCheck = (index) => {
    tasks[index].status = false; // Обновляем статус на "выполнено"
    alert(`Siz "${tasks[index].task}" uchun ${tasks[index].summa} UZS oldingiz!`);
    setTasks([...tasks]); // Обновляем состояние для повторного рендеринга
  };

  if (isLoading) {
    return <Loader />; // Показываем компонент Loader вместо текста "Loading..."
  }

  return (
    <>
      <h2 className="text-3xl font-bold">Vazifalar</h2> 
      <div className="tasks-container mt-4 bg-gray-800 mt-4 mb-8 bg-gray-800 p-2 pb-2 rounded-lg">
        {tasks.map((task, index) => (
          <div key={index} className="task-item bg-gray-700">
            <div className="task-info">
              <span className="task-name">{task.task}</span>
              <div className="task-bottom">
                <span className="task-reward">{task.summa} UZS</span>
                {task.status ? (
                  <button 
                    className="check-button"
                    onClick={() => handleCheck(index)}
                  >
                    Tekshirish
                  </button>
                ) : (
                  <span className="task-done text-green-500">Bajarildi</span>
                )}
              </div>
            </div>
            {task.status && (
              <button 
                className="task-button bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded ml-4" 
                onClick={() => window.open(task.url, "_blank")}
              >
                Bajarish
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default TasksPage;
