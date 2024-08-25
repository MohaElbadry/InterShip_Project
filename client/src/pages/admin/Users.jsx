import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import MenuDark from "../../components/layout/MenuDark";
import SidebarDark from "../../components/layout/SidebarDark";
import UserTable from "../../components/common/admin/user/UserTable";
import UserAddModal from "../../components/common/admin/user/UserAddModal";
import icon from "../../assets/plus_round_icon.svg";

export default function Users() {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_LINK}/user/`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setUsers(response.data);
      console.log(response.data);
      if (response.data.length === 0) {
        setMessage("No users found.");
      } else {
        setMessage("");
      }
    } catch (error) {
      console.error("Error fetching users:", error.response);
      setMessage("An error occurred while fetching users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [auth.token]);

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
    closeModal();
  };

  

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-700 text-black">
      <MenuDark />
      <SidebarDark />
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={openModal}
            className="bg-[#F7BB00] my-4 font-bold py-2 px-2 ml-4 rounded-full"
          >
            <img src={icon} alt="logo" className="w-4" />
          </button>
          <div className="mr-4">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {users.length > 0 ? (
          <UserTable users={filteredUsers}  />
        ) : (
          message && (
            <div className="flex justify-center items-center h-full">
              <p className="text-xl font-semibold text-gray-600 bg-gray-200 p-4 rounded-md shadow-md">
                {message}
              </p>
            </div>
          )
        )}
        <UserAddModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onAddUser={handleAddUser}
        />
      </div>
    </div>
  );
}
