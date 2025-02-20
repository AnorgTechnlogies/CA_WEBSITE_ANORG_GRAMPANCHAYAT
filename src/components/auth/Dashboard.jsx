import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Welcome to Your Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="bg-white shadow-xl rounded-lg p-6 text-center">
          <h3 className="text-2xl font-semibold text-blue-700">Recent Activity</h3>
          <p className="text-gray-600 mt-2">You have no recent activities.</p>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg p-6 text-center">
          <h3 className="text-2xl font-semibold text-blue-700">Account Summary</h3>
          <p className="text-gray-600 mt-2">Your account is in good standing.</p>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg p-6 text-center">
          <h3 className="text-2xl font-semibold text-blue-700">Quick Actions</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <button className="w-full bg-orange-500 hover:bg-green-500 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
                Update Profile
              </button>
            </li>
            <li>
              <button className="w-full bg-orange-500 hover:bg-green-500 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
                View Reports
              </button>
            </li>
            <li>
              <button className="w-full bg-orange-500 hover:bg-green-500 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
                Manage Settings
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
