import React, { useState, useEffect } from 'react';
import { getTransaksiById, editTransaksi } from '../service/apiTransaksi';
const ModalEditTransaksi = ({ transaksiId, onClose }) => {
  const [formData, setFormData] = useState({
    tanggalPeminjaman: '',
    batasPeminjaman: '',
    durasiSewa: '',
    totalBiaya:'',
    harga:'',
    ClientId:'',
    MobilId:'',
    KaryawanId:''
  });

  // Fetch karyawan data when the modal is opened
  useEffect(() => {
    const fetchTransaksiData = async () => {
      try {
        const transaksi = await getTransaksiById(transaksiId);
        setFormData({
          tanggalPeminjaman: transaksi.tanggalPeminjaman,
          batasPeminjaman: transaksi.batasPeminjaman,
          durasiSewa: transaksi.durasiSewa,
          totalBiaya: transaksi.totalBiaya,
          harga : transaksi.harga,
          ClientId: transaksi.ClientId,
          MobilId: transaksi.MobilId,
          KaryawanId: transaksi.KaryawanId
        });
      } catch (error) {
        console.error('Failed to fetch transaksi data', error);
      }
    };
    fetchTransaksiData();
  }, [transaksiId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editTransaksi(transaksiId, formData);
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error('Failed to update transaksi', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-blue-600">Edit Transaksi</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Tanggal Peminjaman</label>
            <input
              type="text"
              name="tanggalPeminjaman"
              value={formData.tanggalPeminjaman}
              onChange={handleChange}
              className="border w-full p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Batas Peminjaman</label>
            <input
              type="text"
              name="batasPeminjaman"
              value={formData.batasPeminjaman}
              onChange={handleChange}
              className="border w-full p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Durasi Sewa</label>
            <input
              type="text"
              name="durasiSewa"
              value={formData.durasiSewa}
              onChange={handleChange}
              className="border w-full p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Total Biaya</label>
            <input
              type="text"
              name="totalBiaya"
              value={formData.totalBiaya}
              onChange={handleChange}
              className="border w-full p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">ClientId</label>
            <input
              type="text"
              name="ClientId"
              value={formData.ClientId}
              onChange={handleChange}
              className="border w-full p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">MobilId</label>
            <input
              type="text"
              name="MobilId"
              value={formData.MobilId}
              onChange={handleChange}
              className="border w-full p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">KaryawanId</label>
            <input
              type="text"
              name="KaryawanId"
              value={formData.KaryawanId}
              onChange={handleChange}
              className="border w-full p-2 mt-1"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditTransaksi;
