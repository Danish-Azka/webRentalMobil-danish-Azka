import React, { useEffect, useState } from 'react';
import Side from '../component/Side';
import StatBox from '../component/Statbox';
import ModalFormKaryawan from '../KaryawanComp/ModalFormKaryawan';
import { getKaryawan, deleteKaryawan } from '../service/apiKaryawan';
import ModalDeleteKaryawan from '../KaryawanComp/ModalDeleteKaryawan';
import ModalEditKaryawan from '../KaryawanComp/ModalEditKaryawan';
const Client = () => {
    const [data, setData] =useState([])
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isDeleteOpen, setDeleteOpen] = useState(false)
    const [selectedKaryawanId, setSelectedKaryawanId] = useState(null)
    const [isEditOpen, setEditOpen] = useState(false)
    const [editedData, setEditedData] = useState(null)
    //modal edit data
    useEffect(() => {
      fetchKaryawan()
    },[])
  
    const fetchKaryawan = async () => {
      try {
        const empeloye = await getKaryawan();
        setData(empeloye);
      } catch (error) {
        console.error('error fetching empeloye', error)
      }
    }

    const openEditForm = (karyawanId) => {
      setEditedData(karyawanId);
      setEditOpen(true)
    };

    const closeEditForm = () => {
      setEditOpen(false)
      setEditedData(null)
    }
    //modal delete data
  const openDelete = (id) => {
    setSelectedKaryawanId(id);
    setDeleteOpen(true)
  }

  const closeDelete = () => {
    setDeleteOpen(false);
    setSelectedKaryawanId(null);
  }

  const handleDeleteKaryawan = async () => {
    if (selectedKaryawanId) {
      try{
        await deleteKaryawan(selectedKaryawanId);
        setData(prevData => prevData.filter(karyawan => karyawan.id !== selectedKaryawanId));
        closeDelete();
      } catch (error) {
        console.error("error deleting Karyawan")
      }
    }
  };


    // modal post data
const handleOpenForm = () => {
setIsFormVisible(true);
};
const handleCloseForm = () => {
setIsFormVisible(false);
};
    useEffect(()=> {
        fetchApi()
    }, [])
    const fetchApi = () => {
        getKaryawan()
            .then(res => {
                setData(res);
                console.log(res)
            })
            .catch(error => {
                console.error('Error:', error);
            });

    };

  return (
    <div className='flex justify-center h-screen'>
      <div className='w-[16%] h-full'>
        <Side />
      </div>
     
     <div className='px-5 py-5 h-full flex flex-col justify-between  w-[84%]'>
        {/* bagian atas */}
       <div className='w-full rounded-t-xl bg-slate-50'>
        <div className=' py-1 top'>
          <div className='h-full flex justify-between'>
            <StatBox title="Total Client" value="200" growth={5} />
            <StatBox title="Total Revenue" value="$50,000" growth={10} />
            <StatBox title="New Clients" value="25" growth={2} />
          </div>
          <div className='flex justify-end '>
            <div className='bg-slate-600 outline outline-slate-700 outline-1 text-xs text-white px-1 py-1 rounded-lg cursor-default hover:bg-slate-800 hover:text-slate-300 mt-2'
            onClick={handleOpenForm}
            >Add New Client
            </div>
          </div>
        </div>

      </div>
      {isFormVisible && <ModalFormKaryawan onClose={handleCloseForm} />}
      {isDeleteOpen && <ModalDeleteKaryawan onClose={closeDelete} onDelete={handleDeleteKaryawan} />}
      {isEditOpen && <ModalEditKaryawan karyawanId={editedData} onClose={(closeEditForm)}/>}
       {/* bagian table */}
       <div className='bg-slate-50 h-[80%] w-full'>
       <div className="container mx-auto ">
      <table className="w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 w-[10%] text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">ID</th>
            <th className="p-3 w-[15%] text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">Nama</th>
            <th className="p-3 w-[20%]text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">Nomor Telepon</th>
            <th className="p-3 w-[22%]text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">Email</th>
            <th className="p-3 w-[22%]text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">Divisi</th>
            <th className="p-3 w-[23%]text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">Action</th>
          </tr>
        </thead>
        <tbody>
        {data && data.map((item, index) => (
          <tr key={index} className="">
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.id}</td>
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.nama}</td>
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.noTelp}</td>
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.email}</td>
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.divisi}</td>
            <td className=" text-sm  border border-slate-300 border-r-2 text-center">
            <div className=" rounded flex justify-center gap-1">
                <div className='bg-green-500 px-3 text-white rounded-lg cursor-default'
                onClick={() => openEditForm(item.id)}
                >Edit</div>
                <div className='bg-red-500 px-3 text-white rounded-lg cursor-default'
                onClick={() => openDelete(item.id)}
                >Delete</div>
            </div>
            </td>
          </tr>
        ))}
        </tbody>
        
      </table>
    </div>
       </div>
     </div>
    </div>
  );
};

export default Client;
