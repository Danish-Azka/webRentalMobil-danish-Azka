import React, { useState } from 'react';
import { FaAngleDown, FaTable } from "react-icons/fa";
import { IoEllipsisHorizontal, IoSettings, IoSettingsSharp, IoSquareOutline } from 'react-icons/io5';
import { useNavigate,  } from 'react-router-dom'; // Import useLocation dan useNavigate


const AdminProf = () => {
    const [open, setOpen] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const openEditForm = (clientId) => {
      setis(true);
    };
  
    const closeEditForm = () => {
      setis(false);
    };

    const navigate = useNavigate();
  
    const handleNavigation = (path) => {
      navigate(path);
    };
    
  return (
    <>
       <div className='flex py-1 items-center justify-between  mx-auto '>
          <div className={`absolute h-fit left-[171px] flex items-center  transition-all duration-500 ease-in ${open ? "top-[45px] opacity-100" : "top-[-200px] opacity-100"}`}>
            <ul className='flex rounded-s-xl bg-slate-300 py-1 opacity-100 flex-col text-sm text-white font-semibold cursor-pointer'>
              <p className='text-start px-1'
              onClick={() => }
              >Profile</p>
              <p className='text-start px-1 border-t'
               onClick={() => handleNavigation('/')}
              >Log Out</p>
            </ul>
          </div>
          <div className='flex items-center gap-2 lg:gap-5'>
            <div onClick={() => setOpen(!open)} className={` text-white ${open ? 'rotate-45' : ''}`}><IoSettingsSharp size={18}/></div>
          </div>
        </div>
    </>
  )
}

export default AdminProf