  import React, {useState } from "react";
  import toast from "react-hot-toast";
  import { api } from "../axios/axiosInstance";

  const EditPasswordModel = ({ onClose }) => {
  const [formData, setFormData]= useState({
    currentPassword:"",
    newPassword:"",
    confirmPassword:""
    
  });


  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleEditPassword = async ()=>{
    const {currentPassword , newPassword, confirmPassword} = formData;

    if(!currentPassword || !newPassword || !confirmPassword){
      toast.error("all feilds are required")
      return;
    }

    if(newPassword !== confirmPassword){
      toast.error("New password and confirm password do not match")
      return;
    }

  try {
    await api.patch("/updatePassword", { password: newPassword } );

    toast.success("password updated successfully")
    onClose();

    } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong")
  }

  }


   return (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="bg-white w-96 p-6 rounded-2xl shadow-2xl animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col items-center mb-5">
        <div className="h-14 w-14 bg-green-100 text-green-600 flex items-center justify-center rounded-full text-2xl">
          <i className="fa-solid fa-lock"></i>
        </div>
        <h2 className="text-xl font-semibold mt-3">Change Password</h2>
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <div>
          <input
            name="currentPassword"
            type="password"
            placeholder="Current Password"
            onChange={handleChange}
            value={formData.currentPassword}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div>
          <input
            name="newPassword"
            type="password"
            placeholder="New Password"
            onChange={handleChange}
            value={formData.newPassword}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formData.confirmPassword}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 space-y-3">
        <button
          onClick={handleEditPassword}
          className="w-full py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
        >
          Change Password
        </button>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
);

  };

  export default EditPasswordModel;
