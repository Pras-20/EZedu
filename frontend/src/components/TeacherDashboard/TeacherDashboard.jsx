import React, { useState } from "react";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduleItems, setScheduleItems] = useState([
    {
      id: 1,
      class: "Check Assignments",
      time: "9:00 AM",
      status: "in-progress",
      completed: false,
      description: "Grade and provide feedback on pending student submissions.",
    },
    {
      id: 2,
      class: "Upcoming Classes",
      time: "10:30 AM",
      status: "not-started",
      completed: false,
      description: "Review lesson plans for today's scheduled classes.",
    },
    {
      id: 3,
      class: "Student Attendance",
      time: "11:00 AM",
      status: "not-started",
      completed: false,
      description: "Mark attendance for today's sessions.",
    },
    {
      id: 4,
      class: "Schedule Reminders",
      time: "1:00 PM",
      status: "not-started",
      completed: false,
      description: "Notify students about upcoming tests or deadlines.",
    },
    {
      id: 5,
      class: "Parent Communication",
      time: "2:30 PM",
      status: "not-started",
      completed: false,
      description: "Respond to any messages from parents or students.",
    },
    {
      id: 6,
      class: "Review Reports",
      time: "4:00 PM",
      status: "not-started",
      completed: false,
      description: "Analyze student performance trends.",
    },
  ]);

  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [newScheduleItem, setNewScheduleItem] = useState({
    class: "",
    time: "",
    status: "not-started",
    completed: false,
    description: "",
  });

  const [showScheduleInfo, setShowScheduleInfo] = useState(false);
  const [activeTaskDescription, setActiveTaskDescription] = useState(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "workshop",
      title: "Science Workshop: Practical Lab Experiments",
      description:
        "Interactive science workshop focusing on hands-on laboratory experiments. Students will learn practical skills in chemistry and physics. Perfect for those interested in experimental science.",
      timestamp: "2 hours ago",
      notified: false,
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=60",
      previewTitle: "Laboratory Equipment Setup",
    },
    {
      id: 2,
      type: "update",
      title: "New Teaching Methodology Session",
      description:
        "Interactive teaching methodology session introducing new learning techniques and student engagement strategies. Includes practical demonstrations and peer learning activities.",
      timestamp: "3 hours ago",
      notified: false,
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=60",
      previewTitle: "Interactive Teaching Methods",
    },
    {
      id: 3,
      type: "workshop",
      title: "Curriculum Enhancement Workshop",
      description:
        "Workshop on implementing the new curriculum guidelines with practical examples and interactive teaching methods. Focus on integrating modern teaching approaches with core subjects.",
      timestamp: "5 hours ago",
      notified: false,
      image:
        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&auto=format&fit=crop&q=60",
      previewTitle: "Curriculum Planning",
    },
    {
      id: 4,
      type: "assignment",
      title: "Special Assignment: Group Projects",
      description:
        "New group assignment combining practical experiments with curriculum topics. Students will work in teams to complete hands-on projects that demonstrate their understanding of core concepts.",
      timestamp: "1 day ago",
      notified: false,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60",
      previewTitle: "Group Project Collaboration",
    },
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showStudentSelection, setShowStudentSelection] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [showImagePreview, setShowImagePreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const students = [
    {
      id: 1,
      name: "John Doe",
      interests: ["science", "workshops", "practical experiments"],
    },
    {
      id: 2,
      name: "Jane Smith",
      interests: ["curriculum", "teaching methodology", "assignments"],
    },
    {
      id: 3,
      name: "Mike Johnson",
      interests: ["science", "interactive sessions", "workshops"],
    },
    {
      id: 4,
      name: "Sarah Williams",
      interests: ["curriculum", "workshops", "practical experiments"],
    },
    {
      id: 5,
      name: "Tom Brown",
      interests: [
        "teaching methodology",
        "interactive sessions",
        "assignments",
      ],
    },
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handlePrevYear = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1)
    );
  };

  const handleNextYear = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1)
    );
  };

  const toggleTaskCompletion = (id) => {
    setScheduleItems(
      scheduleItems.map((item) => {
        if (item.id === id) {
          const completed = !item.completed;
          return {
            ...item,
            completed,
            status: completed ? "completed" : "in-progress",
          };
        }
        return item;
      })
    );
  };

  const updateTaskStatus = (id, newStatus) => {
    setScheduleItems(
      scheduleItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: newStatus,
            completed: newStatus === "completed",
          };
        }
        return item;
      })
    );
  };

  const handleAddSchedule = () => {
    if (newScheduleItem.class && newScheduleItem.time) {
      setScheduleItems([
        ...scheduleItems,
        {
          id: Date.now(),
          ...newScheduleItem,
        },
      ]);
      setNewScheduleItem({
        class: "",
        time: "",
        status: "not-started",
        completed: false,
        description: "",
      });
      setShowAddSchedule(false);
    }
  };

  const deleteScheduleItem = (id) => {
    setScheduleItems(scheduleItems.filter((item) => item.id !== id));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        new Date().toDateString() ===
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          i
        ).toDateString();
      days.push(
        <div key={i} className={`calendar-day ${isToday ? "today" : ""}`}>
          {i}
        </div>
      );
    }

    return days;
  };

  const scheduleDescription = `Your daily schedule helps you track and manage your teaching activities. 
    You can add new tasks, mark them as complete, update their status, and remove completed items. 
    Use this tool to stay organized and ensure all your classes and activities are properly managed.`;

  const handleNotifyClick = (notification) => {
    setSelectedNotification(notification);
    setShowStudentSelection(true);
    setSelectedStudents([]);
  };

  const handleStudentSelection = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSendNotification = () => {
    if (selectedStudents.length === 0) {
      alert("Please select at least one student");
      return;
    }

    setNotifications(
      notifications.map((notification) =>
        notification.id === selectedNotification.id
          ? { ...notification, notified: true }
          : notification
      )
    );

    // In a real application, this would be an API call
    const selectedStudentNames = students
      .filter((student) => selectedStudents.includes(student.id))
      .map((student) => student.name)
      .join(", ");

    alert(`Notification sent to: ${selectedStudentNames}`);
    setShowStudentSelection(false);
    setSelectedNotification(null);
    setSelectedStudents([]);
  };

  const handleImageClick = (image, title) => {
    setSelectedImage({ url: image, title: title });
    setShowImagePreview(true);
  };

  const [statsData] = useState({
    classSchedule: {
      value: 5,
      trend: "+2",
      details: "5 upcoming classes this week",
    },
    completedAssignments: {
      value: 12,
      trend: "+5",
      details: "12 assignments completed this month",
    },
    certificationProgress: {
      value: 9,
      trend: "+1",
      details: "9 certifications in progress",
    },
    timePerClass: {
      value: "130:54",
      trend: "-10:30",
      details: "Average time spent per class",
    },
    upcomingClasses: {
      value: 2,
      trend: "0",
      details: "2 classes scheduled for tomorrow",
    },
    organizedClasses: {
      value: 15,
      trend: "+3",
      details: "15 total classes organized this month",
    },
    studentAttendance: {
      value: "92%",
      trend: "+5%",
      details: "Average attendance rate",
    },
    averageScore: {
      value: "85%",
      trend: "+3%",
      details: "Class average performance",
    },
    participationRate: {
      value: "78%",
      trend: "+8%",
      details: "Student participation in discussions",
    },
  });

  const [selectedStat, setSelectedStat] = useState(null);

  const handleStatClick = (statKey) => {
    setSelectedStat(selectedStat === statKey ? null : statKey);
  };

  const [overviewItems, setOverviewItems] = useState([
    {
      id: 1,
      title: "Total Classes Conducted",
      status: "completed",
      date: new Date().toISOString().split("T")[0],
      type: "classes",
      description: "15 classes conducted this month",
      value: "15",
    },
    {
      id: 2,
      title: "Pending Assignments",
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      type: "assignments",
      description: "12 assignments need review",
      value: "12",
    },
    {
      id: 3,
      title: "Student Attendance Rate",
      status: "in-review",
      date: new Date().toISOString().split("T")[0],
      type: "attendance",
      description: "Current attendance rate at 92%",
      value: "92%",
    },
    {
      id: 4,
      title: "Upcoming Events",
      status: "pending",
      date: new Date(new Date().setDate(new Date().getDate() + 2))
        .toISOString()
        .split("T")[0],
      type: "events",
      description: "Parent-Teacher Meeting on Friday",
      value: "Friday",
    },
    {
      id: 5,
      title: "Performance Insights",
      status: "in-review",
      date: new Date().toISOString().split("T")[0],
      type: "performance",
      description: "5 students need extra attention in Math",
      value: "5",
    },
    {
      id: 6,
      title: "Announcements",
      status: "pending",
      date: new Date(new Date().setDate(new Date().getDate() + 2))
        .toISOString()
        .split("T")[0],
      type: "announcement",
      description: "School trip registrations close in 2 days",
      value: "2 days",
    },
  ]);

  const handleStatusChange = (id) => {
    setOverviewItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const statusMap = {
            pending: "in-review",
            "in-review": "completed",
            completed: "pending",
          };
          return { ...item, status: statusMap[item.status] };
        }
        return item;
      })
    );
  };

  const handleViewItem = (id) => {
    const item = overviewItems.find((item) => item.id === id);
    alert(`Viewing details for: ${item.title}`);
    // You can implement a modal or navigation here
  };

  const handleEditItem = (id) => {
    const item = overviewItems.find((item) => item.id === id);
    alert(`Editing: ${item.title}`);
    // You can implement an edit modal here
  };

  return (
    <div className="teacher-dashboard">
      {/* Calendar Section */}
      <div className="dashboard-section calendar-section">
        <div className="calendar-header-container">
          <span className="calendar-icon">
            <i className="fas fa-calendar-alt"></i>
          </span>
          <div className="calendar-nav">
            <div className="calendar-nav-year">
              <button onClick={handlePrevYear}>&lt;&lt;</button>
              <span>{currentDate.getFullYear()}</span>
              <button onClick={handleNextYear}>&gt;&gt;</button>
            </div>
            <div className="calendar-nav-month">
              <button onClick={handlePrevMonth}>&lt;</button>
              <span>{months[currentDate.getMonth()]}</span>
              <button onClick={handleNextMonth}>&gt;</button>
            </div>
          </div>
        </div>
        <div className="calendar-header">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="calendar-grid">{renderCalendar()}</div>
      </div>

      {/* Daily Schedule Section */}
      <div className="dashboard-section schedule-section">
        <div className="section-header">
          <div className="header-title">
          <h2>Your daily schedule</h2>
            <button
              className="info-button"
              onClick={() => setShowScheduleInfo(!showScheduleInfo)}
              title="Click for more information"
            >
              <i className="fas fa-info-circle"></i>
            </button>
            {showScheduleInfo && (
              <div className="info-popup">
                <div className="popup-content">
                  <p>{scheduleDescription}</p>
                  <button
                    className="close-popup"
                    onClick={() => setShowScheduleInfo(false)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="schedule-actions">
            <button
              className="add-schedule-btn"
              onClick={() => setShowAddSchedule(true)}
            >
              <i className="fas fa-plus"></i> Add Schedule
            </button>
          <span className="time-icon">
            <i className="fas fa-clock"></i>
          </span>
        </div>
        </div>

        {showAddSchedule && (
          <div className="add-schedule-form">
            <div className="form-group">
              <label>Class Name</label>
              <input
                type="text"
                placeholder="Enter class name"
                value={newScheduleItem.class}
                onChange={(e) =>
                  setNewScheduleItem({
                    ...newScheduleItem,
                    class: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Time/Date</label>
              <input
                type="text"
                placeholder="Enter time or date"
                value={newScheduleItem.time}
                onChange={(e) =>
                  setNewScheduleItem({
                    ...newScheduleItem,
                    time: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Enter task description"
                value={newScheduleItem.description}
                onChange={(e) =>
                  setNewScheduleItem({
                    ...newScheduleItem,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-actions">
              <button className="save-btn" onClick={handleAddSchedule}>
                <i className="fas fa-check"></i> Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowAddSchedule(false)}
              >
                <i className="fas fa-times"></i> Cancel
              </button>
            </div>
          </div>
        )}

        <div className="schedule-table">
          <div className="schedule-header">
            <div>Class</div>
            <div>Timetable</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          {scheduleItems.map((item) => (
            <div key={item.id} className="schedule-row">
              <div className="class-name">
                {item.class}
                <button
                  className="task-info-btn"
                  onClick={() =>
                    setActiveTaskDescription(
                      item.id === activeTaskDescription ? null : item.id
                    )
                  }
                  title="View task description"
                >
                  <i className="fas fa-info-circle"></i>
                </button>
                {activeTaskDescription === item.id && (
                  <div className="task-description-popup">
                    <div className="popup-content">
                      <p>{item.description || "No description available."}</p>
                      <button
                        className="close-popup"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTaskDescription(null);
                        }}
                      >
                        <i className="fas fa-times"></i>
                      </button>
            </div>
          </div>
                )}
            </div>
              <div className="time-slot">{item.time}</div>
            <div>
                <select
                  className={`status-badge ${item.status}`}
                  value={item.status}
                  onChange={(e) => updateTaskStatus(item.id, e.target.value)}
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
            </div>
              <div className="schedule-actions">
                <button
                  className={`complete-btn ${
                    item.completed ? "completed" : ""
                  }`}
                  onClick={() => toggleTaskCompletion(item.id)}
                  title={
                    item.completed ? "Mark as incomplete" : "Mark as complete"
                  }
                >
                  {item.completed ? "✓" : "×"}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteScheduleItem(item.id)}
                  title="Delete item"
                >
                  <i className="fas fa-trash"></i>
                </button>
          </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Notifications Section */}
      <div className="dashboard-section notifications-section">
        <div className="section-header">
          <h2>Event Notifications</h2>
          <span className="notification-icon">
            <i className="fas fa-bell"></i>
          </span>
        </div>
        <div className="notification-list">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <div
                className="notification-image"
                onClick={() =>
                  handleImageClick(
                    notification.image,
                    notification.previewTitle
                  )
                }
              >
                <img src={notification.image} alt={notification.title} />
              </div>
              <div className="notification-content">
                <span className="notification-title">{notification.title}</span>
                <span className="notification-time">
                  {notification.timestamp}
            </span>
                <div className="notification-hover-content">
                  <p>{notification.description}</p>
                </div>
              </div>
              <div className="notification-actions">
                <button
                  className={`notify-btn ${
                    notification.notified ? "notified" : ""
                  }`}
                  onClick={() => handleNotifyClick(notification)}
                  disabled={notification.notified}
                >
                  <i className="fas fa-paper-plane"></i>
                  {notification.notified ? "Notified" : "Notify Students"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Preview Modal */}
      {showImagePreview && selectedImage && (
        <div
          className="modal-overlay"
          onClick={() => setShowImagePreview(false)}
        >
          <div
            className="image-preview-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="preview-header">
              <h3>{selectedImage.title}</h3>
              <button
                className="close-modal"
                onClick={() => setShowImagePreview(false)}
              >
                <i className="fas fa-times"></i>
            </button>
            </div>
            <div className="preview-content">
              <img src={selectedImage.url} alt={selectedImage.title} />
            </div>
          </div>
        </div>
      )}

      {/* Student Selection Modal */}
      {showStudentSelection && (
        <div className="modal-overlay">
          <div className="student-selection-modal">
            <div className="modal-header">
              <h3>Select Students to Notify</h3>
              <button
                className="close-modal"
                onClick={() => setShowStudentSelection(false)}
              >
                <i className="fas fa-times"></i>
            </button>
          </div>
            <div className="modal-content">
              <div className="student-filters">
                <button
                  className="filter-btn"
                  onClick={() => setSelectedStudents(students.map((s) => s.id))}
                >
                  Select All
                </button>
                <button
                  className="filter-btn"
                  onClick={() => setSelectedStudents([])}
                >
                  Clear All
                </button>
                <div className="interest-filters">
                  <button
                    className="filter-btn"
                    onClick={() =>
                      setSelectedStudents(
                        students
                          .filter((s) => s.interests.includes("science"))
                          .map((s) => s.id)
                      )
                    }
                  >
                    Science
                  </button>
                  <button
                    className="filter-btn"
                    onClick={() =>
                      setSelectedStudents(
                        students
                          .filter((s) => s.interests.includes("workshops"))
                          .map((s) => s.id)
                      )
                    }
                  >
                    Workshops
                  </button>
                  <button
                    className="filter-btn"
                    onClick={() =>
                      setSelectedStudents(
                        students
                          .filter((s) =>
                            s.interests.includes("practical experiments")
                          )
                          .map((s) => s.id)
                      )
                    }
                  >
                    Practical Experiments
                  </button>
                  <button
                    className="filter-btn"
                    onClick={() =>
                      setSelectedStudents(
                        students
                          .filter((s) => s.interests.includes("curriculum"))
                          .map((s) => s.id)
                      )
                    }
                  >
                    Curriculum
                  </button>
                  <button
                    className="filter-btn"
                    onClick={() =>
                      setSelectedStudents(
                        students
                          .filter((s) =>
                            s.interests.includes("teaching methodology")
                          )
                          .map((s) => s.id)
                      )
                    }
                  >
                    Teaching Methodology
                  </button>
                  <button
                    className="filter-btn"
                    onClick={() =>
                      setSelectedStudents(
                        students
                          .filter((s) => s.interests.includes("assignments"))
                          .map((s) => s.id)
                      )
                    }
                  >
                    Assignments
            </button>
          </div>
              </div>
              <div className="students-list">
                {students.map((student) => (
                  <div key={student.id} className="student-item">
                    <label className="student-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleStudentSelection(student.id)}
                      />
                      <span className="student-name">{student.name}</span>
                      <div className="student-interests">
                        {student.interests.map((interest) => (
                          <span key={interest} className="interest-tag">
                            {interest}
            </span>
                        ))}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="send-notification-btn"
                onClick={handleSendNotification}
                disabled={selectedStudents.length === 0}
              >
                Send Notification ({selectedStudents.length} selected)
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Class Statistics Section */}
      <div className="dashboard-section stats-section">
        <div className="section-header">
        <h2>Class Statistics</h2>
          <span className="stats-icon">
            <i className="fas fa-chart-line"></i>
          </span>
        </div>
        <div className="stats-grid">
          {Object.entries(statsData).map(([key, data]) => (
            <div
              key={key}
              className={`stat-item ${selectedStat === key ? "selected" : ""}`}
              onClick={() => handleStatClick(key)}
            >
              <span className="stat-label">
                {key.replace(/([A-Z])/g, " $1").toLowerCase()}
              </span>
              <span className="stat-value">{data.value}</span>
              <span
                className={`stat-trend ${
                  data.trend.startsWith("+")
                    ? "positive"
                    : data.trend === "0"
                    ? ""
                    : "negative"
                }`}
              >
                {data.trend}
              </span>
              {selectedStat === key && (
                <div className="stat-details">
                  <p>{data.details}</p>
          </div>
              )}
          </div>
          ))}
          </div>

        <div className="grade-distribution">
          <div className="grade-chart-placeholder">
            <h3>Grade Distribution</h3>
            <div className="mock-chart">
              <div className="bar" style={{ height: "20%" }}></div>
              <div className="bar" style={{ height: "40%" }}></div>
              <div className="bar" style={{ height: "60%" }}></div>
              <div className="bar" style={{ height: "80%" }}></div>
              <div className="bar" style={{ height: "100%" }}></div>
              <div className="bar" style={{ height: "80%" }}></div>
              <div className="bar" style={{ height: "60%" }}></div>
              <div className="bar" style={{ height: "40%" }}></div>
              <div className="bar" style={{ height: "20%" }}></div>
          </div>
            <div className="grade-labels">
              <span>0-20</span>
              <span>21-40</span>
              <span>41-60</span>
              <span>61-80</span>
              <span>81-100</span>
          </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <section className="overview-section">
        <div className="section-header">
          <div className="header-title">
            <i className="fas fa-tasks"></i>
          <h2>Overview</h2>
          </div>
        </div>

          <div className="overview-header">
          <div>Item</div>
          <div>Value</div>
            <div>Status</div>
          <div>Actions</div>
          </div>

        {overviewItems.length > 0 ? (
          overviewItems.map((item) => (
            <div key={item.id} className="overview-row">
              <div className="overview-title">
                <i
                  className={`fas fa-${
                    item.type === "classes"
                      ? "chalkboard-teacher"
                      : item.type === "assignments"
                      ? "book"
                      : item.type === "attendance"
                      ? "user-check"
                      : item.type === "events"
                      ? "calendar-check"
                      : item.type === "performance"
                      ? "chart-line"
                      : "bullhorn"
                  } mr-2`}
                ></i>
                {item.title}
            </div>

              <div className="overview-value">{item.value}</div>

              <div
                className={`overview-status ${item.status}`}
                onClick={() => handleStatusChange(item.id)}
                style={{ cursor: "pointer" }}
              >
                {item.status.replace("-", " ")}
            </div>

              <div className="overview-action">
                <button
                  className="action-btn view"
                  onClick={() => handleViewItem(item.id)}
                  title={item.description}
                >
                  <i className="fas fa-eye"></i>
                  Details
                </button>
                <button
                  className="action-btn edit"
                  onClick={() => handleEditItem(item.id)}
                >
                  <i className="fas fa-edit"></i>
                  Update
                </button>
          </div>
            </div>
          ))
        ) : (
          <div className="overview-empty">No items available</div>
        )}
      </section>

      {/* Student Progress Section */}
      <div className="dashboard-section progress-section">
        <h2>Student Progress</h2>
        <div className="progress-metrics">
          <div className="metric-circle certifications">
            <div className="metric-value">12</div>
            <div className="metric-label">Certifications</div>
          </div>
          <div className="metric-circle success-rate">
            <div className="metric-value">99%</div>
            <div className="metric-label">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="dashboard-section achievements-section">
        <h2>Achievements Unlocked</h2>
        <div className="achievements-grid">
          <div className="achievement-item">
            <span className="achievement-icon">
              <i className="fas fa-lightbulb"></i>
            </span>
            <span className="achievement-label">Great Work!</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-icon">
              <i className="fas fa-bolt"></i>
            </span>
            <span className="achievement-label">Quick Learner!</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-icon">
              <i className="fas fa-compass"></i>
            </span>
            <span className="achievement-label">Curiosity Unleashed!</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-icon">
              <i className="fas fa-fire"></i>
            </span>
            <span className="achievement-label">Consistent Progress!</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-icon">
              <i className="fas fa-moon"></i>
            </span>
            <span className="achievement-label">Night Owl!</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-icon">
              <i className="fas fa-chart-line"></i>
            </span>
            <span className="achievement-label">Growth Mindset!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
