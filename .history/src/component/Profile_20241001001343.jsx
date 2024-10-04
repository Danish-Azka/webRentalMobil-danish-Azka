import React, { useEffect, useState } from 'react';
import  getAdmin from '../service/apiadmin';


const Profile = ({ onClose, onDelete }) => {
const [data, setData] = useState()
  useEffect(() => {
    fetchAdmin()
  }, [])

  const fetchAdmin = async () => {
    try {
      const admin = await getAdmin()
      
    } catch (error){

    }
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-red-600">Peringatan</h2>
        <p className="text-gray-700 mb-6">Apakah kamu yakin ingin Menghapus data ini?</p>
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onDelete} // panggil fungsi delete
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
