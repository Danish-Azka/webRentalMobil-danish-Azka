import React, { useState, useEffect } from 'react';
import { getKaryawanById, editKaryawan } from '../service/apiKaryawan';
const ModalEditKaryawan = ({ karyawanId, onClose }) => {
  const [formData, setFormData] = useState({
    nama: '',
    noTelp: '',
    noKtp: ''
  });

  // Fetch karyawan data when the modal is opened
  useEffect(() => {
    const fetchKaryawanData = async () => {
      try {
        const karyawan = await getKaryawanById(karyawanId);
        setFormData({
          nama: karyawan.nama,
          noTelp: karyawan.noTelp,
          email: karyawan.email,
          divisi: karyawan.divisi
        });
      } catch (error) {
        console.error('Failed to fetch karyawan data', error);
      }
    };
    fetchKaryawanData();
  }, [karyawanId]);

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
      await editKaryawan(karyawanId, formData);
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error('Failed to update karyawan', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-blue-600">Edit karyawan</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nama</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="border w-full p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nomor Telepon</label>
            <input
              type="text"
              name="noTelp"
              value={formData.noTelp}
              onChange={handleChange}
              className="border w-full p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border w-full p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Divisi</label>
            <input
              type="text"
              name="divisi"
              value={formData.divisi}
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

export default ModalEditKaryawan;
