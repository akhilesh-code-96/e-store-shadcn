import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const userId = window.localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsButtonEnabled(value === "delete"); // Enable the button only when the input is "delete"
  };

  const handleDeleteAccount = async () => {
    if (isButtonEnabled) {
      // Logic to delete the account
      await axios.delete(`${BASE_URL}/api/delete-account?id=${userId}`);
      // console.log("Account deleted.");
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("userId");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center pt-10">
      <p className="mb-2">Type "delete" to confirm account deletion:</p>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="p-2 mb-4 bg-white border rounded text-gray-950"
      />
      <button
        onClick={handleDeleteAccount}
        disabled={!isButtonEnabled}
        className={`px-4 py-2 rounded ${
          isButtonEnabled
            ? "bg-red-600 text-white"
            : "bg-gray-400 text-gray-700"
        }`}
      >
        Delete Account
      </button>
    </div>
  );
};

export default DeleteAccount;
