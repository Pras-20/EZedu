import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    darkMode: false,
    notifications: true,
    language: 'english',
    fontSize: 'medium'
  });

  const [accountSettings, setAccountSettings] = useState({
    email: 'user@example.com',
    password: '********',
    phone: '+1 (555) 123-4567'
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    activityStatus: true,
    dataSharing: false
  });

  const handleGeneralChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountSettings({
      ...accountSettings,
      [name]: value
    });
  };

  const handlePrivacyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrivacySettings({
      ...privacySettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to a backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <button onClick={handleSaveSettings} className="save-settings-btn">
          Save Changes
        </button>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2>General Settings</h2>
          <div className="setting-item">
            <label>
              <span>Dark Mode</span>
              <input
                type="checkbox"
                name="darkMode"
                checked={generalSettings.darkMode}
                onChange={handleGeneralChange}
              />
            </label>
          </div>
          <div className="setting-item">
            <label>
              <span>Enable Notifications</span>
              <input
                type="checkbox"
                name="notifications"
                checked={generalSettings.notifications}
                onChange={handleGeneralChange}
              />
            </label>
          </div>
          <div className="setting-item">
            <label>
              <span>Language</span>
              <select
                name="language"
                value={generalSettings.language}
                onChange={handleGeneralChange}
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
              </select>
            </label>
          </div>
          <div className="setting-item">
            <label>
              <span>Font Size</span>
              <select
                name="fontSize"
                value={generalSettings.fontSize}
                onChange={handleGeneralChange}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2>Account Settings</h2>
          <div className="setting-item">
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={accountSettings.email}
                onChange={handleAccountChange}
              />
            </label>
          </div>
          <div className="setting-item">
            <label>
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={accountSettings.password}
                onChange={handleAccountChange}
              />
            </label>
          </div>
          <div className="setting-item">
            <label>
              <span>Phone Number</span>
              <input
                type="tel"
                name="phone"
                value={accountSettings.phone}
                onChange={handleAccountChange}
              />
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2>Privacy Settings</h2>
          <div className="setting-item">
            <label>
              <span>Profile Visibility</span>
              <select
                name="profileVisibility"
                value={privacySettings.profileVisibility}
                onChange={handlePrivacyChange}
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </label>
          </div>
          <div className="setting-item">
            <label>
              <span>Activity Status</span>
              <input
                type="checkbox"
                name="activityStatus"
                checked={privacySettings.activityStatus}
                onChange={handlePrivacyChange}
              />
            </label>
          </div>
          <div className="setting-item">
            <label>
              <span>Data Sharing</span>
              <input
                type="checkbox"
                name="dataSharing"
                checked={privacySettings.dataSharing}
                onChange={handlePrivacyChange}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 