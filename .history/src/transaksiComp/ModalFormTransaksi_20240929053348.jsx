import React, { useEffect, useState } from 'react';
import { createTransaksi } from '../service/apiTransaksi';
import moment from 'moment/moment';
import { getMobilById } from '../service/apiMobil'; // Mengasumsikan kamu memiliki API untuk mengambil data mobil

const ModalFormTransaksi = ({ onClose }) => {
  const [formData, setFormData] = useState({
    tanggalPeminjaman: '',
    batasPeminjaman: '',
    durasiSewa: '',
    totalBiaya: '',
    ClientId: '',
    MobilId: '',
    KaryawanId: ''
  });

  const [mobilPrice, setMobilPrice] = useState(0);
  const [selisih, setSelisih] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Menghitung durasi sewa (selisih) saat tanggal berubah
  useEffect(() => {
    const tanggalPinjam = moment(formData.tanggalPeminjaman);
    const tanggalKembali = moment(formData.batasPeminjaman);
    const diffDays = tanggalKembali.diff(tanggalPinjam, 'days');
    const validSelisih = isNaN(diffDays) || diffDays < 0 ? 0 : diffDays;
    setSelisih(validSelisih);

    // Update durasiSewa di formData
    setFormData((prevData) => ({
      ...prevData,
      durasiSewa: validSelisih
    }));
  }, [formData.tanggalPeminjaman, formData.batasPeminjaman]);

  // Mengambil harga mobil saat MobilId berubah
  useEffect(() => {
    const fetchMobilPrice = async () => {
      if (formData.MobilId) {
        try {
          const response = await getMobilById(formData.MobilId); // Mengambil detail mobil berdasarkan ID
          setMobilPrice(response.harga); // Mengasumsikan respon memiliki field 'harga'
        } catch (err) {
          console.error('Error mengambil harga mobil:', err);
          setMobilPrice(0);
        }
      } else {
        setMobilPrice(0); // Reset jika tidak ada MobilId yang dipilih
      }
    };

    fetchMobilPrice();
  }, [formData.MobilId]);

  // Menghitung biaya total saat selisih atau harga mobil berubah
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      totalBiaya: selisih * formData.mo
    }));
  }, [selisih, formData.mo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createTransaksi(formData);  // Panggil layanan API
      console.log('Formulir dikirim:', formData);
      onClose(); // Tutup formulir setelah berhasil dikirim
    } catch (err) {
      setError('Gagal mengirim formulir');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Tambah Transaksi</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Tanggal Peminjaman:</label>
            <input
              type="date"
              name="tanggalPeminjaman"
              value={formData.tanggalPeminjaman}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Batas Peminjaman:</label>
            <input
              type="date"
              name="batasPeminjaman"
              value={formData.batasPeminjaman}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Durasi Sewa:</label>
            <input
              type="text"
              name="durasiSewa"
              value={formData.durasiSewa} // Gunakan formData.durasiSewa
              readOnly
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">ClientId:</label>
            <input
              type="text"
              name="ClientId"
              value={formData.ClientId}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">KaryawanId:</label>
            <input
              type="text"
              name="KaryawanId"
              value={formData.KaryawanId}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">MobilId:</label>
            <input
              type="text"
              name="MobilId"
              value={formData.MobilId}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Total Biaya:</label>
            <input
              type="text"
              name="totalBiaya"
              value={formData.totalBiaya}
              readOnly
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50' : ''}`}
              disabled={loading}
            >
              {loading ? 'Mengirim...' : 'Kirim'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFormTransaksi;
