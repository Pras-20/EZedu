import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./Dashboard.css";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Link } from 'react-router-dom';

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
      {
        id: "05",
        name: "David Brown",
        gender: "Male",
        grade: "11",
        section: "B",
        rollNo: "005",
        attendance: "89%",
      },
      {
        id: "06",
        name: "Lisa Anderson",
        gender: "Female",
        grade: "11",
        section: "A",
        rollNo: "006",
        attendance: "94%",
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

  // Function to navigate to TeacherQueries page
  const handleAnswerQueriesClick = () => {
    // Set window.location.href directly to the full URL
    const baseUrl = window.location.origin;
    // For hash router, we need to use the hash format
    window.location.href = `${baseUrl}/#/teacher-queries`;
    // This forces a complete page reload and should resolve routing issues
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
          <button className="action-btn" onClick={handleGenerateReportClick}>
            <div className="circle-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <span>Generate Report</span>
          </button>
          <button className="action-btn">
            <div className="circle-icon">
              <i className="fas fa-chevron-right"></i>
            </div>
            <span>More Options</span>
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
              <button className="set-btn">Set</button>
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
            <button className="add-btn">Add</button>
          </section>

          <section className="attendance-section">
            <h2>Manage Attendance</h2>
            <div className="attendance-list">
              {students.map((student) => (
                <div key={student.id} className="attendance-item">
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
              <button className="view-all-btn">View All</button>
            </div>
          </section>
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
    </main>
  );
};

export default Dashboard;
