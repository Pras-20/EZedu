import React, { useState } from 'react';
import './Notifications.css'; // Ensure you have the necessary styles

const Notifications = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    mentions: 'in-app',
    replies: 'in-app',
    newProjects: 'email',
    outstandingTasks: '24 hours',
    newMembers: 'in-app',
  });

  const handleButtonClick = (name, value) => {
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const notifications = [
    { id: 1, message: "New assignment: Math Homework due next week.", type: "task" },
    { id: 2, message: "Test submission received from Emma Davis.", type: "task" },
    { id: 3, message: "John Smith has a question about the last lesson.", type: "query" },
    { id: 4, message: "New features have been added to the dashboard.", type: "update" },
    { id: 5, message: "Sarah Wilson needs clarification on the project.", type: "query" },
    { id: 6, message: "New assignment: Science Project due next week.", type: "task" },
    { id: 7, message: "Scheduled maintenance on Friday.", type: "update" },
  ];

  const groupedNotifications = {
    queries: notifications.filter(n => n.type === "query"),
    tasks: notifications.filter(n => n.type === "task"),
    updates: notifications.filter(n => n.type === "update"),
  };

  return (
    <div className="notifications">
      <h2>Notifications</h2>

      <div className="notification-section">
        <h3>Student Queries</h3>
        <ul>
          {groupedNotifications.queries.length > 0 ? (
            groupedNotifications.queries.map(notification => (
              <li key={notification.id} className="notification query">
                {notification.message}
              </li>
            ))
          ) : (
            <li>No student queries.</li>
          )}
        </ul>
      </div>

      <div className="notification-section">
        <h3>New Tasks</h3>
        <ul>
          {groupedNotifications.tasks.length > 0 ? (
            groupedNotifications.tasks.map(notification => (
              <li key={notification.id} className="notification task">
                {notification.message}
              </li>
            ))
          ) : (
            <li>No new tasks.</li>
          )}
        </ul>
      </div>

      <div className="notification-section">
        <h3>System Updates</h3>
        <ul>
          {groupedNotifications.updates.length > 0 ? (
            groupedNotifications.updates.map(notification => (
              <li key={notification.id} className="notification update">
                {notification.message}
              </li>
            ))
          ) : (
            <li>No system updates.</li>
          )}
        </ul>
      </div>

      <button onClick={() => setShowSettings(true)}>Notification Settings</button>

      {showSettings && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowSettings(false)}>
              <i className="fas fa-times"></i>
            </button>
            <h2>Notification Settings</h2>

            <div className="setting-option">
              <label>New Assignments:</label>
              <div className="button-group">
                <button onClick={() => handleButtonClick('mentions', 'none')} className={settings.mentions === 'none' ? 'active' : ''}>None</button>
                <button onClick={() => handleButtonClick('mentions', 'in-app')} className={settings.mentions === 'in-app' ? 'active' : ''}>In-app</button>
                <button onClick={() => handleButtonClick('mentions', 'email')} className={settings.mentions === 'email' ? 'active' : ''}>Email</button>
              </div>
            </div>

            <div className="setting-option">
              <label>New Tasks:</label>
              <div className="button-group">
                <button onClick={() => handleButtonClick('replies', 'none')} className={settings.replies === 'none' ? 'active' : ''}>None</button>
                <button onClick={() => handleButtonClick('replies', 'in-app')} className={settings.replies === 'in-app' ? 'active' : ''}>In-app</button>
                <button onClick={() => handleButtonClick('replies', 'email')} className={settings.replies === 'email' ? 'active' : ''}>Email</button>
              </div>
            </div>

            <div className="setting-option">
              <label>Message Mentions:</label>
              <div className="button-group">
                <button onClick={() => handleButtonClick('newProjects', 'none')} className={settings.newProjects === 'none' ? 'active' : ''}>None</button>
                <button onClick={() => handleButtonClick('newProjects', 'in-app')} className={settings.newProjects === 'in-app' ? 'active' : ''}>In-app</button>
                <button onClick={() => handleButtonClick('newProjects', 'email')} className={settings.newProjects === 'email' ? 'active' : ''}>Email</button>
              </div>
            </div>

            <div className="setting-option">
              <label>Outstanding Tasks:</label>
              <div className="button-group">
                <button onClick={() => handleButtonClick('outstandingTasks', '24 hours')} className={settings.outstandingTasks === '24 hours' ? 'active' : ''}>24 Hours</button>
                <button onClick={() => handleButtonClick('outstandingTasks', '48 hours')} className={settings.outstandingTasks === '48 hours' ? 'active' : ''}>48 Hours</button>
                <button onClick={() => handleButtonClick('outstandingTasks', '1 week')} className={settings.outstandingTasks === '1 week' ? 'active' : ''}>1 Week</button>
              </div>
            </div>
            
            <button className="save-settings-btn">Save Settings</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
