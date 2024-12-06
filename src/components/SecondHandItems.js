import React, { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import { HeartOutlined, PlusCircleOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SecondHandItems.css";

function SecondHandItems() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null); // Sidebar için gerekli state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5181/api/Products");
        setProducts(response.data);
      } catch (error) {
        message.error("Ürünler alınırken hata oluştu!");
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleMessages = () => {
    navigate("/messages");
  };

  const handleMyAds = () => {
    navigate("/my-ads");
  };

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
    <div className="second-hand-page">
      {/* Header */}
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
          <Button type="text" icon={<PlusCircleOutlined />} onClick={() => navigate("/new-ad")}>
            İlan Ver
          </Button>
          <div
            className="account-dropdown-container"
            onMouseEnter={() => setHoveredCategory("account")}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Button type="text" icon={<UserOutlined />}>
              Hesabım
            </Button>
            {hoveredCategory === "account" && (
              <div className="account-dropdown">
                <div onClick={handleProfile}>Kullanıcı Bilgilerim</div>
                <div onClick={handleMessages}>Mesajlar</div>
                <div onClick={handleMyAds}>İlanlarım</div>
              </div>
            )}
          </div>
          <Button type="text" icon={<HeartOutlined />}>
            Favorilerim
          </Button>
          <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>
            Çıkış
          </Button>
        </div>
      </header>

      {/* Sidebar */}
      <div className="sidebar">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card"
            onMouseEnter={() => setHoveredCategory(index)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="category-icon">{category.icon}</div>
            <h3 className="category-title">{category.title}</h3>
            {hoveredCategory === index && (
              <div className="category-dropdown">
                <ul>
                  {category.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Product Cards */}
      <div className="ads-container">
        {products.length === 0 ? (
          <p>Henüz bir ilan bulunmuyor.</p>
        ) : (
          products.map((product) => (
            <div key={product.productId} className="ad-card">
              <HeartOutlined
                className="favorite-icon"
                onClick={() => toggleFavorite(product.productId)}
                style={{
                  color: favorites.includes(product.productId) ? "#f44336" : "#ccc",
                }}
              />
              <div className="ad-image-container">
                <img
                  alt={product.title}
                  src={`http://localhost:5181${product.imagePath}`}
                  className="ad-image"
                />
              </div>
              <div className="ad-details">
                <div className="ad-title">{product.title}</div>
                <div className="ad-price">{product.price} TL</div>
                <div className="ad-description">{product.description}</div>
                <button className="add-to-cart-button">Sepete Ekle</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SecondHandItems;
