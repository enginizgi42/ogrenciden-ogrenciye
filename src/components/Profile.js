// Profile.js

import React, { useState } from 'react';
import "../styles/Profile.css";

const Profile = () => {
  // Kullanıcı bilgilerini yönetmek için state'ler
  const [profileInfo, setProfileInfo] = useState({
    name: 'Mevcut Kullanıcı',
    email: 'kullanici@example.com',
    birthDate: '1990-01-01',
    phoneNumber: '123-456-7890'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Bilgileri düzenleme durumunu yönetme
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Bilgi güncelleme işlemleri
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  // Şifre güncelleme
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Güncelleme işlemlerini kaydetme
  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert('Şifreler eşleşmiyor. Lütfen kontrol edin.');
      return;
    }
    // Şu an sadece konsola basılıyor, daha sonra API entegrasyonu eklenebilir
    console.log('Güncellenmiş Bilgiler:', profileInfo);
    console.log('Yeni Şifre:', newPassword);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src="/images/logo.jpg" alt="Logo" className="profile-logo" />
        <h2>Profilim</h2>
      </div>
      <div className="profile-info">
        <label>Ad Soyad:</label>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={profileInfo.name}
            onChange={handleChange}
          />
        ) : (
          <p>{profileInfo.name}</p>
        )}

        <label>E-Posta:</label>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={profileInfo.email}
            onChange={handleChange}
          />
        ) : (
          <p>{profileInfo.email}</p>
        )}

        <label>Doğum Tarihi:</label>
        {isEditing ? (
          <input
            type="date"
            name="birthDate"
            value={profileInfo.birthDate}
            onChange={handleChange}
          />
        ) : (
          <p>{profileInfo.birthDate}</p>
        )}

        <label>Telefon Numarası:</label>
        {isEditing ? (
          <input
            type="tel"
            name="phoneNumber"
            value={profileInfo.phoneNumber}
            onChange={handleChange}
          />
        ) : (
          <p>{profileInfo.phoneNumber}</p>
        )}

        {isEditing && (
          <>
            <label>Yeni Şifre:</label>
            <input
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
            />

            <label>Şifreyi Onayla:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </>
        )}
      </div>
      <div className="profile-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="save-button">Kaydet</button>
            <button onClick={handleEditClick} className="cancel-button">İptal</button>
          </>
        ) : (
          <button onClick={handleEditClick} className="edit-button">Düzenle</button>
        )}
      </div>
    </div>
  );
};

export default Profile;

