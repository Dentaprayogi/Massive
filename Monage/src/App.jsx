import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import AnggaranKosong from "./pages/AnggranKosong";
import ProfileEdit from "./pages/ProfileEdit";
import PasswordEdit from "./pages/PasswordEdit";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/anggarankosong" element={<AnggaranKosong />} />
        <Route path="/ubahprofil" element={<ProfileEdit />} />
        <Route path="/ubahpassword" element={<PasswordEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
