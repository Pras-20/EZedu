import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import TeacherDashboard from "./components/TeacherDashboard/TeacherDashboard";
import TeacherQueries from './components/TeacherQueries/TeacherQueries';
import "./App.css";

const Layout = ({ children }) => (
  <div className="app">
    <Sidebar />
    {children}
  </div>
);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Layout>
          <Dashboard />
        </Layout>
      ),
    },
    {
      path: "/teacher-dashboard",
      element: (
        <Layout>
          <TeacherDashboard />
        </Layout>
      ),
    },
    {
      path: "/teacher-queries",
      element: (
        <Layout>
          <TeacherQueries />
        </Layout>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
