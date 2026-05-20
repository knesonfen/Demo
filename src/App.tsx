import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAppStore } from "./store";
import Dashboard from "@/pages/Dashboard";
import Accounts from "@/pages/Accounts";
import Analytics from "@/pages/Analytics";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import PublishConfig from "@/pages/PublishConfig";

export default function App() {
  const { isAuthenticated } = useAppStore();
  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/accounts" element={isAuthenticated ? <Accounts /> : <Navigate to="/login" />} />
        <Route path="/analytics" element={isAuthenticated ? <Analytics /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/publish-config" element={isAuthenticated ? <PublishConfig /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}
