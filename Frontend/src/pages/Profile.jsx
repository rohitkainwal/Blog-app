import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import EditProfileModel from "../components/EditProfileModel";
import EditPasswordModel from "../components/EditPasswordModel";
import { FaUserEdit, FaKey } from "react-icons/fa";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [showEditModel, setShowEditModel] = useState(false);
  const [showPasswordModel, setShowPasswordModel] = useState(false);

  if (!user) return null;

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white text-center">
          <img
            src="https://i.pravatar.cc/120"
            alt="Profile"
            className="w-28 h-28 rounded-full mx-auto border-4 border-white shadow-lg mb-4"
          />
          <h2 className="text-2xl font-extrabold">{user.username}</h2>
          <p className="text-sm opacity-90">{user.email}</p>
        </div>

        {/* Details */}
        <div className="p-8 md:p-10">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Profile Information
          </h3>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500 font-medium">User ID</span>
              <span className="text-gray-800">{user.id}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500 font-medium">Name</span>
              <span className="text-gray-800">{user.username}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500 font-medium">Email</span>
              <span className="text-gray-800">{user.email}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500 font-medium">Phone</span>
              <span className="text-gray-800">{user.contactNumber || "—"}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => setShowEditModel(true)}
              className="flex items-center cursor-pointer gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-md hover:opacity-90 transition"
            >
              <FaUserEdit />
              Edit Profile
            </button>

            <button
              onClick={() => setShowPasswordModel(true)}
              className="flex items-center cursor-pointer gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-semibold shadow-md hover:opacity-90 transition"
            >
              <FaKey />
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEditModel && (
        <EditProfileModel onClose={() => setShowEditModel(false)} />
      )}
      {showPasswordModel && (
        <EditPasswordModel onClose={() => setShowPasswordModel(false)} />
      )}
    </div>
    </>
  );
};

export default Profile;
