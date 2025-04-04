import React, { useState } from "react";
import "./TeacherDashboard.css";
import { useNavigate } from "react-router-dom";

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
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handlePrevYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth()));
  };

  const handleNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth()));
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

  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjectData = {
    Mathematics: {
      weeklyProgress: [65, 70, 75, 82, 82],
      averageScore: 78,
      completionRate: 85,
      topPerformers: 12,
      needsAttention: 5,
    },
    Science: {
      weeklyProgress: [70, 72, 75, 78, 78],
      averageScore: 76,
      completionRate: 80,
      topPerformers: 10,
      needsAttention: 7,
    },
    Literature: {
      weeklyProgress: [60, 62, 63, 65, 65],
      averageScore: 65,
      completionRate: 70,
      topPerformers: 8,
      needsAttention: 9,
    },
    Arts: {
      weeklyProgress: [82, 85, 87, 89, 90],
      averageScore: 88,
      completionRate: 95,
      topPerformers: 15,
      needsAttention: 3,
    },
  };

  const PopupPortal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className={`popup-root ${isOpen ? "active" : ""}`}>
        <div className="popup-overlay" onClick={onClose} />
        {children}
      </div>
    );
  };

  const SubjectDetails = ({ subject, data, onBack }) => {
    const [showTopPerformers, setShowTopPerformers] = useState(false);
    const [showNeedsAttention, setShowNeedsAttention] = useState(false);
    const navigate = useNavigate();

    const studentData = {
      Mathematics: {
        topPerformers: [
          { id: 1, name: "John Smith", mark: 98 },
          { id: 2, name: "Emma Wilson", mark: 96 },
          { id: 3, name: "Michael Brown", mark: 95 },
          { id: 4, name: "Sarah Davis", mark: 94 },
          { id: 5, name: "James Johnson", mark: 93 },
        ],
        needsAttention: [
          { id: 6, name: "Alex Turner", mark: 65 },
          { id: 7, name: "Lisa Anderson", mark: 62 },
          { id: 8, name: "Tom Wilson", mark: 58 },
          { id: 9, name: "Emily White", mark: 55 },
          { id: 10, name: "Chris Martin", mark: 52 },
        ],
      },
      Science: {
        topPerformers: [
          { id: 1, name: "Emma Wilson", mark: 97 },
          { id: 2, name: "John Smith", mark: 95 },
          { id: 3, name: "Sarah Davis", mark: 94 },
          { id: 4, name: "Michael Brown", mark: 93 },
          { id: 5, name: "Lisa Chen", mark: 92 },
        ],
        needsAttention: [
          { id: 6, name: "Tom Wilson", mark: 64 },
          { id: 7, name: "Chris Martin", mark: 61 },
          { id: 8, name: "Emily White", mark: 59 },
          { id: 9, name: "Alex Turner", mark: 56 },
          { id: 10, name: "David Lee", mark: 54 },
        ],
      },
      Literature: {
        topPerformers: [
          { id: 1, name: "Sarah Davis", mark: 96 },
          { id: 2, name: "Emma Wilson", mark: 95 },
          { id: 3, name: "Lisa Chen", mark: 94 },
          { id: 4, name: "Emily White", mark: 93 },
          { id: 5, name: "Michael Brown", mark: 92 },
        ],
        needsAttention: [
          { id: 6, name: "Tom Wilson", mark: 63 },
          { id: 7, name: "Alex Turner", mark: 60 },
          { id: 8, name: "Chris Martin", mark: 58 },
          { id: 9, name: "James Johnson", mark: 55 },
          { id: 10, name: "David Lee", mark: 53 },
        ],
      },
      Arts: {
        topPerformers: [
          { id: 1, name: "Lisa Chen", mark: 99 },
          { id: 2, name: "Emily White", mark: 97 },
          { id: 3, name: "Sarah Davis", mark: 96 },
          { id: 4, name: "Emma Wilson", mark: 95 },
          { id: 5, name: "Michael Brown", mark: 94 },
        ],
        needsAttention: [
          { id: 6, name: "Tom Wilson", mark: 66 },
          { id: 7, name: "Chris Martin", mark: 64 },
          { id: 8, name: "Alex Turner", mark: 62 },
          { id: 9, name: "James Johnson", mark: 58 },
          { id: 10, name: "David Lee", mark: 55 },
        ],
      },
    };

    const getMarkClass = (mark) => {
      if (mark >= 90) return "mark-excellent";
      if (mark >= 75) return "mark-good";
      return "mark-needs-improvement";
    };

    const handleAnswerQueries = () => {
      try {
        navigate("/teacher/queries");
      } catch (error) {
        window.location.href = "/teacher/queries";
      }
    };

    return (
      <div className="subject-details">
        <div className="subject-details-header">
          <div className="subject-details-title">
            <i
              className={`fas ${
                subject === "Mathematics"
                  ? "fa-calculator"
                  : subject === "Science"
                  ? "fa-flask"
                  : subject === "Literature"
                  ? "fa-book"
                  : "fa-palette"
              }`}
            ></i>
            {subject} Performance Details
          </div>
          <div className="header-actions">
            <button
              className="answer-queries-btn"
              onClick={handleAnswerQueries}
            >
              <i className="fas fa-question-circle"></i>
              Answer Queries
            </button>
            <button className="back-to-overview" onClick={onBack}>
              <i className="fas fa-arrow-left"></i>
              Back to Overview
            </button>
          </div>
        </div>

        <div className="subject-details-content">
          <div className="metric-cards">
            <div className="metric-card">
              <div
                className="metric-circle"
                style={{ "--progress": `${data.averageScore}%` }}
              >
                <div className="metric-content">
                  <span className="metric-value">{data.averageScore}%</span>
                </div>
              </div>
              <span className="metric-label">Average Score</span>
              <span className="metric-trend trend-positive">
                <i className="fas fa-arrow-up"></i>
                +2.5%
              </span>
            </div>

            <div className="metric-card">
              <div
                className="metric-circle"
                style={{ "--progress": `${data.completionRate}%` }}
              >
                <div className="metric-content">
                  <span className="metric-value">{data.completionRate}%</span>
                </div>
              </div>
              <span className="metric-label">Completion Rate</span>
              <span className="metric-trend trend-positive">
                <i className="fas fa-arrow-up"></i>
                +5%
              </span>
            </div>

            <div
              className="metric-card"
              onClick={() => setShowTopPerformers(true)}
              style={{ cursor: "pointer" }}
            >
              <div className="metric-circle" style={{ "--progress": "85%" }}>
                <div className="metric-content">
                  <span className="metric-value">{data.topPerformers}</span>
                </div>
              </div>
              <span className="metric-label">Top Performers</span>
              <span className="metric-trend trend-positive">
                <i className="fas fa-arrow-up"></i>
                +2
              </span>
            </div>
          </div>

          <div className="subject-stats-grid">
            <div
              className="subject-stat-card"
              onClick={() => setShowNeedsAttention(true)}
            >
              <div className="stat-header">
                <span className="stat-title">Students Needing Attention</span>
                <i
                  className="fas fa-exclamation-circle"
                  style={{ color: "#d32f2f" }}
                ></i>
              </div>
              <span className="stat-value">{data.needsAttention}</span>
            </div>
            <div className="subject-stat-card">
              <div className="stat-header">
                <span className="stat-title">Weekly Improvement</span>
                <i
                  className="fas fa-chart-line"
                  style={{ color: "#2e7d32" }}
                ></i>
              </div>
              <span className="stat-value">
                +
                {data.weeklyProgress[data.weeklyProgress.length - 1] -
                  data.weeklyProgress[0]}
                %
              </span>
            </div>
          </div>

          <div className="progress-chart-container">
            <div className="chart-header">
              <h3 className="chart-title">Weekly Progress Trend</h3>
            </div>
            <div className="chart-content">
              <div className="y-axis-labels">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>
              <div className="chart-grid">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="grid-line" />
                ))}
              </div>
              <div className="chart-bars">
                {data.weeklyProgress.map((value, index) => (
                  <div
                    key={index}
                    className="chart-bar"
                    style={{ height: `${value}%` }}
                  >
                    <div className="bar-value">{value}%</div>
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                {["Week 1", "Week 2", "Week 3", "Week 4", "Current"].map(
                  (week, index) => (
                    <span key={index} className="legend-item">
                      {week}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {showTopPerformers && (
          <PopupPortal
            isOpen={showTopPerformers}
            onClose={() => setShowTopPerformers(false)}
          >
            <div
              className="student-list-popup"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="student-list-header">
                <span className="student-list-title">
                  Top Performers in {subject}
                </span>
                <button
                  className="close-student-list"
                  onClick={() => setShowTopPerformers(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="student-list">
                {studentData[subject].topPerformers.map((student) => (
                  <div key={student.id} className="student-performance-item">
                    <div className="student-info">
                      <div className="student-avatar">
                        {student.name.charAt(0)}
                      </div>
                      <span className="student-name">{student.name}</span>
                    </div>
                    <span
                      className={`student-mark ${getMarkClass(student.mark)}`}
                    >
                      {student.mark}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </PopupPortal>
        )}

        {showNeedsAttention && (
          <PopupPortal
            isOpen={showNeedsAttention}
            onClose={() => setShowNeedsAttention(false)}
          >
            <div
              className="student-list-popup"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="student-list-header">
                <span className="student-list-title">
                  Students Needing Attention in {subject}
                </span>
                <button
                  className="close-student-list"
                  onClick={() => setShowNeedsAttention(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="student-list">
                {studentData[subject].needsAttention.map((student) => (
                  <div key={student.id} className="student-performance-item">
                    <div className="student-info">
                      <div className="student-avatar">
                        {student.name.charAt(0)}
                      </div>
                      <span className="student-name">{student.name}</span>
                    </div>
                    <span
                      className={`student-mark ${getMarkClass(student.mark)}`}
                    >
                      {student.mark}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </PopupPortal>
        )}
      </div>
    );
  };

  const [selectedFilter, setSelectedFilter] = useState("all");

  const achievementsData = {
    stats: {
      totalAchievements: 24,
      achievementsUnlocked: 12,
      totalPoints: 1250,
      currentLevel: "Silver Educator",
    },
    achievements: [
      {
        id: 1,
        name: "Perfect Attendance",
        description: "Maintain 100% attendance for 30 consecutive days",
        icon: "fa-calendar-check",
        progress: 100,
        total: 30,
        unlocked: true,
        date: "2024-02-15",
        badge: "gold",
        type: "teaching",
        tasks: [
          { id: 1, text: "Log in daily for 30 days", completed: true },
          { id: 2, text: "Start classes on time", completed: true },
          { id: 3, text: "Complete all scheduled sessions", completed: true },
        ],
      },
      {
        id: 2,
        name: "Master Educator",
        description: "Complete 50 classes with excellent feedback",
        icon: "fa-star",
        progress: 45,
        total: 50,
        unlocked: false,
        badge: "gold",
        type: "teaching",
        tasks: [
          { id: 1, text: "Conduct 50 classes", completed: false },
          { id: 2, text: "Maintain 4.5+ rating", completed: true },
          { id: 3, text: "Get positive student feedback", completed: true },
        ],
      },
      {
        id: 3,
        name: "Student Success",
        description: "Help 20 students improve their grades significantly",
        icon: "fa-graduation-cap",
        progress: 15,
        total: 20,
        unlocked: false,
        badge: "silver",
        type: "teaching",
        tasks: [
          { id: 1, text: "Identify struggling students", completed: true },
          { id: 2, text: "Create improvement plans", completed: true },
          { id: 3, text: "Track progress over time", completed: false },
        ],
      },
      {
        id: 4,
        name: "Innovation Champion",
        description: "Implement 10 innovative teaching methods",
        icon: "fa-lightbulb",
        progress: 10,
        total: 10,
        unlocked: true,
        date: "2024-01-20",
        badge: "silver",
        type: "innovation",
        tasks: [
          { id: 1, text: "Research new methods", completed: true },
          { id: 2, text: "Implement in classroom", completed: true },
          { id: 3, text: "Document effectiveness", completed: true },
        ],
      },
      {
        id: 5,
        name: "Community Builder",
        description: "Organize 5 successful student group activities",
        icon: "fa-users",
        progress: 3,
        total: 5,
        unlocked: false,
        badge: "bronze",
        type: "community",
        tasks: [
          { id: 1, text: "Plan group activities", completed: true },
          { id: 2, text: "Execute 5 activities", completed: false },
          { id: 3, text: "Gather participant feedback", completed: true },
        ],
      },
      {
        id: 6,
        name: "Digital Expert",
        description: "Use 15 different digital tools in teaching",
        icon: "fa-laptop",
        progress: 12,
        total: 15,
        unlocked: false,
        badge: "bronze",
        type: "digital",
        tasks: [
          { id: 1, text: "Explore educational tools", completed: true },
          { id: 2, text: "Implement in lessons", completed: false },
          { id: 3, text: "Train other teachers", completed: false },
        ],
      },
    ],
  };

  const AchievementsSection = () => {
    const filteredAchievements = achievementsData.achievements.filter(
      (achievement) => {
        if (selectedFilter === "all") return true;
        if (selectedFilter === "unlocked") return achievement.unlocked;
        if (selectedFilter === "locked") return !achievement.unlocked;
        if (selectedFilter === "inProgress")
          return !achievement.unlocked && achievement.progress > 0;
        return true;
      }
    );

    return (
      <section className="achievements-section">
        <div className="achievements-header">
          <h2 className="achievements-title">
            <i className="fas fa-trophy"></i>
            Achievements
          </h2>
        </div>

        <div className="achievements-stats">
          <div className="achievement-stat">
            <div className="stat-header">
              <div className="stat-icon">
                <i className="fas fa-award"></i>
              </div>
              <div>
                <div className="stat-label">Total Achievements</div>
                <div className="stat-value">
                  {achievementsData.stats.totalAchievements}
                </div>
              </div>
            </div>
          </div>
          <div className="achievement-stat">
            <div className="stat-header">
              <div className="stat-icon">
                <i className="fas fa-unlock"></i>
              </div>
              <div>
                <div className="stat-label">Unlocked</div>
                <div className="stat-value">
                  {achievementsData.stats.achievementsUnlocked}
                </div>
              </div>
            </div>
          </div>
          <div className="achievement-stat">
            <div className="stat-header">
              <div className="stat-icon">
                <i className="fas fa-star"></i>
              </div>
              <div>
                <div className="stat-label">Total Points</div>
                <div className="stat-value">
                  {achievementsData.stats.totalPoints}
                </div>
              </div>
            </div>
          </div>
          <div className="achievement-stat">
            <div className="stat-header">
              <div className="stat-icon">
                <i className="fas fa-crown"></i>
              </div>
              <div>
                <div className="stat-label">Current Level</div>
                <div className="stat-value">
                  {achievementsData.stats.currentLevel}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="achievements-filters">
          <button
            className={`filter-button ${
              selectedFilter === "all" ? "active" : ""
            }`}
            onClick={() => setSelectedFilter("all")}
          >
            All Achievements
          </button>
          <button
            className={`filter-button ${
              selectedFilter === "unlocked" ? "active" : ""
            }`}
            onClick={() => setSelectedFilter("unlocked")}
          >
            Unlocked
          </button>
          <button
            className={`filter-button ${
              selectedFilter === "locked" ? "active" : ""
            }`}
            onClick={() => setSelectedFilter("locked")}
          >
            Locked
          </button>
          <button
            className={`filter-button ${
              selectedFilter === "inProgress" ? "active" : ""
            }`}
            onClick={() => setSelectedFilter("inProgress")}
          >
            In Progress
          </button>
        </div>

        <div className="achievements-grid">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`achievement-item ${
                !achievement.unlocked ? "locked" : ""
              }`}
            >
              <div className={`achievement-badge badge-${achievement.badge}`}>
                {achievement.badge.charAt(0).toUpperCase() +
                  achievement.badge.slice(1)}
              </div>
              <div className={`achievement-icon ${achievement.type}`}>
                <i className={`fas ${achievement.icon}`}></i>
              </div>
              <div className="achievement-info">
                <div className="achievement-name">{achievement.name}</div>
                <div className="achievement-description">
                  {achievement.description}
                </div>
              </div>
              <div className="achievement-progress">
                <div className="progress-text">
                  <span>
                    {achievement.progress} / {achievement.total}
                  </span>
                  <span>
                    {Math.round(
                      (achievement.progress / achievement.total) * 100
                    )}
                    %
                  </span>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${
                        (achievement.progress / achievement.total) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="achievement-tasks">
                <ul className="task-list">
                  {achievement.tasks.map((task) => (
                    <li
                      key={task.id}
                      className={`task-item ${
                        task.completed ? "completed" : "incomplete"
                      }`}
                    >
                      <i
                        className={`fas ${
                          task.completed ? "fa-check-circle" : "fa-circle"
                        }`}
                      ></i>
                      {task.text}
                    </li>
                  ))}
                </ul>
              </div>
              {achievement.unlocked && (
                <div className="achievement-date">
                  <i className="fas fa-check-circle"></i>
                  Unlocked on {new Date(achievement.date).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
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
            <div className="month-nav">
              <button onClick={handlePrevMonth}>&#x25B2;</button>
              <span>{months[currentDate.getMonth()]}</span>
              <button onClick={handleNextMonth}>&#x25BC;</button>
            </div>
            <div className="year-nav">
              <button onClick={handlePrevYear}>&#x25B2;</button>
              <span>{currentDate.getFullYear()}</span>
              <button onClick={handleNextYear}>&#x25BC;</button>
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

      {/* Progress Section */}
      <section className="progress-section">
        <div className="progress-header">
          <h2 className="progress-title">
            <i className="fas fa-chart-line"></i>
            Student Progress
          </h2>
        </div>

        {!selectedSubject ? (
          <>
            <div className="progress-metrics">
              <div className="metric-card">
                <div
                  className="metric-circle"
                  style={{ "--progress": "270deg" }}
                >
                  <div className="metric-content">
                    <span className="metric-value">75%</span>
                  </div>
                </div>
                <span className="metric-label">Average Performance</span>
              </div>

              <div className="metric-card">
                <div className="metric-circle" style={{ "--progress": "88%" }}>
                  <div className="metric-content">
                    <span className="metric-value">88%</span>
                  </div>
                </div>
                <span className="metric-label">Attendance Rate</span>
              </div>

              <div className="metric-card">
                <div className="metric-circle" style={{ "--progress": "92%" }}>
                  <div className="metric-content">
                    <span className="metric-value">92%</span>
                  </div>
                </div>
                <span className="metric-label">Assignment Completion</span>
              </div>
            </div>

            <div className="progress-details">
              {Object.entries(subjectData).map(([subject, data]) => (
                <div
                  key={subject}
                  className={`progress-item ${
                    selectedSubject === subject ? "active" : ""
                  }`}
                  onClick={() => setSelectedSubject(subject)}
                >
                  <div className="progress-icon">
                    <i
                      className={`fas ${
                        subject === "Mathematics"
                          ? "fa-calculator"
                          : subject === "Science"
                          ? "fa-flask"
                          : subject === "Literature"
                          ? "fa-book"
                          : "fa-palette"
                      }`}
                    ></i>
                  </div>
                  <div className="progress-info">
                    <div className="progress-subject">{subject}</div>
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${
                            data.weeklyProgress[data.weeklyProgress.length - 1]
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="progress-percentage">
                    {data.weeklyProgress[data.weeklyProgress.length - 1]}%
                  </div>
                  <div
                    className={`trend-indicator ${
                      data.weeklyProgress[data.weeklyProgress.length - 1] >
                      data.weeklyProgress[data.weeklyProgress.length - 2]
                        ? "trend-up"
                        : "trend-down"
                    }`}
                  >
                    <i
                      className={`fas fa-arrow-${
                        data.weeklyProgress[data.weeklyProgress.length - 1] >
                        data.weeklyProgress[data.weeklyProgress.length - 2]
                          ? "up"
                          : "down"
                      }`}
                    ></i>
                    {Math.abs(
                      data.weeklyProgress[data.weeklyProgress.length - 1] -
                        data.weeklyProgress[data.weeklyProgress.length - 2]
                    )}
                    %
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <SubjectDetails
            subject={selectedSubject}
            data={subjectData[selectedSubject]}
            onBack={() => setSelectedSubject(null)}
          />
        )}
      </section>

      {/* Achievements Section */}
      <AchievementsSection />
    </div>
  );
};

export default TeacherDashboard;
