import React from "react";
import { Input, Button } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/NotPaylasim.css";

function NotPaylasim() {
  const navigate = useNavigate();

  const categories = ["Matematik", "Fizik", "Kimya", "Biyoloji", "Tarih"];

  // Örnek trend notlar
  const trendNotes = [
    {
      title: "İleri Matematik Ders Notları",
      description: "Karmaşık sayılar ve integraller",
      category: "Matematik",
    },
    {
      title: "Organik Kimya Ders Notları",
      description: "Hidrokarbonlar ve türevleri",
      category: "Kimya",
    },
    {
      title: "Fizik - Kuantum Mekaniği",
      description: "Kuantum teorisi üzerine özet",
      category: "Fizik",
    },
  ];

  const handleLogoClick = () => {
    navigate("/home"); // Sadece logoya tıklanıldığında yönlendirme
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="not-paylasim-wrapper">
      {/* Header */}
      <header className="not-paylasim-header">
        <div className="header-left">
          <div className="logo-section">
            <img
              src="/images/logo.jpg"
              alt="Logo"
              className="logo"
              onClick={handleLogoClick} // Sadece logo tıklamasına yönlendirme eklendi
            />
            <span className="logo-text">Öğrenciden Öğrenciye</span>
            <Input
              placeholder="Aranacak notu yazınız"
              className="search-input"
              allowClear
            />
          </div>
        </div>
        <div className="header-right">
          <Button
            type="text"
            icon={<PlusCircleOutlined />}
            className="header-button"
          >
            Not Ekle
          </Button>
          <Button
            type="text"
            icon={<HeartOutlined />}
            className="header-button"
          >
            Favorilerim
          </Button>
          <Button
            type="text"
            icon={<UserOutlined />}
            className="header-button"
            onClick={handleProfileClick}
          >
            Profilim
          </Button>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            className="header-button"
            onClick={handleLogoutClick}
          >
            Çıkış
          </Button>
        </div>
      </header>

      {/* Ana İçerik */}
      <div className="not-paylasim-content">
        {/* Dersler Sidebar */}
        <aside className="sidebar">
          <h3>Dersler</h3>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </aside>

        {/* Trend Notlar Bölümü */}
        <section className="trend-notlar-section">
          <h3>
            Trend Notlar <span className="emoji">🔥</span>
          </h3>
          <div className="trend-notes-list">
            {trendNotes.map((note, index) => (
              <div key={index} className="note-card">
                <h3>{note.title}</h3>
                <p>{note.description}</p>
                <span className="note-category">{note.category}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default NotPaylasim;
