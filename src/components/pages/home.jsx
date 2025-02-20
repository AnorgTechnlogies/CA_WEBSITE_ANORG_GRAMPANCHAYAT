import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css"

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="relative flex items-center justify-center h-screen w-screen  overflow-hidden home">
      {/* Background Image with Blur */}
      {/* <div className="absolute inset-0 bg-cover bg-center bg-no-repeat home">
      </div> */}
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 drop-shadow-lg">Welcome to Our Chartered Accountancy Firm</h1>
        <p className="mt-4 text-lg md:text-xl text-blue-700 drop-shadow-md">Providing expert financial and tax consultancy.</p>
        
        {/* CTA Button */}
        <button 
          className="mt-6 px-6 py-3 bg-orange-500 hover:bg-green-500 text-white text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          onClick={handleLogin}
        >
          Grampanchayat Login Here
        </button>
      </div>
    </div>
  );
};

export default Home;
