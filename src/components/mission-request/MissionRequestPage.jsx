import React, { useState } from 'react';
import Toolbar from './Toolbar';
import MissionForm from './MissionForm';
import MissionTable from './MissionTable';
import ApplicantModal from './ApplicantModal';
import { useSidebar } from '../../contexts/SidebarContext';

const MissionRequestPage = () => {
  const { collapsed } = useSidebar();
  const [viewMode, setViewMode] = useState('form');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [formData, setFormData] = useState({
    applicant: null,
    requestDate: new Date().toLocaleDateString('fa-IR'),
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    missionType: '',
    missionGoal: ''
  });

  // داده‌های نمونه برای جدول
  const missionRequestsData = [
    { 
      id: 1,
      applicant: 'علی احمدی',
      requestDate: '۱۴۰۲/۱۱/۲۵',
      startDate: '۱۴۰۲/۱۲/۰۱',
      endDate: '۱۴۰۲/۱۲/۰۵',
      startTime: '۰۸:۰۰',
      endTime: '۱۷:۰۰',
      missionType: 'ماموریت روزانه',
      missionGoal: 'نصب و راه اندازی'
    },
    {
      id: 2,
      applicant: 'زهرا کریمی',
      requestDate: '۱۴۰۲/۱۱/۲۶',
      startDate: '۱۴۰۲/۱۲/۰۲',
      endDate: '۱۴۰۲/۱۲/۰۴',
      startTime: '۰۹:۰۰',
      endTime: '۱۶:۰۰',
      missionType: 'ساعتی',
      missionGoal: 'تحلیل'
    },
    {
      id: 3,
      applicant: 'محمدرضا محمدی',
      requestDate: '۱۴۰۲/۱۱/۲۷',
      startDate: '۱۴۰۲/۱۲/۱۰',
      endDate: '۱۴۰۲/۱۲/۲۰',
      startTime: '۱۰:۰۰',
      endTime: '۱۸:۰۰',
      missionType: 'خارج از کشور',
      missionGoal: 'جمع آوری دیتا'
    },
    {
      id: 4,
      applicant: 'فاطمه حسینی',
      requestDate: '۱۴۰۲/۱۱/۲۸',
      startDate: '۱۴۰۲/۱۲/۰۵',
      endDate: '۱۴۰۲/۱۲/۰۶',
      startTime: '۰۸:۳۰',
      endTime: '۱۵:۳۰',
      missionType: 'ساعتی',
      missionGoal: 'طراحی'
    },
    {
      id: 5,
      applicant: 'امیر رضایی',
      requestDate: '۱۴۰۲/۱۱/۲۹',
      startDate: '۱۴۰۲/۱۲/۱۵',
      endDate: '۱۴۰۲/۱۲/۱۸',
      startTime: '۰۹:۰۰',
      endTime: '۱۸:۰۰',
      missionType: 'ماموریت روزانه',
      missionGoal: 'دموی سیستم ها'
    },
    {
      id: 6,
      applicant: 'مریم جعفری',
      requestDate: '۱۴۰۲/۱۱/۳۰',
      startDate: '۱۴۰۲/۱۲/۰۷',
      endDate: '۱۴۰۲/۱۲/۰۸',
      startTime: '۰۸:۰۰',
      endTime: '۱۶:۰۰',
      missionType: 'ساعتی',
      missionGoal: 'نصب اولیه'
    },
    {
      id: 7,
      applicant: 'سعید موسوی',
      requestDate: '۱۴۰۲/۱۲/۰۱',
      startDate: '۱۴۰۲/۱۲/۱۲',
      endDate: '۱۴۰۲/۱۲/۱۴',
      startTime: '۰۸:۰۰',
      endTime: '۱۷:۰۰',
      missionType: 'ماموریت روزانه',
      missionGoal: 'سایر'
    },
    {
      id: 8,
      applicant: 'نرگس اکبری',
      requestDate: '۱۴۰۲/۱۲/۰۲',
      startDate: '۱۴۰۲/۱۲/۲۰',
      endDate: '۱۴۰۲/۱۲/۲۵',
      startTime: '۱۰:۰۰',
      endTime: '۱۹:۰۰',
      missionType: 'خارج از کشور',
      missionGoal: 'جمع آوری دیتا'
    },
    {
      id: 9,
      applicant: 'حمید رضوانی',
      requestDate: '۱۴۰۲/۱۲/۰۳',
      startDate: '۱۴۰۲/۱۲/۰۹',
      endDate: '۱۴۰۲/۱۲/۱۰',
      startTime: '۰۸:۰۰',
      endTime: '۱۷:۰۰',
      missionType: 'ساعتی',
      missionGoal: 'تحلیل'
    },
    {
      id: 10,
      applicant: 'الهام قاسمی',
      requestDate: '۱۴۰۲/۱۲/۰۴',
      startDate: '۱۴۰۲/۱۲/۲۲',
      endDate: '۱۴۰۲/۱۲/۲۴',
      startTime: '۱۰:۰۰',
      endTime: '۱۸:۰۰',
      missionType: 'ماموریت روزانه',
      missionGoal: 'نصب و راه اندازی'
    }
  ];

  const toggleViewMode = () => {
    setViewMode(viewMode === 'form' ? 'table' : 'form');
  };

  const selectApplicant = (applicant) => {
    setSelectedApplicant(applicant);
    setFormData({ ...formData, applicant: `${applicant.firstName} ${applicant.lastName}` });
    setIsModalOpen(false);
  };

  const handleToolbarAction = (action) => {
    console.log(`Toolbar action: ${action}`);
    switch(action) {
      case 'close':
        window.history.back();
        break;
      case 'undo':
        setFormData({
          applicant: selectedApplicant ? `${selectedApplicant.firstName} ${selectedApplicant.lastName}` : null,
          requestDate: new Date().toLocaleDateString('fa-IR'),
          startDate: '',
          endDate: '',
          startTime: '',
          endTime: '',
          missionType: '',
          missionGoal: ''
        });
        break;
      case 'new':
        setFormData({
          applicant: null,
          requestDate: new Date().toLocaleDateString('fa-IR'),
          startDate: '',
          endDate: '',
          startTime: '',
          endTime: '',
          missionType: '',
          missionGoal: ''
        });
        setSelectedApplicant(null);
        setViewMode('form');
        break;
      case 'save':
        alert('درخواست با موفقیت ذخیره شد');
        break;
      case 'update':
        alert('اطلاعات با موفقیت بروزرسانی شد');
        break;
      case 'search':
        alert('جستجو...');
        break;
      case 'toggleView':
        toggleViewMode();
        break;
      case 'export':
        alert('خروجی اکسل با موفقیت دریافت شد');
        break;
      default:
        break;
    }
  };

  return (
    <div 
      className="space-y-6 transition-all duration-500 ease-in-out p-4 md:p-8" 
      dir="rtl"
      style={{
        maxWidth: '100%',
        overflowX: 'hidden'
      }}
    >
      <Toolbar onAction={handleToolbarAction} />
      
      <div className="transition-all duration-500 w-full ease-in-out transform-gpu">
        {viewMode === 'form' ? (
          <MissionForm 
            formData={formData}
            setFormData={setFormData}
            selectedApplicant={selectedApplicant}
            onOpenModal={() => setIsModalOpen(true)}
          />
        ) : (
          <MissionTable data={missionRequestsData} />
        )}
      </div>

      <ApplicantModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={selectApplicant}
      />

      {/* استایل داینامیک برای انیمیشن بهتر */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .space-y-6 > * {
          animation: fadeInUp 0.5s ease-out forwards;
        }

        .space-y-6 > *:nth-child(1) { animation-delay: 0.1s; }
        .space-y-6 > *:nth-child(2) { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
};

export default MissionRequestPage;