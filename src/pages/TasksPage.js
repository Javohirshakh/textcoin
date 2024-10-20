import React, { useState, useEffect } from 'react';
import { GetAPI } from '../api/api'; // Импортируем API-функцию
import Loader from '../components/Loader'; // Импортируем компонент Loader
import { useUser } from '../context/UserContext'; // Импортируем контекст пользователя
import './tasks.css';

function TasksPage() {
  const user = useUser(); // Получаем информацию о пользователе из контекста
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.user?.id) {
      // Если user.id нет, прекращаем загрузку
      setIsLoading(false);
      return;
    }

    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const result = await GetAPI(user.user.id, null, ["gettask"]); // Используем ID пользователя

        if (result.status) {
          // Сортируем задачи так, чтобы выполненные были внизу
          const sortedTasks = result.gettask.sort((a, b) => a.status === b.status ? 0 : a.status ? -1 : 1);
          setTasks(sortedTasks);
        } else {
          console.error("Vazifalar topilmadi.");
        }
      } catch (error) {
        console.error("Ошибка API:", error);
      } finally {
        setIsLoading(false); // Завершаем загрузку
      }
    };

    fetchTasks();
  }, [user?.user?.id]); // Зависимость от ID пользователя

  // Обработчик для проверки задачи
  const handleCheck = async (taskId, index) => {
    try {
      // Отправляем запрос для проверки задачи
      const result = await GetAPI(user.user.id, 'check.task', { task_id: taskId }); // Используем ID пользователя

      if (result.status) {
        alert(result.msg || "Vazifa muvaffaqiyatli bajarildi!"); 
        tasks[index].status = false; 
        const updatedTasks = [...tasks].sort((a, b) => a.status === b.status ? 0 : a.status ? -1 : 1);
        setTasks(updatedTasks);
      } else {
        alert(result.msg || "Xato: Vazifani tekshirib bo'lmadi, keyinroq urinib ko'ring.");
      }
    } catch (error) {
      console.error("Ошибка при проверке задачи:", error);
      alert("Xatolik yuz berdi. Keyinroq urinib ko'rинг.");
    }
  };

  if (isLoading) {
    return <Loader />; // Показываем компонент Loader, пока загружаются задачи
  }

  return (
    <>
      <h2 className="text-3xl font-bold">Vazifalar</h2> 
      <div className="tasks-container mt-4 mb-8 pb-2 rounded-lg">
        {tasks.length === 0 ? ( // Проверка наличия задач
          <p className="text-gray-400">Vazifalar topilmadi!</p>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="task-item">
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
                  onClick={() => window.open(task.url, "_blank")} target="_blank"
                  rel="noopener noreferrer"
                >
                  Bajarish
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default TasksPage;
