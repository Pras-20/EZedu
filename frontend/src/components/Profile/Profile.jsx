import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [teacher, setTeacher] = useState({
    name: "John Doe",
    email: "john.doe@school.edu",
    phone: "+1 (555) 123-4567",
    subject: "Mathematics",
    designation: "Senior Teacher",
    department: "Science Department",
    joinDate: "August 15, 2018",
    education: "M.Ed in Education, B.Sc in Mathematics",
    bio: "Experienced teacher with a passion for making mathematics accessible and engaging for all students. Specializing in advanced mathematics and problem-solving techniques.",
    classes: ["10A", "11B", "12A"],
    subjects: ["Algebra", "Calculus", "Statistics"]
  });

  const [editedTeacher, setEditedTeacher] = useState({...teacher});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTeacher({ ...editedTeacher, [name]: value });
  };

  const handleSave = () => {
    setTeacher(editedTeacher);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTeacher({...teacher});
    setIsEditing(false);
  };

  return (
    <main className="profile-container">
      <header className="profile-header">
        <div className="header-content">
          <h1>Teacher Profile</h1>
          <Link to="/" className="back-btn">
            <i className="fas fa-arrow-left"></i> Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-picture-container">
            <img 
              src={`https://ui-avatars.com/api/?name=${teacher.name}&background=4285f4&color=fff&size=200`} 
              alt="Profile" 
              className="profile-picture"
            />
            {!isEditing && (
              <button className="edit-photo-btn">
                <i className="fas fa-camera"></i>
              </button>
            )}
          </div>
          <h2 className="profile-name">{teacher.name}</h2>
          <p className="profile-designation">{teacher.designation}</p>
          <p className="profile-department">{teacher.department}</p>
          
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">{teacher.classes.length}</span>
              <span className="stat-label">Classes</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{teacher.subjects.length}</span>
              <span className="stat-label">Subjects</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">120</span>
              <span className="stat-label">Students</span>
            </div>
          </div>
          
          {!isEditing && (
            <button 
              className="edit-profile-btn"
              onClick={() => setIsEditing(true)}
            >
              <i className="fas fa-edit"></i> Edit Profile
            </button>
          )}
        </div>

        <div className="profile-details">
          {isEditing ? (
            <div className="edit-form">
              <h2>Edit Profile</h2>
              
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={editedTeacher.name} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={editedTeacher.email} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="form-group">
                <label>Phone</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={editedTeacher.phone} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="form-group">
                <label>Main Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  value={editedTeacher.subject} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="form-group">
                <label>Designation</label>
                <input 
                  type="text" 
                  name="designation" 
                  value={editedTeacher.designation} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="form-group">
                <label>Department</label>
                <input 
                  type="text" 
                  name="department" 
                  value={editedTeacher.department} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="form-group">
                <label>Education</label>
                <input 
                  type="text" 
                  name="education" 
                  value={editedTeacher.education} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="form-group">
                <label>Bio</label>
                <textarea 
                  name="bio" 
                  value={editedTeacher.bio} 
                  onChange={handleInputChange}
                  rows="4"
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button className="save-btn" onClick={handleSave}>
                  <i className="fas fa-save"></i> Save Changes
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  <i className="fas fa-times"></i> Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="info-section">
                <h3><i className="fas fa-info-circle"></i> Personal Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Full Name</span>
                    <span className="info-value">{teacher.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{teacher.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{teacher.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Join Date</span>
                    <span className="info-value">{teacher.joinDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="info-section">
                <h3><i className="fas fa-user-graduate"></i> Academic Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Main Subject</span>
                    <span className="info-value">{teacher.subject}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Designation</span>
                    <span className="info-value">{teacher.designation}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Department</span>
                    <span className="info-value">{teacher.department}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Education</span>
                    <span className="info-value">{teacher.education}</span>
                  </div>
                </div>
              </div>
              
              <div className="info-section">
                <h3><i className="fas fa-book-open"></i> Classes & Subjects</h3>
                <div className="classes-subjects">
                  <div className="classes">
                    <h4>Classes</h4>
                    <ul>
                      {teacher.classes.map((cls, index) => (
                        <li key={index}>{cls}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="subjects">
                    <h4>Subjects</h4>
                    <ul>
                      {teacher.subjects.map((subject, index) => (
                        <li key={index}>{subject}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="info-section">
                <h3><i className="fas fa-user-tag"></i> Bio</h3>
                <p className="bio">{teacher.bio}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile; 