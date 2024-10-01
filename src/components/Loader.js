import React from 'react';
import './loader.css'; // Отдельный файл стилей для лоадера

function Loader() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );
}

export default Loader;
