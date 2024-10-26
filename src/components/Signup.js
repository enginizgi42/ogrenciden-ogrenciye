import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      message.error("Şifreler eşleşmiyor!");
      return;
    }

    if (!email.endsWith(".edu.tr")) {
      message.error("Lütfen geçerli bir .edu.tr uzantılı e-posta adresi girin!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5181/api/Auth/register", {
        email,
        firstName,
        lastName,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.success) {
        message.success("Başarıyla kayıt olundu!");
        navigate("/login");
      } else {
        message.error("Kayıt başarısız!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error("Gönderilen veriler geçersiz!");
      } else {
        message.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  const isFormValid = email && firstName && lastName && password && confirmPassword;

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Kayıt Ol</h2>
        <Form layout="vertical" onFinish={handleSignup}>
          <Form.Item label="Ad">
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Adınızı girin"
              required
            />
          </Form.Item>
          <Form.Item label="Soyad">
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Soyadınızı girin"
              required
            />
          </Form.Item>
          <Form.Item label="E-posta">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresinizi girin"
              required
            />
          </Form.Item>
          <Form.Item label="Şifre">
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
              required
            />
          </Form.Item>
          <Form.Item label="Şifreyi Tekrar Girin">
            <Input.Password
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Şifrenizi tekrar girin"
              required
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={!isFormValid}>
              Kayıt Ol
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
