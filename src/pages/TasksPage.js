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
        // Сортируем задачи так, чтобы выполненные были внизу
        const sortedTasks = result.gettask.sort((a, b) => a.status === b.status ? 0 : a.status ? -1 : 1);
        setTasks(sortedTasks);
      } else {
        alert("Vazifalar topilmadi.");
      }
      setIsLoading(false);
    };

    fetchTasks();
  }, []);

  // Обработчик для проверки задачи
  const handleCheck = async (taskId, index) => {
    try {
      // Отправляем запрос для проверки задачи
      const result = await GetAPI(1234, 'check.task', { task_id: taskId });

      console.log("Ответ от API проверки задачи:", result);

      // Проверяем статус ответа и показываем соответствующее сообщение
      if (result.status) {
        alert(result.msg || "Vazifa muvaffaqiyatli bajarildi!"); // Показываем успешное сообщение
        tasks[index].status = false; // Обновляем статус задачи на "выполнено"
        const updatedTasks = [...tasks].sort((a, b) => a.status === b.status ? 0 : a.status ? -1 : 1);
        setTasks(updatedTasks); // Обновляем состояние для повторного рендеринга
      } else {
        alert(result.msg || "Xato: Vazifani tekshirib bo'lmadi, keyinroq urinib ko'ring.");
      }
    } catch (error) {
      console.error("Ошибка при проверке задачи:", error);
      alert("Xatolik yuz berdi. Keyinroq urinib ko'ring.");
    }
  };

  if (isLoading) {
    return <Loader />; // Показываем компонент Loader пока загружаются задачи
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
                    onClick={() => handleCheck(task.task_id, index)} // Передаем task_id для проверки
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
