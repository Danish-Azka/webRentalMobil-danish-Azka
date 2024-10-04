import React from 'react';
import Side from '../component/Side';
import { Navbar } from '../component/Navbar';

const Display = () => {
  return (
    <div className='flex justify-center h-screen'>
      {/* Sidebar */}
      <div className='w-[16%] h-full'>
        <Side />
      </div>
      
      {/* Main Content */}
      <div className=' w-[84%]'>
        <Navbar />

        {/* Dashboard Section */}
        <div className='flex flex-col items-center justify-center pt-5 pb-2'>
          {/* Section Title and Description */}
          <div className='w-11/12 flex justify-between items-end'>
            <div>
              <h3 className='text-gray-700 m-0 text-3xl font-medium'>RentCarkuuu</h3>
              <p className='m-0 text-gray-500'>Pilihan Mobil Tepat untuk Setiap Perjalanan!</p>
            </div>

            <div className='flex gap-3 mr-3'>
              {/* Placeholder for additional elements */}
            </div>

            {/* View Reports Button */}
            <button
              className='border-0 py-3 px-3 text-white rounded ms-5'
              style={{ backgroundColor: 'rgb(212,167,76)', fontWeight: '500' }}
            >
              View Reports
            </button>
          </div>

          {/* Navigation Menu */}
          <div className='w-11/12 mt-5'>
            <ul className='list-none flex gap-4 text-gray-700 font-medium'>
              <li className='text-teal-400'>Analytics</li>
              <li>Sales</li>
              <li>Messages</li>
              <li>Notifications</li>
              <li>Alerts</li>
              <li>Activities</li>
            </ul>
          </div>

          <div className='w-11/12 flex flex-col gap-10 justify-center'>
          <div className='bg-gray-100 w-full h-64'>s</div>
          <div className='bg-gray-100 w-full h-64'>d</div>
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default Display;
