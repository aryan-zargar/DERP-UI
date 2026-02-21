import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiEye, FiDownload, FiFilter, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { PersianDatePicker, PersianTimePicker } from './PersianDatePicker';

const MissionTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const itemsPerPage = 5;

  const getMissionTypeStyle = (type) => {
    switch(type) {
      case 'خارج از کشور':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'ماموریت روزانه':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'ساعتی':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const toggleRowSelection = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map(item => item.id));
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden w-full" style={{ fontFamily: 'Rubik, sans-serif' }}>
      {/* Table Header with Actions */}
      <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-gray-800">لیست درخواست‌های ماموریت</h3>
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs border border-blue-200">
            {data.length} مورد
          </span>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 hover:text-gray-800 transition-all duration-200">
            <FiFilter size={18} />
          </button>
          <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 hover:text-gray-800 transition-all duration-200">
            <FiDownload size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-l from-gray-50 to-gray-100">
              <th className="p-4 text-right">
                <input
                  type="checkbox"
                  checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                  onChange={toggleAllRows}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500/20"
                />
              </th>
              <th className="p-4 text-right text-sm font-medium text-gray-600">ردیف</th>
              <th className="p-4 text-right text-sm font-medium text-gray-600">متقاضی</th>
              <th className="p-4 text-right text-sm font-medium text-gray-600">تاریخ درخواست</th>
              <th className="p-4 text-right text-sm font-medium text-gray-600">تاریخ شروع</th>
              <th className="p-4 text-right text-sm font-medium text-gray-600">تاریخ پایان</th>
              <th className="p-4 text-right text-sm font-medium text-gray-600">ساعت شروع</th>
              <th className="p-4 text-right text-sm font-medium text-gray-600">ساعت پایان</th>
              <th className="p-4 text-right text-sm font-medium text-gray-600">نوع ماموریت</th>
              <th className="p-4 text-right text-sm font-medium text-gray-600">هدف</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((request, index) => (
              <tr 
                key={request.id} 
                className={`border-t border-gray-100 hover:bg-blue-50/50 transition-colors duration-200 ${
                  selectedRows.includes(request.id) ? 'bg-blue-50' : ''
                }`}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(request.id)}
                    onChange={() => toggleRowSelection(request.id)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500/20"
                  />
                </td>
                <td className="p-4 text-gray-700">{indexOfFirstItem + index + 1}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                      {request.applicant.charAt(0)}
                    </div>
                    <span className="text-gray-700">{request.applicant}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{request.requestDate}</td>
                <td className="p-4 text-gray-600">{request.startDate}</td>
                <td className="p-4 text-gray-600">{request.endDate}</td>
                <td className="p-4 text-gray-600">{request.startTime}</td>
                <td className="p-4 text-gray-600">{request.endTime}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs border ${getMissionTypeStyle(request.missionType)}`}>
                    {request.missionType}
                  </span>
                </td>
                <td className="p-4 text-gray-600">{request.missionGoal}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-100 flex flex-wrap gap-4 justify-between items-center">
        <div className="text-sm text-gray-500">
          نمایش {indexOfFirstItem + 1} تا {Math.min(indexOfLastItem, data.length)} از {data.length} مورد
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-all duration-200 ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
            }`}
          >
            <FiChevronRight size={18} />
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-lg text-sm transition-all duration-200 ${
                currentPage === i + 1
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
              }`}
            >
              {i + 1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg transition-all duration-200 ${
              currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
            }`}
          >
            <FiChevronLeft size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionTable;