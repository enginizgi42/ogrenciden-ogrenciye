import React, { useState } from 'react';
import "../styles/Profile.css";

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState({
    name: 'Mevcut Kullanıcı',
    email: 'kullanici@example.com',
    phoneNumber: '123-456-7890',
    gender: 'Erkek'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSave = () => {
    if (newPassword && newPassword !== confirmPassword) {
      alert('Şifreler eşleşmiyor. Lütfen kontrol edin.');
      return;
    }
    console.log('Güncellenmiş Bilgiler:', profileInfo);
    console.log('Yeni Şifre:', newPassword);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src="/images/logo.jpg" alt="Logo" className="profile-logo" />
        <h2>KULLANICI BİLGİLERİ</h2>
      </div>
      <div className="profile-info">
        <label>Ad Soyad:</label>
        <p>{profileInfo.name}</p>

        <label>E-Posta:</label>
        <p>{profileInfo.email}</p>

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

        <label>Cinsiyet:</label>
        <p>{profileInfo.gender}</p>

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
