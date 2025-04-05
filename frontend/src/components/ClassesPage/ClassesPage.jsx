import React, { useState, useEffect } from "react";
import "./ClassesPage.css";
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Sample Data - Moved outside component to avoid dependency issues
const sampleClasses = [
  {
    id: 1,
    name: "Advanced Mathematics",
    subject: "Mathematics",
    students: 25,
    schedule: {
      days: ["Monday", "Wednesday"],
      time: "9:00 AM - 10:30 AM",
    },
    teacher: "John Doe",
    coTeachers: ["Jane Smith"],
    color: "#4CAF50",
    announcements: [
      { id: 1, text: "Quiz next week on Calculus", date: "2024-03-20" },
    ],
    classDetails: {
      totalStrength: 25,
      maleStudents: 14,
      femaleStudents: 11,
      averageAttendance: "92%",
      averagePerformance: "85%",
      classTeacher: "John Doe",
      roomNumber: "301",
      floor: "3rd Floor",
      building: "Science Block",
    },
    studentsList: [
      { id: 1, name: "Alice Johnson", rollNo: "M101", performance: "95%" },
      { id: 2, name: "Bob Smith", rollNo: "M102", performance: "88%" },
      { id: 3, name: "Carol White", rollNo: "M103", performance: "92%" },
      { id: 4, name: "David Brown", rollNo: "M104", performance: "85%" },
      { id: 5, name: "Emma Davis", rollNo: "M105", performance: "90%" },
      { id: 6, name: "Frank Wilson", rollNo: "M106", performance: "87%" },
      { id: 7, name: "Grace Taylor", rollNo: "M107", performance: "93%" },
      { id: 8, name: "Henry Martinez", rollNo: "M108", performance: "89%" },
      { id: 9, name: "Isabella Anderson", rollNo: "M109", performance: "91%" },
      { id: 10, name: "Jack Thompson", rollNo: "M110", performance: "86%" },
      { id: 11, name: "Kelly Rodriguez", rollNo: "M111", performance: "88%" },
      { id: 12, name: "Liam Garcia", rollNo: "M112", performance: "94%" },
      { id: 13, name: "Mia Lee", rollNo: "M113", performance: "92%" },
      { id: 14, name: "Noah Clark", rollNo: "M114", performance: "87%" },
      { id: 15, name: "Olivia Wright", rollNo: "M115", performance: "90%" },
    ],
  },
  {
    id: 2,
    name: "Physics Fundamentals",
    subject: "Physics",
    students: 20,
    schedule: {
      days: ["Tuesday", "Thursday"],
      time: "11:00 AM - 12:30 PM",
    },
    teacher: "John Doe",
    coTeachers: [],
    color: "#2196F3",
    announcements: [
      { id: 1, text: "Lab session tomorrow", date: "2024-03-19" },
    ],
    classDetails: {
      totalStrength: 20,
      maleStudents: 10,
      femaleStudents: 10,
      averageAttendance: "90%",
      averagePerformance: "82%",
      classTeacher: "John Doe",
      roomNumber: "201",
      floor: "2nd Floor",
      building: "Science Block",
    },
    studentsList: [
      { id: 1, name: "Eve Adams", rollNo: "P101", performance: "85%" },
      { id: 2, name: "Charlie Davis", rollNo: "P102", performance: "80%" },
      { id: 3, name: "Sophie Turner", rollNo: "P103", performance: "88%" },
      { id: 4, name: "Ryan Murphy", rollNo: "P104", performance: "92%" },
      { id: 5, name: "Lily Chen", rollNo: "P105", performance: "87%" },
      { id: 6, name: "James Wilson", rollNo: "P106", performance: "83%" },
      { id: 7, name: "Emma Scott", rollNo: "P107", performance: "90%" },
      { id: 8, name: "William Kim", rollNo: "P108", performance: "86%" },
      { id: 9, name: "Ava Patel", rollNo: "P109", performance: "89%" },
      { id: 10, name: "Lucas Brown", rollNo: "P110", performance: "84%" },
      { id: 11, name: "Sophia Martinez", rollNo: "P111", performance: "91%" },
      { id: 12, name: "Oliver Wang", rollNo: "P112", performance: "88%" },
    ],
  },
  {
    id: 3,
    name: "Chemistry Lab",
    subject: "Chemistry",
    students: 18,
    schedule: {
      days: ["Monday", "Friday"],
      time: "2:00 PM - 3:30 PM",
    },
    teacher: "John Doe",
    coTeachers: ["Robert Johnson"],
    color: "#FF5722",
    announcements: [
      { id: 1, text: "Bring safety goggles", date: "2024-03-21" },
    ],
    classDetails: {
      totalStrength: 18,
      maleStudents: 9,
      femaleStudents: 9,
      averageAttendance: "88%",
      averagePerformance: "80%",
      classTeacher: "John Doe",
      roomNumber: "401",
      floor: "4th Floor",
      building: "Science Block",
    },
    studentsList: [
      { id: 1, name: "Grace Evans", rollNo: "C101", performance: "78%" },
      { id: 2, name: "Frank Miller", rollNo: "C102", performance: "75%" },
      { id: 3, name: "Hannah Lee", rollNo: "C103", performance: "82%" },
      { id: 4, name: "Isaac Cohen", rollNo: "C104", performance: "88%" },
      { id: 5, name: "Julia Kim", rollNo: "C105", performance: "85%" },
      { id: 6, name: "Kevin Zhang", rollNo: "C106", performance: "79%" },
      { id: 7, name: "Laura Wilson", rollNo: "C107", performance: "83%" },
      { id: 8, name: "Michael Brown", rollNo: "C108", performance: "77%" },
      { id: 9, name: "Nina Patel", rollNo: "C109", performance: "86%" },
      { id: 10, name: "Oscar Rodriguez", rollNo: "C110", performance: "81%" },
    ],
  },
];

const ClassesPage = () => {
  // State Management
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterStudents, setFilterStudents] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [messageType, setMessageType] = useState("common"); // "common" or "personal"
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const classesPerPage = 6;

  // Initialize classes
  useEffect(() => {
    setClasses(sampleClasses);
    setFilteredClasses(sampleClasses);
  }, []); // Empty dependency array is fine now as sampleClasses is defined outside the component

  // Filter and Sort Functions
  useEffect(() => {
    let result = [...classes];

    // Search Filter
    if (searchQuery) {
      result = result.filter(
        (cls) =>
          cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cls.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Subject Filter
    if (filterSubject !== "all") {
      result = result.filter((cls) => cls.subject === filterSubject);
    }

    // Students Filter
    if (filterStudents !== "all") {
      switch (filterStudents) {
        case "less20":
          result = result.filter((cls) => cls.students < 20);
          break;
        case "20to30":
          result = result.filter(
            (cls) => cls.students >= 20 && cls.students <= 30
          );
          break;
        case "more30":
          result = result.filter((cls) => cls.students > 30);
          break;
        default:
          break;
      }
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "subject":
          comparison = a.subject.localeCompare(b.subject);
          break;
        case "students":
          comparison = a.students - b.students;
          break;
        default:
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredClasses(result);
  }, [classes, searchQuery, filterSubject, filterStudents, sortBy, sortOrder]);

  // Pagination
  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = filteredClasses.slice(
    indexOfFirstClass,
    indexOfLastClass
  );

  // Export Functions
  const exportToCSV = () => {
    const csvData = classes.map((cls) => ({
      Name: cls.name,
      Subject: cls.subject,
      Students: cls.students,
      Schedule: `${cls.schedule.days.join(", ")} ${cls.schedule.time}`,
      Teacher: cls.teacher,
      "Co-Teachers": cls.coTeachers.join(", "),
    }));
    return csvData;
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Name", "Subject", "Students", "Schedule", "Teacher"];
    const tableRows = classes.map((cls) => [
      cls.name,
      cls.subject,
      cls.students,
      `${cls.schedule.days.join(", ")} ${cls.schedule.time}`,
      cls.teacher,
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("classes.pdf");
  };

  const handleSendMessage = () => {
    if (messageType === "common") {
      console.log(
        `Sending common message to ${selectedClass.name}: ${messageText}`
      );
    } else {
      console.log(
        `Sending personal message to ${selectedStudent.name}: ${messageText}`
      );
    }
    setMessageText("");
    setShowMessageModal(false);
  };

  return (
    <div className={`classes-page ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Header Section */}
      <header className="page-header">
        <h1>My Classes</h1>
        <div className="header-controls">
          <button
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <div className="export-buttons">
            <CSVLink
              data={exportToCSV()}
              filename={"classes.csv"}
              className="export-btn"
            >
              Export CSV
            </CSVLink>
            <button className="export-btn" onClick={exportToPDF}>
              Export PDF
            </button>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <input
          type="text"
          placeholder="Search classes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Subjects</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
        </select>
        <select
          value={filterStudents}
          onChange={(e) => setFilterStudents(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Class Sizes</option>
          <option value="less20">&lt; 20 students</option>
          <option value="20to30">20-30 students</option>
          <option value="more30">&gt; 30 students</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="name">Sort by Name</option>
          <option value="subject">Sort by Subject</option>
          <option value="students">Sort by Students</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="sort-order-btn"
        >
          {sortOrder === "asc" ? "↑" : "↓"}
        </button>
      </div>

      {/* Classes Grid */}
      <div className="classes-grid">
        {currentClasses.map((classItem) => (
          <div
            key={classItem.id}
            className="class-card"
            style={{ borderColor: classItem.color }}
          >
            <h3>{classItem.name}</h3>
            <p className="subject">{classItem.subject}</p>
            <p className="students">Students: {classItem.students}</p>
            <p className="schedule">
              {classItem.schedule.days.join(", ")} <br />
              {classItem.schedule.time}
            </p>

            {/* Quick Actions */}
            <div className="quick-actions">
              <button
                className="view-btn"
                onClick={() => {
                  setSelectedClass(classItem);
                  setShowDetailsModal(true);
                }}
              >
                View Class Details
              </button>
              <button
                className="message-btn"
                onClick={() => {
                  setSelectedClass(classItem);
                  setShowMessageModal(true);
                }}
              >
                Send Message
              </button>
            </div>

            {/* Latest Announcement */}
            {classItem.announcements.length > 0 && (
              <div className="announcement">
                <p>Latest: {classItem.announcements[0].text}</p>
              </div>
            )}

            {/* Collaboration Info */}
            {classItem.coTeachers.length > 0 && (
              <div className="co-teachers">
                <p>Co-Teachers: {classItem.coTeachers.join(", ")}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of{" "}
          {Math.ceil(filteredClasses.length / classesPerPage)}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={indexOfLastClass >= filteredClasses.length}
        >
          Next
        </button>
      </div>

      {/* Class Details Modal */}
      {showDetailsModal && selectedClass && (
        <div
          className="modal details-modal"
          onClick={() => setShowDetailsModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setShowDetailsModal(false)}
            >
              ×
            </button>
            <h2>{selectedClass.name}</h2>
            <div className="modal-grid">
              <div className="modal-section">
                <h3>Class Overview</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Total Strength</span>
                    <span className="stat-value">
                      {selectedClass.classDetails.totalStrength}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Male Students</span>
                    <span className="stat-value">
                      {selectedClass.classDetails.maleStudents}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Female Students</span>
                    <span className="stat-value">
                      {selectedClass.classDetails.femaleStudents}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Average Attendance</span>
                    <span className="stat-value">
                      {selectedClass.classDetails.averageAttendance}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>Location Details</h3>
                <p>
                  <strong>Room:</strong> {selectedClass.classDetails.roomNumber}
                </p>
                <p>
                  <strong>Floor:</strong> {selectedClass.classDetails.floor}
                </p>
                <p>
                  <strong>Building:</strong>{" "}
                  {selectedClass.classDetails.building}
                </p>
              </div>

              <div className="modal-section">
                <h3>Teaching Staff</h3>
                <p>
                  <strong>Class Teacher:</strong>{" "}
                  {selectedClass.classDetails.classTeacher}
                </p>
                {selectedClass.coTeachers.length > 0 && (
                  <p>
                    <strong>Co-Teachers:</strong>{" "}
                    {selectedClass.coTeachers.join(", ")}
                  </p>
                )}
              </div>

              <div className="modal-section">
                <h3>Students List</h3>
                <div className="students-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Roll No</th>
                        <th>Name</th>
                        <th>Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedClass.studentsList.map((student) => (
                        <tr key={student.id}>
                          <td>{student.rollNo}</td>
                          <td>{student.name}</td>
                          <td>{student.performance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedClass && (
        <div
          className="modal message-modal"
          onClick={() => setShowMessageModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setShowMessageModal(false)}
            >
              ×
            </button>
            <h2>Send Message</h2>
            <div className="message-form">
              <div className="message-type">
                <label>
                  <input
                    type="radio"
                    value="common"
                    checked={messageType === "common"}
                    onChange={(e) => setMessageType(e.target.value)}
                  />
                  Send to Entire Class
                </label>
                <label>
                  <input
                    type="radio"
                    value="personal"
                    checked={messageType === "personal"}
                    onChange={(e) => setMessageType(e.target.value)}
                  />
                  Send to Specific Student
                </label>
              </div>

              {messageType === "personal" && (
                <select
                  value={selectedStudent?.id || ""}
                  onChange={(e) => {
                    const student = selectedClass.studentsList.find(
                      (s) => s.id === Number(e.target.value)
                    );
                    setSelectedStudent(student);
                  }}
                  className="student-select"
                >
                  <option value="">Select Student</option>
                  {selectedClass.studentsList.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              )}

              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message here..."
                rows={4}
                className="message-input"
              />

              <button
                className="send-btn"
                onClick={handleSendMessage}
                disabled={messageType === "personal" && !selectedStudent}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassesPage;
