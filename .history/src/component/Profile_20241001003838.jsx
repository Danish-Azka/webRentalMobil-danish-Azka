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
      <div className="bg-slate-100 w-[400px]  rounded-lg shadow-lg px-3 flex flex-col justify-center">
      <div className="bg-white rounded-lg h-16 p-6 shadow-lg">
      </div>
        <div className='bg-slate-300 rounded-full h-20 w-20 mx-auto left-[] absolute'>d</div>
        <div className='text-center'>
          <p className='text-lg font-semibold'>Azka Rahmat</p>
          <p className='text-sm'>Azka@gmail.com</p>
        </div>
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

{/* {data &&
        data.map((item, index) => (
          <p>{item.email}</p>
          ))} */}

export default Profile;
