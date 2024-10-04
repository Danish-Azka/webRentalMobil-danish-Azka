import React from 'react';

const CarInfoModal = ({ carData, onClose }) => {
  if (!carData) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Car Information</h2>
        <p><strong>Merk:</strong> {carData.merk}</p>
        <p><strong>Model:</strong> {carData.model}</p>
        <p><strong>ID:</strong> {carData.id}</p>
        <p><strong>Plat Nomor:</strong> {carData.platNomor}</p>
        <p><strong>Kapasitas Penumpang:</strong> {carData.kapasitasPenumpang}</p>
        <p><strong>Harga:</strong> {carData.harga}</p>
        <p><strong>Client ID:</strong> {carData.Client.nama}</p>
        
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarInfoModal;
