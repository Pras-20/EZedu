import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeacherDashboard from "./components/TeacherDashboard/TeacherDashboard";
import TeacherQueries from "./components/TeacherQueries/TeacherQueries";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeacherDashboard />} />
        <Route path="/teacher/queries" element={<TeacherQueries />} />
      </Routes>
    </Router>
  );
}

export default App;
