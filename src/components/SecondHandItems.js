import React from "react";
import { Input, Button } from "antd";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  MessageOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/SecondHandItems.css";

function SecondHandItems() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  // Kategoriler ve Alt Ürünler
  const categories = [
    {
      icon: "📚",
      title: "Ders Materyalleri",
      items: ["Ders Kitapları", "Notlar", "Kırtasiye Malzemeleri", "Test Kitapları"],
    },
    {
      icon: "💻",
      title: "Elektronik",
      items: ["Telefonlar", "Dizüstü Bilgisayarlar", "Kulaklıklar", "Tabletler"],
    },
    {
      icon: "🛋️",
      title: "Ev ve Mobilya",
      items: ["Masa", "Sandalye", "Kitaplık", "Dekoratif Ürünler"],
    },
    {
      icon: "👗",
      title: "Giyim ve Moda",
      items: ["Kadın Kıyafetleri", "Erkek Kıyafetleri", "Ayakkabılar", "Aksesuarlar"],
    },
    {
      icon: "🎮",
      title: "Spor ve Hobi",
      items: ["Spor Ekipmanları", "Müzik Aletleri", "Oyun Konsolları", "Puzzle"],
    },
    {
      icon: "📦",
      title: "Diğer",
      items: ["Evcil Hayvan Malzemeleri", "Seyahat Çantaları", "Bahçe Ekipmanları"],
    },
  ];

  return (
    <div>
      {/* Header kısmı */}
      <header className="second-hand-header">
        <div className="logo" onClick={() => navigate("/home")}>
          <img src="/images/logo.jpg" alt="Logo" className="logo-image" />
          <span className="logo-text">Öğrenciden Öğrenciye</span>
        </div>
        <Input
          placeholder="Aradığınız ürün, kategori veya markayı yazınız.."
          className="search-input"
          allowClear
        />
        <div className="header-buttons">
          <Button
            type="text"
            icon={<PlusCircleOutlined />}
            onClick={() => navigate("/new-ad")} // İlan Ver sayfasına yönlendirme
          >
            İlan Ver
          </Button>
          <Button type="text" icon={<UserOutlined />} onClick={handleProfile}>
            Hesabım
          </Button>
          <Button type="text" icon={<HeartOutlined />} onClick={() => navigate("/favorites")}>
            Favorilerim
          </Button>
          <Button type="text" icon={<MessageOutlined />} onClick={() => navigate("/messages")}>
            Mesajlar
          </Button>
          <Button type="text" icon={<ShoppingCartOutlined />} onClick={() => navigate("/cart")}>
            Sepetim
          </Button>
          <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>
            Çıkış
          </Button>
        </div>
      </header>

      {/* Kategori Sidebar */}
      <div className="sidebar">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <div className="category-icon">{category.icon}</div>
            <h3 className="category-title">{category.title}</h3>
            <div className="category-dropdown">
              <ul>
                {category.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SecondHandItems;
