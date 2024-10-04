import React, { useEffect, useState } from 'react';
import { getAdmin } from '../service/apiadmin';

const Profile = ({ onClose, onDelete }) => {
const [data, setData] = useState()
  useEffect(() => {
    fetchAdmin()
  }, [])

  const fetchAdmin = async () => {
    getAdmin()
    .then(res => {
      setData(res);
      console.log(res);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-slate-100 rounded-lg shadow-lg">
      <div className="bg-white rounded-lg p-6 shadow-lg">
      </div>
        <p className="text-gray-700 mb-6">Apakah kamu yakin ingin Menghapus data ini?</p>
        <div className="flex justify-end gap-2">
          {/* <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onDelete} 
          >
            Hapus
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
