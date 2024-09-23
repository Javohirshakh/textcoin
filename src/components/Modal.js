import React, { useEffect } from 'react';

function Modal() {
  // Функция закрытия модального окна
  const closeModal = () => {
    document.querySelector('.modal-content').classList.remove('active');
    setTimeout(() => {
      document.getElementById('modal').classList.remove('show');
    }, 300);
  };

  // Закрытие при клике вне модального окна
  const handleClickOutside = (e) => {
    const modalContent = document.querySelector('.modal-content');
    
    // Если клик был вне контента модального окна, закрываем модальное окно
    if (!modalContent || !modalContent.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    // Добавляем обработчик клика для закрытия модалки при клике вне ее
    const modal = document.getElementById('modal');
    if (modal) {
      modal.addEventListener('click', handleClickOutside);
    }

    return () => {
      // Удаляем обработчик при размонтировании компонента
      if (modal) {
        modal.removeEventListener('click', handleClickOutside);
      }
    };
  }, []);

  return (
    <div id="modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end">
      {/* Модальное содержимое */}
      <div className="modal-content bg-white w-full h-auto max-h-80 p-4 relative">
        <span className="material-icons absolute top-2 right-4 cursor-pointer" id="close-modal" onClick={closeModal}>
          close
        </span>
        <h2 className="text-lg font-bold mb-4">Bank kartangizni ulang</h2>
        <form>
          <label htmlFor="card-number" className="block text-gray-700 mb-2">Karta raqami</label>
          <input type="text" id="card-number" className="w-full p-2 border border-gray-300 rounded mb-4" placeholder="1234 5678 9012 3456" />

          <label htmlFor="expiry-date" className="block text-gray-700 mb-2">Amal qilish muddati</label>
          <input type="text" id="expiry-date" className="w-full p-2 border border-gray-300 rounded mb-4" placeholder="MM/YY" />

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Kartaning ulash</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
