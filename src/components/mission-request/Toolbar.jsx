import React, { useState } from 'react';
import {
  FiX, FiArrowLeft, FiPlus, FiSave, FiRefreshCw,
  FiSearch, FiGrid, FiDownload
} from 'react-icons/fi';

const Toolbar = ({ onAction }) => {
  const [activeButton, setActiveButton] = useState(null);

  const buttons = [
    { action: 'close', icon: FiX, label: 'بستن پنجره', color: 'from-red-500 to-rose-500', bgColor: 'bg-red-50', textColor: 'text-red-600', hoverColor: 'hover:bg-red-100' },
    { action: 'undo', icon: FiArrowLeft, label: 'بازگشت', color: 'from-gray-500 to-gray-600', bgColor: 'bg-gray-50', textColor: 'text-gray-600', hoverColor: 'hover:bg-gray-100' },
    { action: 'new', icon: FiPlus, label: 'جدید', color: 'from-emerald-500 to-teal-500', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600', hoverColor: 'hover:bg-emerald-100' },
    { action: 'save', icon: FiSave, label: 'ذخیره', color: 'from-blue-500 to-indigo-500', bgColor: 'bg-blue-50', textColor: 'text-blue-600', hoverColor: 'hover:bg-blue-100' },
    { action: 'update', icon: FiRefreshCw, label: 'بروزرسانی', color: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-50', textColor: 'text-amber-600', hoverColor: 'hover:bg-amber-100' },
    { action: 'search', icon: FiSearch, label: 'جستجو', color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50', textColor: 'text-purple-600', hoverColor: 'hover:bg-purple-100' },
    { action: 'toggleView', icon: FiGrid, label: 'تغییر حالت نما', color: 'from-indigo-500 to-purple-500', bgColor: 'bg-indigo-50', textColor: 'text-indigo-600', hoverColor: 'hover:bg-indigo-100' },
    { action: 'export', icon: FiDownload, label: 'خروجی به اکسل', color: 'from-cyan-500 to-blue-500', bgColor: 'bg-cyan-50', textColor: 'text-cyan-600', hoverColor: 'hover:bg-cyan-100' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
      <div className="flex flex-wrap gap-4 justify-center">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveButton(button.action);
              onAction(button.action);
              setTimeout(() => setActiveButton(null), 200);
            }}
            className={`group relative flex flex-col items-center justify-center w-20 h-20 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              button.bgColor
            } ${button.hoverColor} shadow-md hover:shadow-lg`}
          >
            <button.icon 
              size={24} 
              className={`mb-1 transition-all duration-300 group-hover:scale-110 ${
                button.textColor
              }`} 
            />
            <span className={`text-[11px] font-medium text-center leading-tight ${button.textColor}`}>
              {button.label}
            </span>
            
            {/* افکت ریز موج در زمان کلیک */}
            {activeButton === button.action && (
              <span className="absolute inset-0 rounded-xl animate-ping bg-white/40" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;