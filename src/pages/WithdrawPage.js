import React, { useState, useEffect } from 'react';
import './WithdrawPage.css'; // Импортируем стили
import { useNavigate } from 'react-router-dom'; // Для навигации между страницами

function WithdrawPage() {
  const [paymentType, setPaymentType] = useState('');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Хук для навигации

  // Включаем кнопку "Назад" в Telegram WebApp и добавляем обработчик
  useEffect(() => {
    const webApp = window.Telegram.WebApp;

    if (webApp) {
      webApp.BackButton.show(); // Показываем кнопку "Назад"

      webApp.BackButton.onClick(() => {
        navigate('/userPage'); // Возвращаемся на страницу UserPage
      });

      return () => {
        webApp.BackButton.hide(); // Прячем кнопку "Назад" при уходе со страницы
      };
    }
  }, [navigate]);

  // Обработчик для выбора типа оплаты
  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
    setAccount('');
    setAmount('');
    setError('');
  };

  // Обработчик для отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentType || !account || !amount) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }
    alert(`Вывод на ${paymentType}: ${amount} UZS на счет ${account}.`);
  };

  return (
    <div className="withdraw-container">
      <h2 className="text-3xl font-bold mb-6">Pul chiqarish</h2>

      {/* Блок для выбора типа оплаты */}
      <div className="payment-type-selection mb-8">
        <button 
          className={`payment-type ${paymentType === 'card' ? 'active' : ''}`} 
          onClick={() => handlePaymentTypeChange('card')}
        >
          Kartaga
        </button>
        <button 
          className={`payment-type ${paymentType === 'payeer' ? 'active' : ''}`} 
          onClick={() => handlePaymentTypeChange('payeer')}
        >
          Payeer
        </button>
      </div>

      {/* Форма вывода */}
      {paymentType && (
        <form onSubmit={handleSubmit} className="withdraw-form">
          <label className="block mb-2">Chiqarish uchun hisob:</label>
          <input 
            type="text" 
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="w-full mb-4 p-2 border rounded" 
            placeholder={paymentType === 'card' ? 'Kartani kiriting' : 'Payeer ID kiriting'} 
          />

          <label className="block mb-2">Chiqarish summasi:</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mb-4 p-2 border rounded" 
            placeholder="Summani kiriting" 
          />

          {/* Кнопка для подтверждения */}
          <button type="submit" className="submit-button">
            Chiqarish
          </button>

          {/* Ошибка при неполных данных */}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      )}
    </div>
  );
}

export default WithdrawPage;
