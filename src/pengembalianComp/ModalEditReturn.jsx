import React, { useState, useEffect } from 'react';
import { getPengembalianById, editPengembalian } from '../service/apiPengembalian';
const ModalEditReturn = ({ pengembalianId, onClose }) => {
  const [formData, setFormData] = useState({
    tanggalPengembalian: '',
    TransaksiId: '',
    ClientId:'',
    MobilId:'',
    KaryawanId:''
  });

  // Fetch karyawan data when the modal is opened
  useEffect(() => {
    const fetchPengembalianData = async () => {
      try {
        const transaksi = await getPengembalianById(pengembalianId);
        setFormData({
          tanggalPengembalian: transaksi.tanggalPengembalian,
          TransaksiId: transaksi.TransaksiId,
          ClientId: transaksi.ClientId,
          MobilId: transaksi.MobilId,
          KaryawanId: transaksi.KaryawanId
        });
      } catch (error) {
        console.error('Failed to fetch transaksi data', error);
      }
    };
    fetchPengembalianData();
  }, [pengembalianId]);

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
      await editPengembalian(pengembalianId, formData);
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error('Failed to update pengembalian', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-blue-600">Edit Transaksi</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Tanggal Pengembalian</label>
            <input
              type="text"
              name="tanggalPengembalian"
              value={formData.tanggalPengembalian}
              onChange={handleChange}
              className="border w-full p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">TransaksiId</label>
            <input
              type="text"
              name="TransaksiId"
              value={formData.TransaksiId}
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

export default ModalEditReturn;
