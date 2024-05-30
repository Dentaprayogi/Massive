import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

import Transaction from "./pages/TransactionPage";
import EditTransactions from "./pages/EditTransaction";
import AddTransaction from "./pages/AddTransaction";
import AddIncome from "./pages/AddIncome";
import AddSaving from "./pages/AddSaving";
import DeleteTransactionPopup from "./pages/DeleteTransactionPopup";

import AnggaranKosong from "./pages/AnggranKosong";
import ProfileEdit from "./pages/ProfileEdit";
import PasswordEdit from "./pages/PasswordEdit";
import Laporan from "./pages/Laporan";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Transaksi */}
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/edittransaction" element={<EditTransactions />} />
        <Route path="/addtransaction" element={<AddTransaction />} />
        <Route path="/addincome" element={<AddIncome />} />
        <Route path="/addsaving" element={<AddSaving />} />
        <Route path="/delete" element={<DeleteTransactionPopup />} />

        {/* Anggaran */}
        <Route path="/anggarankosong" element={<AnggaranKosong />} />

        {/* Laporan */}
        <Route path="/laporan" element={<Laporan />} />

        {/* Profile */}
        <Route path="/ubahprofil" element={<ProfileEdit />} />
        <Route path="/ubahpassword" element={<PasswordEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
