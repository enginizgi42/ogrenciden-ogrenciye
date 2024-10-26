import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      message.error("Lütfen e-posta ve şifrenizi girin!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5181/api/Auth/login", 
        { email, password }, 
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success) {
        message.success("Başarıyla giriş yapıldı!");
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        message.error("Kullanıcı adı veya şifre hatalı!");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error("Kullanıcı adı veya şifre hatalı!");
      } else {
        message.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src="/images/logo.jpg" alt="Logo" className="login-logo" />
        <h2>Hoşgeldiniz</h2>
        <Form layout="vertical" onFinish={handleLogin} className="login-form">
          <Form.Item label={<span className="input-label">Kullanıcı Adı</span>} style={{ marginBottom: "15px" }}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Lütfen @edu.tr formatı ile giriniz"
              required
            />
          </Form.Item>
          <Form.Item label={<span className="input-label">Şifre</span>} style={{ marginBottom: "15px" }}>
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi giriniz"
              required
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
        <div className="signup-section">
          <span>Hesabınız yok mu? </span>
          <a className="signup-link" onClick={() => navigate("/signup")}>
            Kayıt Ol
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
