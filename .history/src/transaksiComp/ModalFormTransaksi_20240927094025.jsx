// src/components/ClientForm.js
import React, { useState } from 'react';
import { createTransaksi } from '../service/apiTransaksi';
import moment from 'moment/moment';
const ModalFormTransaksi = ({ onClose }) => {
  const [formData, setFormData] = useState({
    tanggalPeminjaman: '',
    batasPeminjaman: '',
    durasiSewa: '',
    totalBiaya:'',
    ClientId: '',
    MobilId: '',
    KaryawanId: ''
  });

  let tanggal1 = new moment(formData.tanggalPeminjaman; 
  let tanggal2 = formData.batasPeminjaman; 
  let selisih = tanggal2.diff(tanggal1, 'days');

  const hasil = () => {
    console.log(selisih)
  }   

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await createTransaksi(formData);  // Call the API service
      console.log('Form submitted:', formData);
      onClose(); // Close the form after successful submit
    } catch (err) {
      setError('Failed to submit form');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white  w-[400px] p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Tambah Transaksi</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Tanggal Peminjaman:</label>
            <input
              type="text"
              name="tanggalPeminjaman"
              value={formData.tanggalPeminjaman}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Batas Peminjaman:</label>
            <input
              type="text"
              name="batasPeminjaman"
              value={formData.batasPeminjaman}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Durasi Sewa:</label>
            <input
              type="text"
              name="durasiSewa"
              value={formData.durasiSewa}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Total Biaya:</label>
            <input
              type="text"
              name="totalBiaya"
              value={formData.totalBiaya}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">ClientId:</label>
            <input
              type="text"
              name="ClientId"
              value={formData.ClientId}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">MobilId:</label>
            <input
              type="text"
              name="MobilId"
              value={formData.MobilId}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">KaryawanId:</label>
            <input
              type="text"
              name="KaryawanId"
              value={formData.KaryawanId}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50' : ''}`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFormTransaksi;
