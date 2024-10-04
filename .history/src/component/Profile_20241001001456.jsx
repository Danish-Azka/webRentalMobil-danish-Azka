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
      setData(admin)
    } catch (error){
      console.error('Error fetching clients:', error);
    }
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
      {data &&
                  data.map((item, index) => (
                    <tr key={index} className="">
                      <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">
                        {item.id}
                      </td>
                      <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">
                        {item.nama}
                      </td>
                      <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">
                        {item.noTelp}
                      </td>
                      <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">
                        {item.noKtp}
                      </td>
                      <td className="text-sm border border-slate-300 border-r-2 text-center">
                        <div className="rounded flex justify-center gap-1">
                          <div className="bg-green-500 px-3 text-white rounded-lg cursor-default"
                          onClick={() => openEditForm(item.id)}>
                            Edit
                          </div>
                          <div
                            className="bg-red-500 px-3 text-white rounded-lg cursor-pointer"
                            onClick={() => openDelete(item.id)}
                          >
                            Delete
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
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
