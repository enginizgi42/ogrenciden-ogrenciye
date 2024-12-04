import React, { useState } from "react";
import { Input, Button, Modal, Select, Upload, Card } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  UploadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/EvArkadasi.css";

const { Meta } = Card;
const { TextArea } = Input;
const { Option } = Select;

function EvArkadasi() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ads, setAds] = useState([
    {
      id: 1,
      address: "Kadıköy, İstanbul",
      features: "3+1, balkonlu, eşyalı",
      price: "4500 TL",
      description: "Metroya yakın, geniş ve kullanışlı.",
      photo: "/images/house1.jpeg",
    },
    {
      id: 2,
      address: "Bornova, İzmir",
      features: "2+1, bahçeli",
      price: "3000 TL",
      description: "Sessiz ve doğa ile iç içe bir çevre.",
      photo: "/images/house2.jpeg",
    },
    {
      id: 3,
      address: "Çankaya, Ankara",
      features: "1+1, metroya yakın",
      price: "2500 TL",
      description: "Minimalist yaşam tarzına uygun.",
      photo: "/images/house3.jpeg",
    },
  ]);

  const [newAd, setNewAd] = useState({
    address: "",
    features: "",
    price: "",
    roommateCriteria: "",
    description: "",
    photo: null,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewAd({
      address: "",
      features: "",
      price: "",
      roommateCriteria: "",
      description: "",
      photo: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAd((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      setNewAd((prev) => ({ ...prev, photo: info.file.originFileObj }));
    }
  };

  const handleSaveAd = () => {
    const newAdWithId = {
      ...newAd,
      id: ads.length + 1,
      photo: newAd.photo ? URL.createObjectURL(newAd.photo) : null,
    };
    setAds([...ads, newAdWithId]);
    closeModal();
  };

  const handleLogoClick = () => navigate("/home");
  const handleProfileClick = () => navigate("/profile");
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="evarkadasi-wrapper">
      {/* Header */}
      <header className="evarkadasi-header">
        <div className="logo-section" onClick={handleLogoClick}>
          <img src="/images/logo.jpg" alt="Logo" className="logo" />
          <span className="logo-text">Öğrenciden Öğrenciye</span>
        </div>
        <div className="header-middle">
          <Input
            placeholder="Arama yapın..."
            prefix={<SearchOutlined />}
            className="search-input"
          />
        </div>
        <div className="header-right">
          <Button
            type="primary"
            className="header-button"
            icon={<PlusCircleOutlined />}
            onClick={openModal}
          >
            İlan Ver
          </Button>
          <Button
            type="text"
            className="header-button"
            icon={<UserOutlined />}
            onClick={handleProfileClick}
          >
            Profilim
          </Button>
          <Button
            type="text"
            className="header-button"
            icon={<LogoutOutlined />}
            onClick={handleLogoutClick}
          >
            Çıkış Yap
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="evarkadasi-content">
        <h1 className="page-title">Ev Arkadaşı İlanları</h1>
        <div className="ads-list">
          {ads.map((ad) => (
            <Card
              key={ad.id}
              hoverable
              cover={<img alt="Ev Fotoğrafı" src={ad.photo || "/images/default.jpg"} />}
              className="ad-card"
            >
              <Meta
                title={`${ad.address} - ${ad.price}`}
                description={`${ad.features} | ${ad.description}`}
              />
            </Card>
          ))}
        </div>
      </div>

      {/* İlan Ver Modal */}
      <Modal
        title="Ev Arkadaşı İlanı Ver"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
        className="ad-modal"
      >
        <form className="ad-form">
          <div className="form-group">
            <label>Ev Adresi:</label>
            <Input
              placeholder="Ev adresini girin"
              name="address"
              value={newAd.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Ev Özellikleri:</label>
            <Input
              placeholder="Örneğin: 3+1, balkonlu, eşyalı"
              name="features"
              value={newAd.features}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Kira Ücreti (TL):</label>
            <Input
              placeholder="Kira miktarını yazın"
              name="price"
              value={newAd.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Ev Arkadaşı Kriterleri:</label>
            <TextArea
              rows={3}
              placeholder="İstenen kriterleri belirtin"
              name="roommateCriteria"
              value={newAd.roommateCriteria}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Açıklama:</label>
            <TextArea
              rows={4}
              placeholder="Ev hakkında genel bilgi ve diğer açıklamalar"
              name="description"
              value={newAd.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Fotoğraf Yükle:</label>
            <Upload
              accept="image/*"
              maxCount={1}
              beforeUpload={() => false}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Fotoğraf Seç</Button>
            </Upload>
          </div>
          <Button type="primary" className="save-ad-button" onClick={handleSaveAd}>
            Kaydet
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default EvArkadasi;
