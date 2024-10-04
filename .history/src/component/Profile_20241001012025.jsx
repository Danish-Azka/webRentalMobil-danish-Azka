import React, { useEffect, useState } from 'react';
import { getAdmin } from '../service/apiadmin';
import { IoCloseSharp } from "react-icons/io5";

const Profile = ({ onClose, onDelete }) => {
  const [admin, setAdmin] = useState(null); // Simpan satu data admin

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    getAdmin()
      .then((res) => {
        if (res && res.length > 0) {
          setAdmin(res[0]); // Ambil admin pertama dari array
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-slate-100 w-[400px] rounded-lg shadow-lg px-3 flex flex-col justify-center relative">
        <div className="bg-white rounded-lg py-6 justify-end flex shadow-lg">
          <button
            className="bg-gray-500 text-white px-2 py-2 rounded hover:bg-red-600"
            onClick={onClose}
          >
            <IoCloseSharp />
          </button>
        </div>

        {admin && (
          <>
            <div className='bg-slate-300 rounded-full h-24 w-24 mx-auto absolute left-1/2 top-[40%] transform -translate-x-1/2 -translate-y-1/2'>
              {/* Tambahkan gambar atau avatar di sini jika ada */}
              d
            </div>
            <div className='text-center mt-20'>
              <p className='text-lg font-semibold'>{admin.name || "Admin Name"}</p>
              <p className='text-sm'>{admin.email}</p>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                <a href="https://www.instagram.com/azkrmt_" target="_blank" rel="noopener noreferrer">
                  A
                </a>
              </div>
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                B
              </div>
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                C
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
