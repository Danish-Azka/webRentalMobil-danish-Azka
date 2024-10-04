import React from 'react';

const StatBox = ({ title, value, growth }) => {
  return (
    <div className='h-full w-[30%] rounded-xl outline outline-slate-200 outline-2 px-3 py-3 bg-white'>
      <div className='h-[50%] w-full'>{title}</div>
      <div className='h-[50%] w-full flex'>
        <p className='w-[84%]'>{value}</p>
        <p className={`text-xs flex text-end ${growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          Growth {growth >= 0 ? '+' : ''}{growth}%
        </p>
      </div>
    </div>
  );
};

export default StatBox;
