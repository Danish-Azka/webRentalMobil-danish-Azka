import React, { useEffect, useState } from 'react';
import { getClients, deleteClient } from '../service/apiClient';
import Side from '../component/Side';
import StatBox from '../component/Statbox';
import ModalForm from '../clientComp/ModalForm';
import ModalDelete from '../clientComp/ModalDelete';
import FormEdit from '../clientComp/FornEdit';

const Client = () => {
  const [data, setData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null); // untuk menyimpan ID yang akan dihapus
  const [editedData, setEditedData] = useState(null);
  //modal edit data
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const clients = await getClients();
      setData(clients);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const openEditForm = (clientId) => {
    setEditedData(clientId);
    setEditVisible(true);
  };

  const closeEditForm = () => {
    setEditVisible(false);
    setEditedData(null);
  };
  // modal delete data
  const openDelete = (id) => {
    setSelectedClientId(id);  // simpan ID client yang akan dihapus
    setDeleteOpen(true);
  };

  const closeDelete = () => {
    setDeleteOpen(false);
    setSelectedClientId(null); // reset id abis modal ditutup
  };

  const handleDeleteClient = async () => {
    if (selectedClientId) {
      try {
        await deleteClient(selectedClientId);  
        setData(prevData => prevData.filter(client => client.id !== selectedClientId)); // filter data 
        closeDelete(); 
      } catch (error) {
        console.error("Error deleting client:", error);
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

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = () => {
    getClients()
      .then(res => {
        setData(res);
        console.log(res);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="w-[16%] h-full">
        <Side />
      </div>

      <div className="px-5 py-5 h-full flex flex-col justify-between  w-[84%]">
        {/* bagian atas */}
        <div className="w-full rounded-t-xl bg-slate-50">
          <div className="py-1 top">
            <div className="h-full flex justify-between">
              <StatBox title="Total Client" value="200" growth={5} />
              <StatBox title="Total Revenue" value="$50,000" growth={10} />
              <StatBox title="New Clients" value="25" growth={2} />
            </div>
            <div className="flex justify-end ">
              <div
                className="bg-slate-600 outline outline-slate-700 outline-1 text-xs text-white px-1 py-1 rounded-lg cursor-default hover:bg-slate-800 hover:text-slate-300 mt-2"
                onClick={handleOpenForm}
              >
                Add New Client
              </div>
            </div>
          </div>
        </div>
        {isFormVisible && <ModalForm onClose={handleCloseForm} />}
        {isDeleteOpen && (<ModalDelete onClose={closeDelete} onDelete={handleDeleteClient} />)}
        {isEditVisible && (<FormEdit clientId={editedData} onClose={closeEditForm} />)}
        {/* bagian table */}
        <div className="bg-slate-50 h-[80%] w-full">
          <div className="container mx-auto ">
            <table className="w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 w-[10%] text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">
                    ID
                  </th>
                  <th className="p-3 w-[15%] text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">
                    Nama
                  </th>
                  <th className="p-3 w-[20%] text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">
                    Nomor Telepon
                  </th>
                  <th className="p-3 w-[22%] text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">
                    Nomor Ktp
                  </th>
                  <th className="p-3 w-[23%] text-sm tracking-wide font-semibold border border-slate-300 border-r-2 ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => (
                    <tr key={index} className="">
                      <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">
                        {item.id}
                      </td>
                      <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">
                        {item.nama}
                      </td>
                      <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">
                        {item.noTelp}
                      </td>
                      <td className="p-3 text-sm tracking-wide font-semibold border border-slate-300 border-r-2 text-center">
                        {item.noKtp}
                      </td>
                      <td className="text-sm border border-slate-300 border-r-2 text-center">
                        <div className="rounded flex justify-center gap-1">
                          <div className="bg-green-500 px-3 text-white rounded-lg cursor-default"
                          onClick={() => openEditForm(item.id)}>
                            Edit
                          </div>
                          <div
                            className="bg-red-500 px-3 text-white rounded-lg cursor-pointer"
                            onClick={() => openDelete(item.id)}
                          >
                            Delete
                          </div>
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
