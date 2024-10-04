import React, { useEffect, useState } from 'react';
import { deleteMobil, getMobil } from '../service/apiMobil';
import Side from '../component/Side';
import StatBox from '../component/Statbox';
import ModalFormCar from '../mobilComp/ModalFormCar';
import ModalDeleteMobil from '../mobilComp/ModalDeleteCar';
import ModalEditMobil from '../mobilComp/ModalEditMobil';
import CarInfoModal from '../mobilComp/CarInfoModal';
import aa from '../component/aa.png';

const Mobil = () => {
  const [data, setData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [selectedMobilId, setSelectedMobilId] = useState(null);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isCarInfoOpen, setCarInfoOpen] = useState(false);
  const [carData, setCarData] = useState(null);
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    fetchMobil();
  }, []);

  const fetchMobil = async () => {
    try {
      const mobil = await getMobil();
      setData(mobil);
      console.log(mobil)
    } catch (error) {
      console.error('Error fetching mobil', error);
    }
  };

  // Modal for car info
  const openCarInfo = (mobil) => {
    setCarData(mobil);
    setCarInfoOpen(true);
  };

  const closeCarInfo = () => {
    setCarInfoOpen(false);
    setCarData(null);
  };

  // Open edit modal
  const openEditForm = (mobilId) => {
    setEditedData(mobilId);
    setEditOpen(true);
  };

  const closeEditForm = () => {
    setEditOpen(false);
    setEditedData(null);
  };

  // Open delete modal
  const openDelete = (id) => {
    setSelectedMobilId(id);
    setDeleteOpen(true);
  };

  const closeDelete = () => {
    setDeleteOpen(false);
    setSelectedMobilId(null);
  };

  const handleDelete = async () => {
    if (selectedMobilId) {
      try {
        await deleteMobil(selectedMobilId);
        setData(prevData => prevData.filter(mobil => mobil.id !== selectedMobilId));
        closeDelete();
      } catch (error) {
        console.error("Error deleting Mobil");
      }
    }
  };

  return (
    <div className='flex justify-center h-screen'>
      <div className='w-[16%] h-full'>
        <Side />
      </div>

      <div className='px-5 py-5 h-full flex flex-col justify-between w-[84%]'>
        {/* Top Section */}
        <div className='w-full rounded-t-xl bg-slate-50'>
          <div className='py-1 top'>
            <div className='h-full flex justify-between'>
              <StatBox title="Total Mobil" value="200" growth={5} />
              <StatBox title="Total Revenue" value="$50,000" growth={10} />
              <StatBox title="New Mobils" value="25" growth={2} />
            </div>
            <div className='flex justify-end'>
              <div
                className='bg-slate-600 outline outline-slate-700 outline-1 text-xs text-white px-1 py-1 rounded-lg cursor-pointer hover:bg-slate-800 hover:text-slate-300 mt-2'
                onClick={() => setIsFormVisible(true)}
              >
                Add New Mobil
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {isFormVisible && <ModalFormCar onClose={() => setIsFormVisible(false)} />}
        {isDeleteOpen && <ModalDeleteMobil onClose={closeDelete} onDelete={handleDelete} />}
        {isEditOpen && <ModalEditMobil mobilId={editedData} onClose={closeEditForm} />}
        {isCarInfoOpen && <CarInfoModal carData={carData} onClose={closeCarInfo} />}

        {/* Display Cards */}
        <div className='bg-slate-50 h-[80%] w-full p-2'>
          <div className="container grid grid-cols-4 ">
            {data && data.map((item, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden mb-4 w-[280px] max-w-sm mx-auto">
                <img src={item.gambar} alt="Car Thumbnail" className="w-full h-48 object-cover" />
                <div className=" flex justify-end gap-1 bg-slate-600 p-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 "
                    onClick={() => openCarInfo(item)}
                  >
                    View Details
                  </button>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600"
                      onClick={() => openEditForm(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                      onClick={() => openDelete(item.id)}
                    >
                      Delete
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobil;
