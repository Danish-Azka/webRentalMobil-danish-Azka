import React, { useState, useEffect } from 'react';
import { getMobilById, editMobil } from '../service/apiMobil';
const ModalEditMobil = ({ mobilId, onClose }) => {
  const [formData, setFormData] = useState({
    merk: '',
    model: '',
    platNomor: '',
    kapasitasPenumpang:'',
    harga:'',
    gambar:'',
    ClientId:''
  });

  // Fetch karyawan data when the modal is opened
  useEffect(() => {
    const fetchKaryawanData = async () => {
      try {
        const karyawan = await getMobilById(mobilId);
        setFormData({
          merk: karyawan.merk,
          model: karyawan.model,
          platNomor: karyawan.platNomor,
          kapasitasPenumpang: karyawan.kapasitasPenumpang
        });
      } catch (error) {
        console.error('Failed to fetch karyawan data', error);
      }
    };
    fetchKaryawanData();
  }, [mobilId]);

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
      await editMobil(mobilId, formData);
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
            <label className="block text-gray-700">merk</label>
            <input
              type="text"
              name="merk"
              value={formData.merk}
              onChange={handleChange}
              className="border w-full p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="border w-full p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Plat Nomor</label>
            <input
              type="text"
              name="platNomor"
              value={formData.platNomor}
              onChange={handleChange}
              className="border w-full p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Kapasitas Penumpang</label>
            <input
              type="text"
              name="kapasitasPenumpang"
              value={formData.kapasitasPenumpang}
              onChange={handleChange}
              className="border w-full p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Biaya Per Hari</label>
            <input
              type="text"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              className="border w-full p-2 mt-1"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Gambar</label>
            <input
              type="text"
              name="gambar"
              value={formData.gambar}
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

export default ModalEditMobil;
