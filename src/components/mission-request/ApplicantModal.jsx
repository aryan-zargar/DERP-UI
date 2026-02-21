import React, { useState } from 'react';
import { FiX, FiSearch, FiUser } from 'react-icons/fi';

const ApplicantModal = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const applicantsData = [
    { id: 1, firstName: 'علی', lastName: 'احمدی', fatherName: 'محمد', personnelCode: '۱۲۳۴۵' },
    { id: 2, firstName: 'زهرا', lastName: 'کریمی', fatherName: 'حسین', personnelCode: '۱۲۳۴۶' },
    { id: 3, firstName: 'محمدرضا', lastName: 'محمدی', fatherName: 'علی', personnelCode: '۱۲۳۴۷' },
    { id: 4, firstName: 'فاطمه', lastName: 'حسینی', fatherName: 'اکبر', personnelCode: '۱۲۳۴۸' },
    { id: 5, firstName: 'امیر', lastName: 'رضایی', fatherName: 'حسن', personnelCode: '۱۲۳۴۹' },
    { id: 6, firstName: 'مریم', lastName: 'جعفری', fatherName: 'رضا', personnelCode: '۱۲۳۵۰' },
    { id: 7, firstName: 'سعید', lastName: 'موسوی', fatherName: 'مجید', personnelCode: '۱۲۳۵۱' },
    { id: 8, firstName: 'نرگس', lastName: 'اکبری', fatherName: 'حمید', personnelCode: '۱۲۳۵۲' },
    { id: 9, firstName: 'حمید', lastName: 'رضوانی', fatherName: 'محمد', personnelCode: '۱۲۳۵۳' },
    { id: 10, firstName: 'الهام', lastName: 'قاسمی', fatherName: 'عباس', personnelCode: '۱۲۳۵۴' }
  ];

  const filteredApplicants = applicantsData.filter(applicant =>
    `${applicant.firstName} ${applicant.lastName} ${applicant.fatherName} ${applicant.personnelCode}`
      .includes(searchTerm)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm h-screen flex items-center justify-center z-50 animate-fade-in" style={{fontFamily:"Rubik"}}>
      <div className="bg-white rounded-2xl w-3/4 max-w-4xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-l from-blue-600 to-purple-600 px-6 py-4 flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FiUser className="text-white/80" />
            انتخاب متقاضی
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-white/80 hover:text-white"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-gray-100 flex-shrink-0">
          <div className="relative">
            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="جستجوی متقاضی..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
        </div>
        
        {/* Table Container - Scrollable area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-gray-200 bg-white shadow-sm">
                <th className="p-3 text-right text-sm font-medium text-gray-600">نام</th>
                <th className="p-3 text-right text-sm font-medium text-gray-600">نام خانوادگی</th>
                <th className="p-3 text-right text-sm font-medium text-gray-600">نام پدر</th>
                <th className="p-3 text-right text-sm font-medium text-gray-600">کد پرسنلی</th>
                <th className="p-3 text-center text-sm font-medium text-gray-600">انتخاب</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((applicant, index) => (
                <tr 
                  key={applicant.id} 
                  className="border-b border-gray-300  even:bg-gray-200 odd:bg-gray-100 hover:bg-blue-50/50 transition-colors duration-200"
                >
                  <td className="p-3 text-gray-700  ">{applicant.firstName}</td>
                  <td className="p-3 text-gray-700">{applicant.lastName}</td>
                  <td className="p-3 text-gray-700">{applicant.fatherName}</td>
                  <td className="p-3 text-gray-700">{applicant.personnelCode}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => onSelect(applicant)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-1.5 rounded-lg text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/25"
                    >
                      انتخاب
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200"
          >
            بستن
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        /* Better scrollbar styling */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default ApplicantModal;