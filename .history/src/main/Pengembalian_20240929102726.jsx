import React, { useEffect, useState } from 'react';
import Side from '../component/Side';
import StatBox from '../component/Statbox';
import { deletePengembalian, getPengembalian } from '../service/apiPengembalian';
import ModalFormPengembalian from '../pengembalianComp/ModalFormPengembalian';
import ModalDeleteReturn from '../pengembalianComp/ModalDeleteReturn';
import ModalEditReturn from '../pengembalianComp/ModalEditReturn';
const Pengembalian = () => {
    const [data, setData] =useState([])
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [selectedReturnId, setSelectedReturnId] = useState(null)
    const [isEditOpen, setEditOpen] = useState(false)
    const [editedData, setEditedData] = useState(null)
    //modal edit data
    useEffect (() => {
      fetchPengembalian()
    },[])

    const fetchPengembalian = async() => {
      try {
        const pengembalian = await getPengembalian();
        setData(pengembalian)
      }catch (error){
        console.error('error fetching pengembalian', error)
      }
    }
    const openEdit = (pengembalianId) => {
      setEditedData(pengembalianId)
      setEditOpen(true)
    }
    const closeEdit = () => {
      setEditOpen(false)
      setEditedData(null)
    }
    //modal delete data
    const openDelete = (pengembalianId) => {
      setSelectedReturnId(pengembalianId);
      setDeleteOpen(true)
    }
    const closeDelete = () => {
      setDeleteOpen(false)
      setSelectedReturnId(null)
    }
    const handleDelete = async() => {
      try{
        await deletePengembalian(selectedReturnId)
        setData(prevData => prevData.filter(transaksi => transaksi.id !== selectedReturnId))
        closeDelete()
      }catch (error){
        console.error('eror hapus pengembalian', error)
      }
    }
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
        getPengembalian()
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
            <StatBox title="Total Pengembalian" value="200" growth={5} />
            <StatBox title="Total Revenue" value="$50,000" growth={10} />
            <StatBox title="New Transaksis" value="25" growth={2} />
          </div>
          <div className='flex justify-end '>
            <div className='bg-slate-600 outline outline-slate-700 outline-1 text-xs text-white px-1 py-1 rounded-lg cursor-default hover:bg-slate-800 hover:text-slate-300 mt-2'
            onClick={handleOpenForm}
            >Add New Pengembalian
            </div>
          </div>
        </div>

      </div>
      {isFormVisible && <ModalFormPengembalian onClose={handleCloseForm} />}
      {isDeleteOpen && <ModalDeleteReturn onClose={closeDelete} onDelete={handleDelete}/>}
      {isEditOpen && <ModalEditReturn pengembalianId={editedData} onClose={closeEdit}/>}
       {/* bagian table */}
       <div className='bg-slate-50 h-[80%] w-full'>
       <div className="container mx-auto ">
      <table className="w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 w-[5%] text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">ID</th>
            <th className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">Batas Pengembalian</th>
            <th className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">Tanggal Pengembalian</th>
            <th className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">TransaksiId</th>
            <th className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">ClientId</th>
            <th className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">MobilId</th>
            <th className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">KaryawanId</th>
            <th className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">Action</th>
          </tr>
        </thead>
        <tbody>
        {data && data.map((item, index) => (
          <tr key={index} className="">
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.id}</td>
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.transaksi.}</td>
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.tanggalPengembalian}</td>
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.TransaksiId}</td>
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.ClientId}</td>
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.MobilId}</td>
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.Karyawan.nama}</td>
            <td className=" text-sm  border border-slate-300 border-r-2 text-center">
            <div className=" rounded flex justify-center gap-1">
                <div className='bg-green-500 px-3 text-white rounded-lg' 
                onClick={() => openEdit(item.id)}
                >Edit</div>
                <div className='bg-red-500 px-3 text-white rounded-lg '
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

export default Pengembalian;
