import React, { useState, useEffect } from 'react';
import './WithdrawPage.css'; 
import { useNavigate } from 'react-router-dom'; 

function WithdrawPage() {
  const [paymentType, setPaymentType] = useState('');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  // Включаем кнопку "Назад" в Telegram WebApp и добавляем обработчик
  useEffect(() => {
    const webApp = window.Telegram.WebApp;

    if (webApp) {
      webApp.BackButton.show(); 

      webApp.BackButton.onClick(() => {
        navigate('/userPage'); 
      });

      return () => {
        webApp.BackButton.hide(); 
      };
    }
  }, [navigate]);

  // Форматирование номера карты с пробелами
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, ''); // Удаляем все нецифровые символы
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || ''; // Добавляем пробелы после каждых 4 цифр
    return formatted;
  };

  // Обработчик изменения поля для ввода
  const handleAccountChange = (e) => {
    let value = e.target.value;

    // Применяем форматирование только если выбран тип оплаты "Карта"
    if (paymentType === 'card') {
      value = formatCardNumber(value);
    }

    setAccount(value);
  };

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

    // Если выбран тип оплаты "Карта", проверяем, что номер карты имеет 16 цифр
    const cleanAccount = account.replace(/\s/g, ''); 
    if (!paymentType || (paymentType === 'card' && cleanAccount.length !== 16) || !amount) {
      setError('Hammasini to\'ldiring va kartani to\'g\'ri kiriting!');
      return;
    }

    alert(`${paymentType}ga ${amount} UZS ushbu hisobga ${account} chiqarildi.`);
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
            type={paymentType === 'card' ? 'text' : 'number'} 
            value={account}
            onChange={handleAccountChange}
            className="w-full mb-4 p-2 border rounded" 
            placeholder={paymentType === 'card' ? 'Kartani kiriting' : 'Payeer ID kiriting'} 
            maxLength={paymentType === 'card' ? 19 : undefined}
            required 
          />

          <label className="block mb-2">Chiqarish summasi:</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mb-4 p-2 border rounded remove-arrows" 
            placeholder="Summani kiriting" 
            required
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
