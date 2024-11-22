import React, { useState, useEffect } from "react";
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
  const [sellerEmail, setSellerEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setSellerEmail(email);
    } else {
      message.error("Kullanıcı bilgisi bulunamadı!");
      navigate("/login");
    }
  }, [navigate]);

  const handleFormSubmit = async () => {
    if (!category || !title || !price || !image) {
      message.error("Lütfen tüm alanları doldurun!");
      return;
    }

    const formData = new FormData();
    formData.append("Category", category);
    formData.append("Title", title);
    formData.append("Description", description);
    formData.append("Price", parseFloat(price));
    formData.append("SellerEmail", sellerEmail);
    formData.append("Image", image);

    try {
      const response = await axios.post("http://localhost:5181/api/Products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        message.success("İlan başarıyla oluşturuldu!");
        navigate("/ikincielesya");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];

    if (file && !allowedTypes.includes(file.type)) {
      message.error("Yalnızca JPEG veya PNG formatındaki resimler yüklenebilir.");
      return;
    }

    setImage(file);
  };

  return (
    <div className="new-ad-page">
      <div className="form-container">
        <h2 className="page-title">İlan Ver</h2>
        <Form layout="vertical" onFinish={handleFormSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Satıcı">
                <Input value={sellerEmail} disabled className="input-field" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Kategori" required>
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
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Başlık" required>
                <Input
                  placeholder="İlan Başlığı Giriniz"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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

          <Form.Item label="Açıklama">
            <TextArea
              rows={4}
              placeholder="İlan Açıklaması Giriniz"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
            />
          </Form.Item>

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
