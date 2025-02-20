import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginGrampanchayat, clearGrampanchayatErrors } from "../../components/store/slices/grampanchayatSlice";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Login = () => {
  const [credentials, setCredentials] = useState({ gstNo: "", grampanchayatPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.grampanchayatAuth
  );

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearGrampanchayatErrors());
    
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { gstNo, grampanchayatPassword } = credentials;
    await dispatch(loginGrampanchayat(gstNo, grampanchayatPassword));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-white p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Grampanchayat Login</h2>
        <p className="text-gray-600 text-center mb-4">Access challans, data entries, and financial records securely.</p>
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="gstNo" className="block text-blue-700 font-medium pb-4">GST Number</label>
            <input
              type="text"
              id="gstNo"
              name="gstNo"
              value={credentials.gstNo}
              onChange={handleChange}
              required
              placeholder="Enter Gram Panchayat GST Number"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label htmlFor="grampanchayatPassword" className="block text-blue-700 font-medium pb-4">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="grampanchayatPassword"
              name="grampanchayatPassword"
              value={credentials.grampanchayatPassword}
              onChange={handleChange}
              required
              placeholder="Enter Gram Panchayat password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-4 top-10 flex items-center text-gray-500"
            >
              {showPassword ? <EyeIcon className="h-6 w-6" /> : <EyeSlashIcon className="h-6 w-6" />}
            </button>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-green-500 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:hover:bg-orange-500 disabled:hover:scale-100"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;