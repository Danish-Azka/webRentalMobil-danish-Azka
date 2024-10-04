// src/components/ClientForm.js
import React, { useEffect, useState } from 'react';
import { createPengembalian } from '../service/apiPengembalian';
import { getTransaksiById } from '../service/apiTransaksi';

const ModalFormPengembalian = ({ onClose }) => {
  const [formData, setFormData] = useState({
    tanggalPengembalian: '',
    batasPeminjaman: '',
    TransaksiId: '',
    ClientId: '',
    MobilId: '',
    KaryawanId: ''
  });
 
  const [transaksiDate, setTransaksiDate] = useState(0)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const FetchTransaksiDate = async () => {
      if(formData.TransaksiId) {
        try {
          const response = await getTransaksiById(formData.TransaksiId);
          setTransaksiDate(response.batasPeminjaman);
        } catch (err) {
          console.error('Error mengambil Tgl transaksi:', err);
          setTransaksiDate(0);
        }
      } else {
        setTransaksiDate(0)
      }
    };

    FetchTransaksiDate();
  }, [formData.TransaksiId])


  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      batasPeminjaman: transaksiDate
    }));
  }, [transaksiDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await createPengembalian(formData);  // Call the API service
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
      <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Tambah Transaksi</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">TransaksiId:</label>
            <input
              type="text"
              name="TransaksiId"
              value={formData.TransaksiId}
              re
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Batas Peminjaman:</label>
            <input
              type="date"
              name="batasPeminjaman"
              value={formData.batasPeminjaman}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Tanggal Pengembalian:</label>
            <input
              type="text"
              name="tanggalPengembalian"
              value={formData.tanggalPengembalian}
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

export default ModalFormPengembalian;
