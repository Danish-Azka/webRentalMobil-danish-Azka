// src/components/ClientForm.js
import React, { useState } from 'react';
import { createKaryawan } from '../service/apiKaryawan';

const ModalFormKaryawan = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nama: '',
    noTelp: '',
    email: '',
    divisi:''
  });

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
      await createKaryawan(formData);  // Call the API service
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
        <h2 className="text-lg font-bold mb-4">Tambah Client</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form  onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Nama:</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Nomor Telepon:</label>
            <input
              type="text"
              name="noTelp"
              value={formData.noTelp}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Divisi:</label>
            <input
              type="text"
              name="divisi"
              value={formData.divisi}
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

export default ModalFormKaryawan;
