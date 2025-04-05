import React, { useState } from "react";
import "./ClassesPage.css";

const ClassesPage = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  const classes = [
    { id: 1, name: "Math 101", details: "Algebra and Geometry" },
    { id: 2, name: "Physics 201", details: "Newtonian Mechanics" },
    { id: 3, name: "Chemistry 301", details: "Organic Chemistry" },
  ];

  const handleClassClick = (classItem) => {
    setSelectedClass(classItem);
  };

  return (
    <div className="classes-page">
      <h1>Classes Assigned Today</h1>
      <ul className="class-list">
        {classes.map((classItem) => (
          <li key={classItem.id} onClick={() => handleClassClick(classItem)}>
            {classItem.name}
          </li>
        ))}
      </ul>
      {selectedClass && (
        <div className="class-details">
          <h2>{selectedClass.name}</h2>
          <p>{selectedClass.details}</p>
        </div>
      )}
    </div>
  );
};

export default ClassesPage;
