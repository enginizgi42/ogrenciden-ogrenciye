import React, { useState } from "react";
import { Form, Input, Button, Select, message, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/NewAd.css";

const { TextArea } = Input;
const { Option } = Select;

function NewAd() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const maxTitleLength = 61;
  const maxDescriptionLength = 300;

  const handleFormSubmit = async () => {
    if (!category || !title || !description || !price || !image) {
      message.error("Lütfen tüm alanları doldurun!");
      return;
    }

    if (price < 0) {
      message.error("Fiyat negatif olamaz!");
      return;
    }

    try {
      // Backend'e veri gönder
      const response = await axios.post("http://localhost:5181/api/Products", {
        category,
        title,
        description,
        price: parseFloat(price), // Backend için price decimal olmalı
        status: "Aktif", // Default status
        sellerId: 1, // Şimdilik sabit kullanıcı, login'den kullanıcı ID'sini alabilirsiniz
      });

      if (response.status === 200) {
        message.success("İlan başarıyla kaydedildi!");
        navigate("/ikincielesya");
      }
    } catch (error) {
      console.error(error);
      message.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="new-ad-page">
      <div className="form-container">
        <h2 className="page-title">İlan Ver</h2>
        <Form layout="vertical" onFinish={handleFormSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={`Kategori`} required>
                <Select
                  placeholder="Kategori Seçiniz"
                  onChange={(value) => setCategory(value)}
                  className="input-field"
                >
                  <Option value="Ders Materyalleri">Ders Materyalleri</Option>
                  <Option value="Elektronik">Elektronik</Option>
                  <Option value="Ev ve Mobilya">Ev ve Mobilya</Option>
                  <Option value="Giyim ve Moda">Giyim ve Moda</Option>
                  <Option value="Spor ve Hobi">Spor ve Hobi</Option>
                  <Option value="Diğer">Diğer</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={`Başlık (${title.length}/${maxTitleLength})`} required>
                <Input
                  placeholder="İlan Başlığı Giriniz"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-field"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={`Açıklama (${description.length}/${maxDescriptionLength})`} required>
                <TextArea
                  rows={4}
                  placeholder="İlan Açıklaması Giriniz"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-field"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Fiyat" required>
                <Input
                  type="number"
                  placeholder="Fiyat Giriniz"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input-field"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Görsel Yükle" required>
            <Input type="file" onChange={handleImageUpload} className="input-field" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-button">
              İlan Yayınla
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default NewAd;
