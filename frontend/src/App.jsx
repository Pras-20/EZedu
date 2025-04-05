import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TeacherDashboard from "./components/TeacherDashboard/TeacherDashboard";
import TeacherQueries from "./components/TeacherQueries/TeacherQueries";
import ClassesPage from "./components/ClassesPage/ClassesPage";
import Sidebar from "./components/Sidebar/Sidebar";
import NotFound from "./components/NotFound/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            {/* Home route */}
            <Route path="/" element={<TeacherDashboard />} />

            {/* Teacher Dashboard route */}
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />

            {/* Other routes */}
            <Route path="/teacher/queries" element={<TeacherQueries />} />
            <Route path="/classes" element={<ClassesPage />} />

            {/* Catch all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
