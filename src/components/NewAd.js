import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/NewAd.css";

const { TextArea } = Input;
const { Option } = Select;

function NewAd() {
  const [form] = Form.useForm(); // Form instance for better handling
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [sellerEmail, setSellerEmail] = useState("");
  const navigate = useNavigate();

  // Kullanıcı bilgilerini localStorage'dan yükleme
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setSellerEmail(email); // Kullanıcı e-posta adresini state'e kaydet
    } else {
      message.error("Kullanıcı bilgisi bulunamadı, lütfen giriş yapın.");
      navigate("/login");
    }
  }, [navigate]);

  // Form gönderim işlemi
  const handleFormSubmit = async () => {
    if (!category || !title || !price || !description) {
      message.error("Lütfen tüm alanları doldurun!");
      return;
    }

    const formData = new FormData();
    formData.append("Category", category);
    formData.append("Title", title);
    formData.append("Description", description || "");
    formData.append("Price", parseFloat(price));
    formData.append("SellerEmail", sellerEmail);

    if (image) {
      formData.append("Image", image); // Görseli ekle
    }

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
      console.error("Hata Detayları:", error.response || error.message);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  // Görsel yükleme işlemi
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    if (file && !allowedTypes.includes(file.type)) {
      message.error("Yalnızca JPEG veya PNG formatındaki resimler yüklenebilir.");
      return;
    }
    setImage(file); // Görseli state'e kaydet
  };

  return (
    <div className="new-ad-page">
      <div className="form-container">
        <h2>İlan Ver</h2>
        <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
          <Form.Item label="Satıcı">
            <Input value={sellerEmail} disabled />
          </Form.Item>

          <Form.Item label="Kategori" required>
            <Select
              placeholder="Kategori Seçiniz"
              onChange={(value) => setCategory(value)}
              value={category}
            >
              <Option value="Ders Materyalleri">Ders Materyalleri</Option>
              <Option value="Elektronik">Elektronik</Option>
              <Option value="Ev ve Mobilya">Ev ve Mobilya</Option>
              <Option value="Giyim ve Moda">Giyim ve Moda</Option>
              <Option value="Spor ve Hobi">Spor ve Hobi</Option>
              <Option value="Diğer">Diğer</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Başlık" required>
            <Input
              placeholder="İlan Başlığı Giriniz"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Fiyat" required>
            <Input
              type="number"
              placeholder="Fiyat Giriniz"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Açıklama">
            <TextArea
              rows={4}
              placeholder="İlan Açıklaması Giriniz"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Görsel Yükle">
            <Input type="file" onChange={handleImageUpload} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              İlan Yayınla
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default NewAd;
