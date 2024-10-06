import React, { useState } from 'react';
import { GetAPI } from '../api/api';  // Импортируем функцию из api.js

function Modal() {
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
      // Удаляем пробелы перед отправкой на сервер
      const cleanCardNumber = cardNumber.replace(/\s/g, '');
      const result = await GetAPI(777, 'savecard', { card: cleanCardNumber });

      console.log("Ответ от API:", result);

      // Логика обработки ответа
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

  return (
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
            minLength={19}  // Минимум 19 символов (с пробелами)
            maxLength={19}  // Максимум 19 символов (с пробелами)
            pattern="\d{4} \d{4} \d{4} \d{4}"  // Только цифры и пробелы
            required  // Обязательно для заполнения
          />

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Kartani ulash
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
