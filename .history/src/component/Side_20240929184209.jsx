import React from 'react';
import aa from './aa.png'
import { IoCarSport, IoEllipsisHorizontal, IoFolderOpen, IoHome, IoLogoMicrosoft, IoPeople, IoPerson, IoRadioButtonOn, IoReturnDownBack } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation dan useNavigate
import AdminProf from './AdminProf';
const Side = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Mendapatkan rute saat ini

  // Fungsi navigasi
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className='h-full w-full'>
        <div className='w-full h-[30%] bg-V py-4 px-4'>
          <div className='flex justify-between'>
            <div>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            </div>
            <div>
              {/* <p><IoEllipsisHorizontal size={20} className='text-white' /></p> */}
                <AdminProf/>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <div className='w-full'>
              <div className='flex justify-center mt-4'>
                <div><img className='w-[120px] rounded-full' src={aa} alt="" /></div>
              </div>
              <div>
                <p className='text-white text-sm text-center mt-3'>RentCarkuu</p>
                <p className='text-gray-500 text-sm text-center mt-1'>www.RentCarku.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-[70%] bg-[rgb(36,42,66)] py-7'>
          <div className='w-full h-full'>
            <div className='h-[40%] w-full ps-3 cursor-default'>
              <div
                className={`w-full h-[25%] rounded-s-xl sideButt ${location.pathname === '/display' ? 'bg-white ' : ''}`}
                onClick={() => handleNavigation('/display')}
              >
                <div className='flex items-center w-full h-full gap-3 ps-7 text-[#1e617b] font-semibold teksSide'>
                  <IoHome /> Home
                </div>
              </div>

              <div
                className={`w-full h-[25%] rounded-s-xl sideButt ${location.pathname === '/karyawan' ? 'bg-white' : ''}`}
                onClick={() => handleNavigation('/karyawan')}
              >
                <div className='flex items-center w-full h-full gap-3 ps-7 text-[#1e617b] font-semibold teksSide'>
                  <IoPerson /> Empeloyee
                </div>
              </div>

              <div
                className={`w-full h-[25%] rounded-s-xl sideButt ${location.pathname === '/client' ? 'bg-white' : ''}`}
                onClick={() => handleNavigation('/client')}
              >
                <div className='flex items-center w-full h-full gap-3 ps-7 text-[#1e617b] font-semibold teksSide'>
                  <IoPeople /> Client
                </div>
              </div>

              <div
                className={`w-full h-[25%] rounded-s-xl sideButt ${location.pathname === '/mobil' ? 'bg-white' : ''}`}
                onClick={() => handleNavigation('/mobil')}
              >                <div className='flex items-center w-full h-full gap-3 ps-7 text-[#1e617b] font-semibold teksSide'>
                  <IoCarSport /> Car
                </div>
              </div>

              <div
                className={`w-full h-[25%] rounded-s-xl sideButt ${location.pathname === '/transaksi' ? 'bg-white' : ''}`}
                onClick={() => handleNavigation('/transaksi')}
              >                     <div className='flex items-center w-full h-full gap-3 ps-7 text-[#1e617b] font-semibold teksSide'>
                  <IoFolderOpen /> Transaction
                </div>
              </div>
              <div
                className={`w-full h-[25%] rounded-s-xl sideButt ${location.pathname === '/pengembalian' ? 'bg-white' : ''}`}
                onClick={() => handleNavigation('/pengembalian')}
              >                     <div className='flex items-center w-full h-full gap-3 ps-7 text-[#1e617b] font-semibold teksSide'>
                  <IoReturnDownBack /> Return
                </div>
              </div>

            </div>
            <div className='w-full h-[60%] flex items-end'>
              <div className='w-full px-3 '></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Side;
