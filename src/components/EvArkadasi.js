import React from "react";
import "../styles/EvArkadasi.css";

function EvArkadasi() {
  return (
    <div className="evarkadasi-container">
      <h1 className="evarkadasi-header">Ev Arkadaşı Bulma</h1>
      <p className="evarkadasi-description">
        Benzer karakterdeki kişilerle eşleşmek ve ev arkadaşı bulmak için
        ilanlarınızı oluşturun.
      </p>
      <div className="evarkadasi-content">
        <button className="evarkadasi-button">İlan Oluştur</button>
        <button className="evarkadasi-button">İlanları Görüntüle</button>
      </div>
    </div>
  );
}

export default EvArkadasi;
