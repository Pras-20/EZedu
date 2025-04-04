import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import TeacherDashboard from "./components/TeacherDashboard/TeacherDashboard";
import TeacherQueries from "./components/TeacherQueries/TeacherQueries";

function App() {
  console.log("App component rendering");
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<TeacherDashboard />} />
        <Route path="/teacher-queries" element={<TeacherQueries />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
