import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Side from './component/Side';
import Display from './main/Display';
import Client from './main/Client';
import Mobil from './main/Mobil';
import Transaksi from './main/Transaksi';
import Karyawan from './main/Karyawan';
import Pengembalian from './main/Pengembalian';
import Login from './main/Login';
import Sign from './main/Sign';
import AdminProf from './component/AdminProf';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/client" element={<Client />} />
        <Route path="/mobil" element={<Mobil />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/karyawan" element={<Karyawan />} />
        <Route path="/pengembalian" element={<Pengembalian />} />
        <Route path="/display" element={<Display />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/profil" element={<AdminProf />} />
      </Routes>
    </Router>
  );
};

export default App;
