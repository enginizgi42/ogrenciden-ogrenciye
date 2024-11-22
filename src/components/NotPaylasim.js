import React, { useState } from "react";
import { Input, Button, Modal, Select } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/NotPaylasim.css";

const { TextArea } = Input;
const { Option } = Select;

function NotPaylasim() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [trendNotes, setTrendNotes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([
    "Matematik",
    "Fizik",
    "Kimya",
    "Biyoloji",
    "Tarih",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [newNote, setNewNote] = useState({ title: "", description: "", category: "" });

  const maxTitleLength = 25; // Başlık için maksimum karakter sınırı

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
    setSelectedCategory("");
    setCustomCategory("");
    setNewNote({ title: "", description: "", category: "" });
  };

  const openFavoritesModal = () => {
    setIsFavoritesModalOpen(true);
  };

  const closeFavoritesModal = () => {
    setIsFavoritesModalOpen(false);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setNewNote((prev) => ({
      ...prev,
      category: value === "Diğer" ? customCategory : value,
    }));
  };

  const handleSaveNote = () => {
    if (selectedCategory === "Diğer" && customCategory) {
      setCategories((prev) => [...prev, customCategory]);
    }

    const noteToAdd = {
      id: trendNotes.length + 1,
      title: newNote.title,
      description: newNote.description,
      category: selectedCategory === "Diğer" ? customCategory : selectedCategory,
    };

    setTrendNotes((prev) => [noteToAdd, ...prev]);
    closeModal();
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const favoriteNotes = trendNotes.filter((note) => favorites.includes(note.id));

  return (
    <div className="not-paylasim-wrapper">
      {/* Header */}
      <header className="not-paylasim-header">
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
            icon={<HeartFilled />}
            className="header-button"
            onClick={openFavoritesModal}
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
        <aside className="sidebar">
          <h3>Dersler</h3>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </aside>

        <section className="trend-notlar-section">
          <h3>
            Trend Notlar <span className="emoji">🔥</span>
          </h3>
          <div className="trend-notes-list">
            {trendNotes.map((note) => (
              <div key={note.id} className="note-card">
                <h3>{note.title}</h3>
                <p>{note.description}</p>
                <span className="note-category">{note.category}</span>
                {favorites.includes(note.id) ? (
                  <HeartFilled
                    className="favorite-icon favorited"
                    onClick={() => toggleFavorite(note.id)}
                  />
                ) : (
                  <HeartOutlined
                    className="favorite-icon"
                    onClick={() => toggleFavorite(note.id)}
                  />
                )}
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
            <Option value="Diğer">Diğer</Option>
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

          <label>Not Başlığı (Max {maxTitleLength} karakter):</label>
          <Input
            placeholder="Not başlığını girin"
            className="note-input"
            value={newNote.title}
            onChange={(e) =>
              e.target.value.length <= maxTitleLength &&
              setNewNote((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <p>
            {newNote.title.length}/{maxTitleLength} karakter
          </p>

          <label>Not İçeriği:</label>
          <TextArea
            placeholder="Notunuzu yazın"
            rows={4}
            className="note-textarea"
            value={newNote.description}
            onChange={(e) =>
              setNewNote((prev) => ({ ...prev, description: e.target.value }))
            }
          />

          <Button
            type="primary"
            className="save-note-button"
            onClick={handleSaveNote}
          >
            Kaydet
          </Button>
        </form>
      </Modal>

      {/* Favoriler Modal */}
      <Modal
        title="Favori Notlar"
        visible={isFavoritesModalOpen}
        onCancel={closeFavoritesModal}
        footer={null}
      >
        {favoriteNotes.length > 0 ? (
          <div className="favorites-list">
            {favoriteNotes.map((note) => (
              <div key={note.id} className="favorite-note-card">
                <h4>{note.title}</h4>
                <HeartFilled
                  className="favorite-icon favorited"
                  onClick={() => toggleFavorite(note.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>Favorilerde henüz bir not yok.</p>
        )}
      </Modal>
    </div>
  );
}

export default NotPaylasim;
