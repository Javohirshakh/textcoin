import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext'; 
import { GetAPI } from '../api/api';  // Импортируем функцию из api.js

function Modal() {
  const user = useUser()
  const [cardNumber, setCardNumber] = useState('');

  const closeModal = () => {
    document.querySelector('.modal-content').classList.remove('active');
    setTimeout(() => {
      document.getElementById('modal').classList.remove('show');
    }, 300);
  };

  // Форматируем номер карты с пробелами
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, ''); // Удаляем все нецифровые символы
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || ''; // Добавляем пробелы после каждых 4 цифр
    return formatted;
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cleanCardNumber = cardNumber.replace(/\s/g, '');
      const result = await GetAPI(user.user.id, 'savecard', { card: cleanCardNumber });

      console.log("Ответ от API:", result);

      if (result.status) {
        alert("Karta muvaffaqiyatli ulandi!");
        closeModal(); // Закрываем модальное окно
      } else {
        alert("Xato: " + (result.msg || "Kartani ulab bo'lmadi, Keyinroq urinib ko'ring"));
      }
    } catch (error) {
      console.error("Ошибка при запросе:", error);
      alert("Произошла ошибка, попробуйте позже.");
    }
  };

  useEffect(() => {
    // Закрытие модального окна при клике вне его содержимого
    const handleClickOutside = (e) => {
      const modalContent = document.querySelector('.modal-content');
      const modal = document.getElementById('modal');
      // Проверяем, был ли клик за пределами модального содержимого
      if (modalContent && !modalContent.contains(e.target) && modal.classList.contains('show')) {
        closeModal();
      }
    };

    // Добавляем событие
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Удаляем событие при размонтировании
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>

      <div id="modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end">
        {/* Модальное содержимое */}
        <div className="modal-content bg-white w-full h-auto max-h-80 p-4 relative">
          <span className="material-icons absolute top-2 right-4 cursor-pointer" id="close-modal" onClick={closeModal}>
            close
          </span>
          <h2 className="text-lg font-bold mb-4">Bank kartangizni ulang</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="card-number" className="block text-gray-700 mb-2">Karta raqami</label>
            <input 
              type="text" 
              id="card-number" 
              className="w-full p-2 border border-gray-300 rounded mb-4" 
              placeholder="1234 5678 9012 3456" 
              value={cardNumber}
              onChange={handleCardNumberChange}
              minLength={19}
              maxLength={19}
              pattern="\d{4} \d{4} \d{4} \d{4}"
              required
            />
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Kartani ulash
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
