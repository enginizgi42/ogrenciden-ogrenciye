// SecondHandItems.js

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

  // Kategoriler
  const categories = [
    {
      icon: "📚",
      title: "Ders Materyalleri",
    
    },
    {
      icon: "💻",
      title: "Elektronik",
      
    },
    {
      icon: "🛋️",
      title: "Ev ve Mobilya",
    
    },
    {
      icon: "👗",
      title: "Giyim ve Moda",
     
    },
    {
      icon: "🎮",
      title: "Spor ve Hobi",
    
    },
    {
      icon: "📦",
      title: "Diğer",
    
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
          placeholder="Aradığınız ürün, kategori veya markayı yazınız"
          className="search-input"
          allowClear
        />
        <div className="header-buttons">
          <Button type="text" icon={<PlusCircleOutlined />} onClick={() => navigate("/new-ad")}>
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

      {/* Sol tarafta alt alta kategori kartları */}
      <div className="sidebar">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <div className="category-icon">{category.icon}</div>
            <h3 className="category-title">{category.title}</h3>
            <p className="category-description">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SecondHandItems;
