import React, { useState } from "react";
import { Input, Button, Modal, Select } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/NotPaylasim.css";

const { TextArea } = Input;
const { Option } = Select;

function NotPaylasim() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customCategory, setCustomCategory] = useState(""); // Yeni ders için state

  const categories = ["Matematik", "Fizik", "Kimya", "Biyoloji", "Tarih", "Diğer"];

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
    navigate("/home");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(""); // Seçimi sıfırla
    setCustomCategory(""); // Yeni ders alanını temizle
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    if (value !== "Diğer") {
      setCustomCategory(""); // Eğer "Diğer" seçili değilse özel ders adını sıfırla
    }
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
              onClick={handleLogoClick}
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
            onClick={openModal}
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

      {/* Not Ekle Modal */}
      <Modal
        title="Yeni Not Ekle"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <form className="note-form">
          <label>Ders Seçiniz:</label>
          <Select
            placeholder="Bir ders seçin"
            className="note-select"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            {categories.map((category, index) => (
              <Option key={index} value={category}>
                {category}
              </Option>
            ))}
          </Select>

          {selectedCategory === "Diğer" && (
            <>
              <label>Yeni Ders Adı:</label>
              <Input
                placeholder="Ders adını girin"
                className="note-input"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            </>
          )}

          <label>Not Başlığı:</label>
          <Input placeholder="Not başlığını girin" className="note-input" />

          <label>Not İçeriği:</label>
          <TextArea
            placeholder="Notunuzu yazın"
            rows={4}
            className="note-textarea"
          />

          <Button type="primary" className="save-note-button" onClick={closeModal}>
            Kaydet
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default NotPaylasim;
