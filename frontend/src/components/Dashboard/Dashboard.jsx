import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./Dashboard.css";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isAttendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [attendance, setAttendance] = useState({});
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [selectedReportStudent, setSelectedReportStudent] = useState(null);
  const [studentMarks, setStudentMarks] = useState({});
  const [selectedStudentMarks, setSelectedStudentMarks] = useState(null);
  const [isAssignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [isDailyTasksModalOpen, setDailyTasksModalOpen] = useState(false);
  const [isViewAllAttendanceOpen, setIsViewAllAttendanceOpen] = useState(false);
  const [dailyTasks, setDailyTasks] = useState([
    { id: 1, title: "Take attendance for Class 10A", completed: false },
    { id: 2, title: "Review homework submissions", completed: false },
    { id: 3, title: "Prepare lesson plan for tomorrow", completed: false },
    { id: 4, title: "Grade Math quizzes", completed: true },
    { id: 5, title: "Parent-teacher meeting at 2 PM", completed: false },
    { id: 6, title: "Submit weekly progress report", completed: false },
  ]);
  const [selectedAttendanceStudent, setSelectedAttendanceStudent] =
    useState(null);
  const [attendanceStats, setAttendanceStats] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [reminderDateTime, setReminderDateTime] = useState("");
  const [repeatOption, setRepeatOption] = useState("none");
  const [priority, setPriority] = useState("normal");
  const [customMessage, setCustomMessage] = useState("");

  const students = useMemo(
    () => [
      {
        id: "01",
        name: "John Smith",
        gender: "Male",
        grade: "10",
        section: "A",
        rollNo: "001",
        attendance: "95%",
      },
      {
        id: "02",
        name: "Emma Davis",
        gender: "Female",
        grade: "9",
        section: "B",
        rollNo: "002",
        attendance: "98%",
      },
      {
        id: "03",
        name: "Michael Johnson",
        gender: "Male",
        grade: "10",
        section: "C",
        rollNo: "003",
        attendance: "92%",
      },
      {
        id: "04",
        name: "Sarah Wilson",
        gender: "Female",
        grade: "9",
        section: "A",
        rollNo: "004",
        attendance: "96%",
      },
    ],
    []
  );

  const schedule = [
    { period: "1st", grade: "10", section: "A" },
    { period: "2nd", grade: "9", section: "B" },
  ];

  const filterStudents = useCallback(() => {
    let filtered = [...students];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.grade.includes(query) ||
          student.section.toLowerCase().includes(query) ||
          student.rollNo.includes(query)
      );
    }

    if (selectedGender) {
      filtered = filtered.filter(
        (student) => student.gender === selectedGender
      );
    }

    if (selectedGrade) {
      filtered = filtered.filter((student) => student.grade === selectedGrade);
    }

    setFilteredStudents(filtered);
  }, [searchQuery, selectedGender, selectedGrade, students]);

  useEffect(() => {
    filterStudents();
  }, [filterStudents]);

  useEffect(() => {
    // Generate sample attendance data for demonstration
    const generateAttendanceStats = () => {
      const stats = {};
      students.forEach((student) => {
        const subjects = [
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "English",
        ];
        const currentDate = new Date();
        const attendanceData = {
          subjects: subjects.reduce((acc, subject) => {
            acc[subject] = {
              present: Math.floor(Math.random() * 40) + 55, // 55-95 present days
              total: 100,
              dates: [],
            };
            return acc;
          }, {}),
          recentAttendance: [],
        };

        // Generate last 30 days attendance
        for (let i = 0; i < 30; i++) {
          const date = new Date(currentDate);
          date.setDate(date.getDate() - i);
          if (date.getDay() !== 0 && date.getDay() !== 6) {
            // Exclude weekends
            const status = Math.random() > 0.15 ? "Present" : "Absent";
            attendanceData.recentAttendance.push({
              date: date.toISOString().split("T")[0],
              status,
              subjects: subjects.reduce((acc, subject) => {
                acc[subject] = Math.random() > 0.1 ? "Present" : "Absent";
                return acc;
              }, {}),
            });
          }
        }

        stats[student.id] = attendanceData;
      });
      setAttendanceStats(stats);
    };

    generateAttendanceStats();
  }, [students]);

  const handleProfileClick = () => {
    // Example functionality: Open profile menu or redirect
    console.log("Profile icon clicked");
    // You can replace this with actual functionality, like opening a modal or redirecting
  };

  const handleSearchClick = useCallback(() => {
    setSearchModalOpen(true);
    setFilteredStudents(students);
  }, [students]);

  const handleStudentSelect = useCallback((student) => {
    setSelectedStudent(student);
  }, []);

  const closeSearchModal = useCallback(() => {
    setSearchModalOpen(false);
    setSelectedStudent(null);
    setSearchQuery("");
    setSelectedGender("");
    setSelectedGrade("");
  }, []);

  const handleMarkAttendanceClick = () => {
    setAttendanceModalOpen(true);
  };

  const handleAttendanceChange = (studentId, status) => {
    console.log("Marking attendance:", studentId, status);
    setAttendance((prev) => {
      const newAttendance = { ...prev };
      if (newAttendance[studentId] === status) {
        delete newAttendance[studentId];
      } else {
        newAttendance[studentId] = status;
      }
      console.log("Updated attendance state:", newAttendance);
      return newAttendance;
    });
  };

  const downloadAttendance = () => {
    const data = students.map((student) => ({
      RollNo: student.rollNo,
      Name: student.name,
      Attendance: attendance[student.id] || "Not Marked",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "attendance.xlsx");
  };

  useEffect(() => {
    console.log("Attendance state updated:", attendance);
  }, [attendance]);

  const generateRandomMarks = () => {
    const subjects = ["Maths", "Science", "Social Science", "Hindi", "English"];
    const marks = {};

    students.forEach((student) => {
      marks[student.id] = {
        UT1: subjects.reduce((acc, subject) => {
          acc[subject] = Math.floor(Math.random() * 101); // Random marks between 0-100
          return acc;
        }, {}),
        UT2: subjects.reduce((acc, subject) => {
          acc[subject] = Math.floor(Math.random() * 101); // Random marks between 0-100
          return acc;
        }, {}),
      };
    });

    setStudentMarks(marks);
  };

  const handleGenerateReportClick = () => {
    generateRandomMarks();
    setReportModalOpen(true);
  };

  const downloadReport = () => {
    const data = Object.keys(studentMarks).map((studentId) => {
      const student = students.find((s) => s.id === studentId);
      return {
        Name: student.name,
        ...studentMarks[studentId].UT1,
        ...studentMarks[studentId].UT2,
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Student Performance");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "student_performance_report.xlsx");
  };

  const handleStudentSelectReport = (student) => {
    setSelectedReportStudent(student);
    setSelectedStudentMarks(studentMarks[student.id]);
  };

  const downloadIndividualReport = () => {
    if (!selectedReportStudent) return;

    const data = {
      Name: selectedReportStudent.name,
      ...selectedStudentMarks.UT1,
      ...selectedStudentMarks.UT2,
    };

    const ws = XLSX.utils.json_to_sheet([data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Student Performance");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${selectedReportStudent.name}_performance_report.xlsx`);
  };

  const handleCreateAssignment = () => {
    setCurrentAssignment(null);
    setAssignmentModalOpen(true);
  };

  const handleSaveAssignment = (assignment) => {
    if (currentAssignment) {
      // Edit existing assignment
      setAssignments(
        assignments.map((a) => (a.id === assignment.id ? assignment : a))
      );
    } else {
      // Create new assignment
      setAssignments([...assignments, { ...assignment, id: Date.now() }]);
    }
    setAssignmentModalOpen(false);
  };

  const handleDeleteAssignment = (id) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  const handleDailyTasksClick = () => {
    setDailyTasksModalOpen(true);
  };

  const toggleTaskCompletion = (taskId) => {
    setDailyTasks(
      dailyTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addNewTask = (taskTitle) => {
    if (!taskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
    };

    setDailyTasks([...dailyTasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setDailyTasks(dailyTasks.filter((task) => task.id !== taskId));
  };

  const handleAttendanceItemClick = (student) => {
    setSelectedAttendanceStudent(student);
  };

  const handleViewAllAttendance = () => {
    setIsViewAllAttendanceOpen(true);
    setFilteredStudents(students);
  };

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const scheduleReminderNotifications = (message, date) => {
    const reminderTime = new Date(date).getTime();
    const now = Date.now();
    const fiveMinutesBefore = reminderTime - 5 * 60 * 1000;

    if (fiveMinutesBefore > now) {
      setTimeout(() => {
        new Notification("Reminder", {
          body: `Upcoming: ${message}`,
        });
      }, fiveMinutesBefore - now);
    }

    if (reminderTime > now) {
      setTimeout(() => {
        new Notification("Reminder", {
          body: `It's time: ${message}`,
        });
      }, reminderTime - now);
    }
  };

  const handleSaveReminder = () => {
    console.log("Reminder saved with:", {
      dateTime: reminderDateTime,
      repeatOption,
      priority,
      customMessage,
    });
    scheduleReminderNotifications(customMessage, reminderDateTime);
    setIsReminderModalOpen(false);
  };

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Good evening, teacher!</h1>
        <div className="profile-icon" onClick={handleProfileClick}>
          <i className="fas fa-user-circle"></i>
        </div>
      </header>

      <section className="schedule-section">
        <h2>Schedule</h2>
      </section>

      <section className="student-details">
        <h2>Student Details</h2>
        <div className="action-buttons">
          <button className="action-btn" onClick={handleSearchClick}>
            <div className="circle-icon">
              <i className="fas fa-search"></i>
            </div>
            <span>Search Student</span>
          </button>
          <button className="action-btn" onClick={handleMarkAttendanceClick}>
            <div className="circle-icon">
              <i className="fas fa-clipboard-list"></i>
            </div>
            <span>Mark Attendance</span>
          </button>
          <Link to="/teacher-queries">
            <button className="action-btn">
              <div className="circle-icon">
                <i className="fas fa-question-circle"></i>
              </div>
              <span>Answer Queries</span>
            </button>
          </Link>
          <button className="action-btn" onClick={handleDailyTasksClick}>
            <div className="circle-icon">
              <i className="fas fa-tasks"></i>
            </div>
            <span>Daily Tasks</span>
          </button>
          <button className="action-btn" onClick={handleGenerateReportClick}>
            <div className="circle-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <span>Generate Report</span>
          </button>
        </div>
      </section>

      {isSearchModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeSearchModal}>
              <i className="fas fa-times"></i>
            </button>
            <h2>Search Students</h2>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by name, grade, or section..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fas fa-search"></i>
            </div>
            <div className="filters">
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
              >
                <option value="">Select Grade</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
              </select>
            </div>
            <ul className="student-list">
              {filteredStudents.map((student) => (
                <li
                  key={student.id}
                  onClick={() => handleStudentSelect(student)}
                  className="student-item"
                >
                  <div className="student-avatar">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div className="student-info">
                    <strong>{student.name}</strong>
                    <span>
                      Grade {student.grade} | Section {student.section}
                    </span>
                    <span>Roll No. {student.rollNo}</span>
                  </div>
                </li>
              ))}
              {filteredStudents.length === 0 && (
                <li className="no-results">No students found</li>
              )}
            </ul>
          </div>
        </div>
      )}

      {selectedStudent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeSearchModal}>
              <i className="fas fa-times"></i>
            </button>
            <h2>{selectedStudent.name}'s Details</h2>
            <img
              src={`https://ui-avatars.com/api/?name=${selectedStudent.name}&background=4285f4&color=fff&size=120`}
              alt="Profile"
              className="profile-pic"
            />
            <p>
              <strong>Gender:</strong> {selectedStudent.gender}
            </p>
            <p>
              <strong>Grade:</strong> {selectedStudent.grade}
            </p>
            <p>
              <strong>Section:</strong> {selectedStudent.section}
            </p>
            <p>
              <strong>Roll No:</strong> {selectedStudent.rollNo}
            </p>
            <p>
              <strong>Attendance:</strong> {selectedStudent.attendance}
            </p>
          </div>
        </div>
      )}

      {isAttendanceModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content attendance-modal">
            <button
              className="close-btn"
              onClick={() => setAttendanceModalOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <h2>Mark Attendance</h2>

            <div className="filter-section">
              <label>Select Period:</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="">Select a Period</option>
                {schedule.map((item) => (
                  <option key={item.period} value={item.period}>
                    {item.period} - Grade {item.grade} Section {item.section}
                  </option>
                ))}
              </select>
            </div>

            {selectedPeriod && (
              <div className="student-list">
                <h3>Students in {selectedPeriod}</h3>
                {students.map((student) => (
                  <div key={student.id} className="student-item">
                    <div className="student-avatar">
                      <i className="fas fa-user-circle"></i>
                    </div>
                    <div className="student-info">
                      <strong>{student.name}</strong>
                      <span>Roll No: {student.rollNo}</span>
                    </div>
                    <div className="attendance-buttons">
                      <button
                        className={`attendance-btn present ${
                          attendance[student.id] === "Present" ? "active" : ""
                        }`}
                        onClick={() =>
                          handleAttendanceChange(student.id, "Present")
                        }
                        type="button"
                      >
                        Present
                      </button>
                      <button
                        className={`attendance-btn absent ${
                          attendance[student.id] === "Absent" ? "active" : ""
                        }`}
                        onClick={() =>
                          handleAttendanceChange(student.id, "Absent")
                        }
                        type="button"
                      >
                        Absent
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedPeriod && (
              <button className="download-btn" onClick={downloadAttendance}>
                Download Attendance
              </button>
            )}
          </div>
        </div>
      )}

      {isReportModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setReportModalOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <h2>Student Performance Report</h2>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by student name..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fas fa-search"></i>
            </div>
            <ul className="student-list">
              {Object.keys(studentMarks).map((studentId) => {
                const student = students.find((s) => s.id === studentId);
                return (
                  <li
                    key={studentId}
                    onClick={() => handleStudentSelectReport(student)}
                    className="student-item"
                  >
                    <div className="student-info">
                      <strong>{student.name}</strong>
                    </div>
                  </li>
                );
              })}
            </ul>
            <button className="download-btn" onClick={downloadReport}>
              Download All Reports
            </button>
          </div>
        </div>
      )}

      {selectedStudentMarks && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setSelectedStudentMarks(null)}
            >
              <i className="fas fa-times"></i>
            </button>
            <h2>{selectedReportStudent.name}'s Marks</h2>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>UT-1</th>
                  <th>UT-2</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(selectedStudentMarks.UT1).map((subject) => (
                  <tr key={subject}>
                    <td>{subject}</td>
                    <td>{selectedStudentMarks.UT1[subject]}</td>
                    <td>{selectedStudentMarks.UT2[subject]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="download-btn" onClick={downloadIndividualReport}>
              Download Individual Report
            </button>
          </div>
        </div>
      )}

      <div className="dashboard-content">
        <div className="main-content">
          <section className="assignments-card">
            <div className="card-content">
              <div className="card-icon">
                <i className="fas fa-clipboard-check"></i>
              </div>
              <div className="card-text">
                <h3>Assignments</h3>
                <p>Track student assignment easily!</p>
              </div>
            </div>
            <button className="create-btn" onClick={handleCreateAssignment}>
              Create
            </button>
          </section>

          <section className="tasks-section">
            {/* <h2>Today's tasks</h2> */}
            <div className="reminders-card">
              <div className="card-content">
                <div className="card-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="card-text">
                  <h3>Reminders</h3>
                  <p>Set reminders for tasks!</p>
                </div>
              </div>
              <button
                className="set-btn"
                onClick={() => setIsReminderModalOpen(true)}
              >
                Set
              </button>
            </div>
          </section>

          <section className="materials-section">
            <h2>Educational Materials</h2>
            <div className="materials-grid">
              <button className="material-btn">
                <i className="fas fa-book"></i>
                <span>Study</span>
              </button>
              <button className="material-btn">
                <i className="fas fa-folder"></i>
                <span>Resources</span>
              </button>
              <button className="material-btn">
                <i className="fas fa-pen"></i>
                <span>Tests</span>
              </button>
              <button className="material-btn">
                <i className="fas fa-check-circle"></i>
                <span>Quizzes</span>
              </button>
            </div>
          </section>
        </div>

        <aside className="dashboard-sidebar">
          <section className="daily-tasks-card">
            <h2>Daily tasks</h2>
            <p>Manage your daily tasks efficiently!</p>
            <button className="add-btn" onClick={handleDailyTasksClick}>
              Add
            </button>
          </section>

          <section className="attendance-section">
            <h2>Manage Attendance</h2>
            <div className="attendance-list">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="attendance-item"
                  onClick={() => handleAttendanceItemClick(student)}
                >
                  <div className="student-info">
                    <span className="student-id">{student.id}</span>
                    <div className="student-avatar">
                      <i className="fas fa-user-circle"></i>
                    </div>
                    <span className="student-name">{student.name}</span>
                  </div>
                  <span className="attendance-percentage">
                    {student.attendance}
                  </span>
                </div>
              ))}
              <button
                className="view-all-btn"
                onClick={handleViewAllAttendance}
              >
                View All
              </button>
            </div>
          </section>

          <button className="action-btn" onClick={() => window.location.href = '/notifications'}>
            <div className="circle-icon">
              <i className="fas fa-bell"></i>
            </div>
            <span>Notifications</span>
          </button>
        </aside>
      </div>

      {isAssignmentModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content assignment-modal">
            <button
              className="close-btn"
              onClick={() => setAssignmentModalOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <h2>
              {currentAssignment ? "Edit Assignment" : "Create Assignment"}
            </h2>

            <form onSubmit={handleSaveAssignment}>
              <input type="text" placeholder="Assignment Title" required />
              <textarea
                placeholder="Assignment Description"
                required
              ></textarea>

              <label>Submission Deadline</label>
              <input type="date" required />

              <label>Upload Files</label>
              <input type="file" accept=".pdf,.doc,.docx" multiple />

              <button type="submit">Save</button>
            </form>

            {currentAssignment && (
              <button
                onClick={() => handleDeleteAssignment(currentAssignment.id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}

      {isDailyTasksModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content daily-tasks-modal">
            <button
              className="close-btn"
              onClick={() => setDailyTasksModalOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <h2>Daily Tasks</h2>

            <div className="add-task-form">
              <input
                type="text"
                placeholder="Add a new task..."
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addNewTask(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <div className="task-tip">Press Enter to add a new task</div>
            </div>

            <div className="tasks-list">
              {dailyTasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-item ${task.completed ? "completed" : ""}`}
                >
                  <div
                    className="task-checkbox"
                    onClick={() => toggleTaskCompletion(task.id)}
                  >
                    {task.completed && <i className="fas fa-check"></i>}
                  </div>
                  <span className="task-title">{task.title}</span>
                  <button
                    className="delete-task"
                    onClick={() => deleteTask(task.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="tasks-summary">
              <span>
                {dailyTasks.filter((task) => task.completed).length} of{" "}
                {dailyTasks.length} tasks completed
              </span>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${
                      (dailyTasks.filter((task) => task.completed).length /
                        dailyTasks.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedAttendanceStudent &&
        attendanceStats[selectedAttendanceStudent.id] && (
          <div className="modal-overlay">
            <div className="modal-content attendance-details-modal">
              <button
                className="close-btn"
                onClick={() => {
                  setSelectedAttendanceStudent(null);
                  setSelectedDate(null);
                }}
              >
                <i className="fas fa-times"></i>
              </button>
              <h2>{selectedAttendanceStudent.name}'s Attendance</h2>

              <div className="attendance-overview">
                <div className="overall-attendance">
                  <h3>Overall Attendance</h3>
                  <div className="attendance-percentage-circle">
                    <span className="percentage">
                      {selectedAttendanceStudent.attendance}
                    </span>
                  </div>
                </div>

                <div className="subject-wise-attendance">
                  <h3>Subject-wise Attendance</h3>
                  {Object.entries(
                    attendanceStats[selectedAttendanceStudent.id].subjects
                  ).map(([subject, stats]) => (
                    <div key={subject} className="subject-attendance">
                      <div className="subject-header">
                        <span className="subject-name">{subject}</span>
                        <span className="subject-percentage">
                          {Math.round((stats.present / stats.total) * 100)}%
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress"
                          style={{
                            width: `${(stats.present / stats.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="attendance-calendar">
                  <h3>Recent Attendance</h3>
                  <div className="calendar-grid">
                    {attendanceStats[
                      selectedAttendanceStudent.id
                    ].recentAttendance
                      .slice(0, 10)
                      .map((day) => (
                        <div
                          key={day.date}
                          className={`calendar-day ${
                            selectedDate === day.date ? "selected" : ""
                          } ${day.status.toLowerCase()}`}
                          onClick={() =>
                            setSelectedDate(
                              selectedDate === day.date ? null : day.date
                            )
                          }
                        >
                          <div className="date">
                            {new Date(day.date).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                            })}
                          </div>
                          {selectedDate === day.date && (
                            <div className="day-details">
                              <div className="status">{day.status}</div>
                              <div className="subject-details">
                                {Object.entries(day.subjects).map(
                                  ([subject, status]) => (
                                    <div key={subject} className="subject-row">
                                      <span className="subject-name">
                                        {subject}
                                      </span>
                                      <span
                                        className={`status ${status.toLowerCase()}`}
                                      >
                                        {status}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                <div className="attendance-stats">
                  <div className="stat-box">
                    <h4>Present Days</h4>
                    <span className="stat-value">
                      {
                        Object.values(
                          attendanceStats[selectedAttendanceStudent.id].subjects
                        )[0].present
                      }
                    </span>
                  </div>
                  <div className="stat-box">
                    <h4>Absent Days</h4>
                    <span className="stat-value">
                      {Object.values(
                        attendanceStats[selectedAttendanceStudent.id].subjects
                      )[0].total -
                        Object.values(
                          attendanceStats[selectedAttendanceStudent.id].subjects
                        )[0].present}
                    </span>
                  </div>
                  <div className="stat-box">
                    <h4>Total Days</h4>
                    <span className="stat-value">
                      {
                        Object.values(
                          attendanceStats[selectedAttendanceStudent.id].subjects
                        )[0].total
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {isViewAllAttendanceOpen && (
        <div className="modal-overlay">
          <div className="modal-content view-all-attendance-modal">
            <button
              className="close-btn"
              onClick={() => setIsViewAllAttendanceOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <h2>All Students Attendance</h2>

            <div className="search-filter-section">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search by name or ID..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>
              <div className="filters">
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                >
                  <option value="">All Grades</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                </select>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                >
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="all-students-list">
              <div className="list-header">
                <span>ID</span>
                <span>Name</span>
                <span>Grade</span>
                <span>Section</span>
                <span>Attendance</span>
                <span>Details</span>
              </div>
              <div className="list-body">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <div key={student.id} className="student-row">
                      <span>{student.id}</span>
                      <span>{student.name}</span>
                      <span>Grade {student.grade}</span>
                      <span>Section {student.section}</span>
                      <span className="attendance-cell">
                        {student.attendance}
                      </span>
                      <button
                        className="view-details-btn"
                        onClick={() => {
                          handleAttendanceItemClick(student);
                          setIsViewAllAttendanceOpen(false);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="no-results">No students found</div>
                )}
              </div>
            </div>

            <div className="attendance-summary">
              <div className="summary-box">
                <h4>Total Students</h4>
                <span>{filteredStudents.length}</span>
              </div>
              <div className="summary-box">
                <h4>Average Attendance</h4>
                <span>
                  {filteredStudents.length > 0
                    ? `${Math.round(
                        filteredStudents.reduce(
                          (acc, student) =>
                            acc + parseInt(student.attendance.replace("%", "")),
                          0
                        ) / filteredStudents.length
                      )}%`
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {isReminderModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setIsReminderModalOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <h2>Set Reminder</h2>
            <div className="search-bar">
              <input
                type="datetime-local"
                className="date-time-input"
                value={reminderDateTime}
                onChange={(e) => setReminderDateTime(e.target.value)}
              />
              <i className="fas fa-clock"></i>
            </div>
            <div className="additional-options">
              <select
                value={repeatOption}
                onChange={(e) => setRepeatOption(e.target.value)}
              >
                <option value="none">No Repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low Priority</option>
                <option value="normal">Normal Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <textarea
              placeholder="Add a custom message"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows="3"
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #e0e0e0",
              }}
            />
            <button className="reminder-save-btn" onClick={handleSaveReminder}>
              Save Reminder
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
