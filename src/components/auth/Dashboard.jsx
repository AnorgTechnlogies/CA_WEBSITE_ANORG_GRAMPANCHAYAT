import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGrampanchayatDashboardData } from '../store/slices/gpDashboardData';
import { logoutGrampanchayat } from '../store/slices/grampanchayatSlice'; // Import the logout action
import { Download, FileText, Calendar, DollarSign, Eye, CreditCard, Check, LogOut } from 'lucide-react';

const GrampanchayatDashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, dashboardData } = useSelector(
    (state) => state.grampanchayatDashboard
  );
  const [activeTab, setActiveTab] = useState('summary');

  useEffect(() => {
    dispatch(fetchGrampanchayatDashboardData());
  }, [dispatch]);

  // Handler for logout
  const handleLogout = () => {
    dispatch(logoutGrampanchayat());
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  const renderDataTable = (records, type) => {
    if (!records || records.length === 0) {
      return (
        <div className="text-center py-10 text-gray-500">
          No {type} records found
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party Name</th>
              {type === 'it' && <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAN</th>}
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Mode</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gramadhikari</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {records.map((record, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-4 px-4 text-sm text-gray-700">{formatDate(record.date)}</td>
                <td className="py-4 px-4 text-sm text-gray-700">{formatCurrency(record.amount)}</td>
                <td className="py-4 px-4 text-sm text-gray-700">{record.partyName}</td>
                {type === 'it' && <td className="py-4 px-4 text-sm text-gray-700">{record.pan || 'N/A'}</td>}
                <td className="py-4 px-4 text-sm text-gray-700 capitalize">
                  {record.paymentMode === 'online' ? (
                    <div className="flex items-center">
                      <CreditCard size={16} className="mr-1 text-blue-500" />
                      <span>Online</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Check size={16} className="mr-1 text-green-500" />
                      <span>Cheque {record.checkNo ? `(${record.checkNo})` : ''}</span>
                    </div>
                  )}
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">{record.gramadhikariName}</td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  <div className="flex gap-2">
                   
                    {record.uploadDocumentbyAdmin?.url && (
                      <a 
                        href={record.uploadDocumentbyAdmin.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 tooltip"
                        title="Admin Document"
                      >
                        <FileText size={16} />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const StatCard = ({ title, value, icon, bgColor, textColor }) => (
    <div className={`rounded-lg shadow-md p-6 ${bgColor}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className={`text-2xl font-bold mt-2 ${textColor}`}>{value}</h3>
        </div>
        <div className="p-3 rounded-full bg-white bg-opacity-30">
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Sticky Logout Button */}
      <button 
        onClick={handleLogout}
        className="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full shadow-lg flex items-center z-50 transition-all duration-300 hover:scale-105"
      >
        <LogOut size={18} className="mr-2" />
        Logout
      </button>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">Grampanchayat Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard 
          title="Total GST" 
          value={formatCurrency(dashboardData?.gst?.totalAmount || 0)}
          icon={<DollarSign className="text-blue-800" size={24} />}
          bgColor="bg-blue-100"
          textColor="text-blue-800"
        />
        <StatCard 
          title="Total Insurance" 
          value={formatCurrency(dashboardData?.insurance?.totalAmount || 0)}
          icon={<DollarSign className="text-green-800" size={24} />}
          bgColor="bg-green-100"
          textColor="text-green-800"
        />
        <StatCard 
          title="Total IT" 
          value={formatCurrency(dashboardData?.it?.totalAmount || 0)}
          icon={<DollarSign className="text-purple-800" size={24} />}
          bgColor="bg-purple-100"
          textColor="text-purple-800"
        />
        <StatCard 
          title="Total Kamgar" 
          value={formatCurrency(dashboardData?.kamgar?.totalAmount || 0)}
          icon={<DollarSign className="text-yellow-800" size={24} />}
          bgColor="bg-yellow-100"
          textColor="text-yellow-800"
        />
        <StatCard 
          title="Total Royalty" 
          value={formatCurrency(dashboardData?.royalty?.totalAmount || 0)}
          icon={<DollarSign className="text-red-800" size={24} />}
          bgColor="bg-red-100"
          textColor="text-red-800"
        />
      </div>
      
      {/* Summary Overview Card */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard Overview</h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              Total Records: {dashboardData?.summary?.totalRecords || 0}
            </span>
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="text-2xl font-bold text-gray-800">
            Grand Total: {formatCurrency(dashboardData?.summary?.grandTotal || 0)}
          </div>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex flex-wrap space-x-4">
          {['summary', 'gst', 'insurance', 'it', 'kamgar', 'royalty'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-3 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab !== 'summary' && dashboardData[tab] && (
                <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-100">
                  {dashboardData[tab].count || 0}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'summary' && dashboardData && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Records Summary</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {['gst', 'insurance', 'it', 'kamgar', 'royalty'].map((type) => (
                <div key={type} className="bg-gray-50 rounded-lg shadow p-4">
                  <div className="border-b border-gray-200 pb-2">
                    <h3 className="text-lg font-medium capitalize text-gray-800">{type}</h3>
                  </div>
                  <div className="pt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Records:</span>
                      <span className="font-medium">{dashboardData[type]?.count || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Amount:</span>
                      <span className="font-medium">{formatCurrency(dashboardData[type]?.totalAmount || 0)}</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button 
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      onClick={() => setActiveTab(type)}
                    >
                      <Eye size={16} className="mr-1" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'gst' && dashboardData?.gst && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">GST Records</h2>
          </div>
          <div className="p-6">
            {renderDataTable(dashboardData.gst.records, 'gst')}
          </div>
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="text-right w-full font-medium">
              Total: {formatCurrency(dashboardData.gst.totalAmount || 0)}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'insurance' && dashboardData?.insurance && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Insurance Records</h2>
          </div>
          <div className="p-6">
            {renderDataTable(dashboardData.insurance.records, 'insurance')}
          </div>
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="text-right w-full font-medium">
              Total: {formatCurrency(dashboardData.insurance.totalAmount || 0)}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'it' && dashboardData?.it && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Income Tax Records</h2>
          </div>
          <div className="p-6">
            {renderDataTable(dashboardData.it.records, 'it')}
          </div>
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="text-right w-full font-medium">
              Total: {formatCurrency(dashboardData.it.totalAmount || 0)}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'kamgar' && dashboardData?.kamgar && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Kamgar Records</h2>
          </div>
          <div className="p-6">
            {renderDataTable(dashboardData.kamgar.records, 'kamgar')}
          </div>
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="text-right w-full font-medium">
              Total: {formatCurrency(dashboardData.kamgar.totalAmount || 0)}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'royalty' && dashboardData?.royalty && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Royalty Records</h2>
          </div>
          <div className="p-6">
            {renderDataTable(dashboardData.royalty.records, 'royalty')}
          </div>
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="text-right w-full font-medium">
              Total: {formatCurrency(dashboardData.royalty.totalAmount || 0)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrampanchayatDashboard;