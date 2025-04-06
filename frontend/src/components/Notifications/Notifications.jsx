import React, { useState, useEffect } from 'react';
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
  const [responseMessage, setResponseMessage] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);

  const handleButtonClick = (name, value) => {
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = () => {
    setShowSettings(false); // Close the modal
    setResponseMessage('Settings Updated'); // Set the response message
    setTimeout(() => {
      setResponseMessage(''); // Clear the response message after a few seconds
    }, 3000); // Adjust the duration as needed
  };

  useEffect(() => {
    // Replace with actual data fetching logic
    const randomDate = () => {
      const start = new Date(2023, 0, 1); // Start date
      const end = new Date(); // Current date
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    setNotifications([
      { id: 1, message: "New assignment: Math Homework due next week.", type: "task", status: "unread", date: randomDate() },
      { id: 2, message: "Test submission received from Emma Davis.", type: "task", status: "read", date: randomDate() },
      { id: 3, message: "John Smith has a question about the last lesson.", type: "query", status: "unread", date: randomDate() },
      { id: 4, message: "New features have been added to the dashboard.", type: "update", status: "archived", date: randomDate() },
      { id: 5, message: "Sarah Wilson needs clarification on the project.", type: "query", status: "unread", date: randomDate() },
      { id: 6, message: "New assignment: Science Project due next week.", type: "task", status: "read", date: randomDate() },
      { id: 7, message: "Scheduled maintenance on Friday.", type: "update", status: "unread", date: randomDate() },
    ]);
  }, []);

  // Filter notifications based on search query and filters
  const filteredNotifications = notifications.filter(notification => {
    const typeMatch = filterType === 'all' || notification.type === filterType;
    const statusMatch = filterStatus === 'all' || notification.status === filterStatus;
    const searchMatch = notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatch && statusMatch && searchMatch;
  });

  // Sort notifications
  const sortedNotifications = filteredNotifications.sort((a, b) => {
    if (sortOrder === 'latest') {
      return b.id - a.id; // Assuming id is a proxy for date
    } else {
      return a.id - b.id;
    }
  });

  const markAllAsRead = () => {
    notifications.forEach(notification => {
      notification.status = 'read';
    });
    setResponseMessage('All notifications marked as read.'); // Set response message
    setTimeout(() => {
      setResponseMessage(''); // Clear the response message after a few seconds
    }, 3000);
  };

  return (
    <div className="notifications">
      <div className="header-container">
        <h2>Notifications</h2>
        <button onClick={markAllAsRead} className="mark-as-read-btn">
          <i className="fas fa-check-circle"></i> Mark All as Read
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <input
          type="text"
          placeholder="Search notifications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="task">Tasks</option>
          <option value="query">Queries</option>
          <option value="update">Updates</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Statuses</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="archived">Archived</option>
        </select>
        
        {/* Sort Order Button with Icons */}
        <button
          onClick={() => setSortOrder(sortOrder === 'latest' ? 'oldest' : 'latest')}
          className="sort-order-btn"
        >
          {sortOrder === 'latest' ? (
            <i className="fas fa-arrow-up"></i> // Up arrow for newest
          ) : (
            <i className="fas fa-arrow-down"></i> // Down arrow for oldest
          )}
        </button>
      </div>

      <div className="notification-section">
        <ul>
          {sortedNotifications.length > 0 ? (
            sortedNotifications.map(notification => (
              <li key={notification.id} className={`notification ${notification.type} ${notification.status}`}>
                <div className="notification-message">
                  {notification.message}
                  <span className="notification-date">{notification.date}</span> {/* Display date */}
                </div>
              </li>
            ))
          ) : (
            <li>No notifications available.</li>
          )}
        </ul>
      </div>

      {/* Response Message Display */}
      {responseMessage && <div className="response-message">{responseMessage}</div>}

      {/* Divider Line */}
      <hr className="divider" />

      <div className="settings-container">
        <button className="notification-settings-btn" onClick={() => setShowSettings(true)}>
          Notification Settings
        </button>
      </div>

      {showSettings && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowSettings(false)}>
              <i className="fas fa-times"></i>
            </button>
            <h2>Notification Settings</h2>

            <div className="setting-option">
              <label>Message Mentions:</label>
              <div className="button-group">
                <button onClick={() => handleButtonClick('mentions', 'none')} className={settings.mentions === 'none' ? 'active' : ''}>None</button>
                <button onClick={() => handleButtonClick('mentions', 'in-app')} className={settings.mentions === 'in-app' ? 'active' : ''}>In-app</button>
                <button onClick={() => handleButtonClick('mentions', 'email')} className={settings.mentions === 'email' ? 'active' : ''}>Email</button>
              </div>
            </div>

            <div className="setting-option">
              <label>Message Replies:</label>
              <div className="button-group">
                <button onClick={() => handleButtonClick('replies', 'none')} className={settings.replies === 'none' ? 'active' : ''}>None</button>
                <button onClick={() => handleButtonClick('replies', 'in-app')} className={settings.replies === 'in-app' ? 'active' : ''}>In-app</button>
                <button onClick={() => handleButtonClick('replies', 'email')} className={settings.replies === 'email' ? 'active' : ''}>Email</button>
              </div>
            </div>

            <div className="setting-option">
              <label>New Projects:</label>
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

            <div className="setting-option">
              <label>New Team Members:</label>
              <div className="button-group">
                <button onClick={() => handleButtonClick('newMembers', 'none')} className={settings.newMembers === 'none' ? 'active' : ''}>None</button>
                <button onClick={() => handleButtonClick('newMembers', 'in-app')} className={settings.newMembers === 'in-app' ? 'active' : ''}>In-app</button>
                <button onClick={() => handleButtonClick('newMembers', 'email')} className={settings.newMembers === 'email' ? 'active' : ''}>Email</button>
              </div>
            </div>

            <button className="save-settings-btn" onClick={handleSaveSettings}>Save Settings</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
