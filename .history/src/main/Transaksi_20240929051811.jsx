import React, { useEffect, useState } from 'react';
import { deleteTransaksi, getTransaksi } from '../service/apiTransaksi';
import Side from '../component/Side';
import StatBox from '../component/Statbox';
import ModalFormTransaksi from '../transaksiComp/ModalFormTransaksi';
import ModalDeleteTransaksi from '../transaksiComp/ModalDeleteTransaksi';
import ModalEditTransaksi from '../transaksiComp/ModalEditTransaksi';
const Transaksi = () => {
    const [data, setData] =useState([])
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isDeleteOpen, setDeleteOpen] = useState(false)
    const [selectedTransaksiId, setSelectedTransaksiId] = useState(null)
    const [isEditOpen, setEditOpen] = useState(false)
    const [editedData, setEditedData] = useState(null)
    //modal edit data
    useEffect (() => {
      fetchTranskasi()
    },[])

    const fetchTranskasi = async() => {
      try{
        const transaksi = await getTransaksi();
        setData(transaksi)
      }catch (error){
        console.error('error fetching transkasi', error)
      }
    }
    const openEdit = (transaksiId) => {
      setEditedData(transaksiId)
      setEditOpen(true)
    }
    const closeEdit = () => {
      setEditOpen(false)
      setEditedData(null)
    }
    //modal delete data
    const openDelete = (transaksiId) => {
      setSelectedTransaksiId(transaksiId)
      setDeleteOpen(true)
    }
    const closeDelete = () => {
      setDeleteOpen(false)
      setSelectedTransaksiId(null)
    }
    const HandleDelete = async () => {
      if(selectedTransaksiId)
        try{
          await deleteTransaksi(selectedTransaksiId)
          setData(prevData => prevData.filter(transaksi => transaksi.id !== selectedTransaksiId))
          closeDelete()
        }catch (error){
          console.error('eror deleting transaction')
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
        getTransaksi()
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
            <StatBox title="Total Transaksi" value="200" growth={5} />
            <StatBox title="Total Revenue" value="$50,000" growth={10} />
            <StatBox title="New Transaksis" value="25" growth={2} />
          </div>
          <div className='flex justify-end '>
            <div className='bg-slate-600 outline outline-slate-700 outline-1 text-xs text-white px-1 py-1 rounded-lg cursor-default hover:bg-slate-800 hover:text-slate-300 mt-2'
            onClick={handleOpenForm}
            >Add New Transaksi
            </div>
          </div>
        </div>

      </div>
      {isFormVisible && <ModalFormTransaksi onClose={handleCloseForm} />}
      {isDeleteOpen && <ModalDeleteTransaksi onClose={closeDelete} onDelete={HandleDelete}/>}
      {isEditOpen && <ModalEditTransaksi transaksiId={editedData} onClose={closeEdit}/> }
       {/* bagian table */}
       <div className='bg-slate-50 h-[80%] w-full'>
       <div className="container mx-auto ">
      <table className="w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 w-[5%] text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">ID</th>
            <th className="p-3 w-[15%] text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">Tanggal Peminjaman</th>
            <th className="p-3 w-[15%] text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">Batas Peminjaman</th>
            <th className="p-3 w-[15%] text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">Durasi Sewa</th>
            <th className="p-3 w-[17%] text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">Total Biaya</th>
            <th className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">ClientId</th>
            <th className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">MobilId</th>
            <th className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">KaryawanId</th>
            <th className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">Action</th>
          </tr>
        </thead>
        <tbody>
        {data && data.map((item, index) => (
          <tr key ={index} className="">
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.id}</td>
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.tanggalPeminjaman}</td>
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.batasPeminjaman}</td>
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.durasiSewa}</td>
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.totalBiaya}</td>
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.Mo.id}</td>
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.MobilId}</td>
            <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">{item.KaryawanId}</td>
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

export default Transaksi;
