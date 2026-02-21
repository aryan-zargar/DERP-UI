import React, { useState } from 'react';
import { FiUser, FiSave, FiMapPin, FiTarget, FiCalendar, FiClock } from 'react-icons/fi';
import { PersianDatePicker, PersianTimePicker } from './PersianDatePicker';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Paper,
  Typography,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';


const GradientHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to left, #2563eb, #7c3aed)',
  padding: theme.spacing(3, 4),
  color: 'white',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    fontFamily: 'Rubik, sans-serif',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    '&:hover': {
      backgroundColor: '#f3f4f6',
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3b82f6',
        borderWidth: '2px',
      }
    },
    '& input': {
      textAlign: 'right',
      fontFamily: 'Rubik, sans-serif',
      paddingRight: '12px',
    }
  },
  '& .MuiInputLabel-root': {
    fontFamily: 'Rubik, sans-serif',
    right: 14,
    left: 'auto',
    transformOrigin: 'right',
    '&.Mui-focused': {
      color: '#3b82f6',
    }
  },
  '& .MuiInputBase-input': {
    textAlign: 'right',
    fontFamily: 'Rubik, sans-serif',
  },
  '& .MuiSelect-select': {
    textAlign: 'right',
    fontFamily: 'Rubik, sans-serif',
  }
}));

const MissionForm = ({ formData, setFormData, selectedApplicant, onOpenModal }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  
  const missionTypes = ['ساعتی', 'خارج از کشور', 'ماموریت روزانه'];
  const missionGoals = ['تحلیل', 'طراحی', 'نصب و راه اندازی', 'جمع آوری دیتا', 'دموی سیستم ها', 'نصب اولیه', 'سایر'];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      handleInputChange('startDate', `${year}/${month}/${day}`);
    } else {
      handleInputChange('startDate', '');
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      handleInputChange('endDate', `${year}/${month}/${day}`);
    } else {
      handleInputChange('endDate', '');
    }
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    if (time) {
      const hours = String(time.getHours()).padStart(2, '0');
      const minutes = String(time.getMinutes()).padStart(2, '0');
      handleInputChange('startTime', `${hours}:${minutes}`);
    } else {
      handleInputChange('startTime', '');
    }
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
    if (time) {
      const hours = String(time.getHours()).padStart(2, '0');
      const minutes = String(time.getMinutes()).padStart(2, '0');
      handleInputChange('endTime', `${hours}:${minutes}`);
    } else {
      handleInputChange('endTime', '');
    }
  };

  // تاریخ امروز به شمسی
  const today = new Date().toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '/');

  return (
    <div className='drop-shadow-2xl shadow-xl rounded-2xl  '  >
      <GradientHeader className='rounded-t-2xl' >
        <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: 'Rubik, sans-serif', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 4, height: 32, bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 1 }} />
          فرم درخواست ماموریت
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, mr: 2, opacity: 0.9, fontFamily: 'Rubik, sans-serif' }}>
          لطفاً اطلاعات مورد نیاز برای درخواست ماموریت را وارد کنید
        </Typography>
      </GradientHeader>
      
      <Box sx={{ p: 4, pt:12 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: 3 }}>
          {/* Applicant Field */}
          <Box>
            <Typography variant="body2" fontWeight="medium" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, fontFamily: 'Rubik, sans-serif' }}>
              <FiUser size={16} color="#2563eb" />
              متقاضی
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <StyledTextField
                fullWidth
                size="small"
                value={selectedApplicant ? `${selectedApplicant.firstName} ${selectedApplicant.lastName}` : ''}
                placeholder="انتخاب متقاضی"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <FiUser size={16} className="text-gray-400" />
                    </InputAdornment>
                  ),
                  sx: {
                    '& input': {
                      textAlign: 'right',
                      paddingRight: '12px',
                    }
                  }
                }}
              />
              <Button
                onClick={onOpenModal}
                variant="contained"
                sx={{
                  fontFamily: 'Rubik, sans-serif',
                  background: 'linear-gradient(to left, #2563eb, #7c3aed)',
                  borderRadius: '12px',
                  minWidth: '100px',
                  '&:hover': {
                    background: 'linear-gradient(to left, #1d4ed8, #6b21e5)',
                  }
                }}
              >
                <FiUser size={16} />
                <span style={{ marginRight: 8 }}>انتخاب</span>
              </Button>
            </Box>
          </Box>

          {/* Request Date */}
          <Box>
            <Typography variant="body2" fontWeight="medium" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, fontFamily: 'Rubik, sans-serif' }}>
              <FiCalendar size={16} color="#2563eb" />
              تاریخ درخواست
            </Typography>
            <StyledTextField
              disabled
              fullWidth
              size="small"
              value={today}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <FiCalendar size={16} className="text-gray-400" />
                  </InputAdornment>
                ),
                sx: {
                  '& input': {
                    textAlign: 'right',
                    paddingRight: '12px',
                  }
                }
              }}
            />
          </Box>

          {/* Start Date - Persian */}
          <Box>
            <Typography variant="body2" fontWeight="medium" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, fontFamily: 'Rubik, sans-serif' }}>
              <FiCalendar size={16} color="#2563eb" />
              تاریخ شروع
            </Typography>
            <PersianDatePicker
              label=""
              value={startDate}
              onChange={handleStartDateChange}
            />
          </Box>
          {/* End Date - Persian */}
          <Box>
            <Typography variant="body2" fontWeight="medium" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, fontFamily: 'Rubik, sans-serif' }}>
              <FiCalendar size={16} color="#2563eb" />
              تاریخ پایان
            </Typography>
            <PersianDatePicker
              label=""
              value={endDate}
              onChange={handleEndDateChange}
            />
          </Box>

          {/* Start Time - 24h */}
          <Box>
            <Typography variant="body2" fontWeight="medium" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, fontFamily: 'Rubik, sans-serif' }}>
              <FiClock size={16} color="#2563eb" />
              ساعت شروع
            </Typography>
            <PersianTimePicker
              label=""
              value={startTime}
              onChange={handleStartTimeChange}
            />
          </Box>

          {/* End Time - 24h */}
          <Box>
            <Typography variant="body2" fontWeight="medium" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, fontFamily: 'Rubik, sans-serif' }}>
              <FiClock size={16} color="#2563eb" />
              ساعت پایان
            </Typography>
            <PersianTimePicker
              label=""
              value={endTime}
              onChange={handleEndTimeChange}
            />
          </Box>

          {/* Mission Type */}
          <Box>
            <Typography variant="body2" fontWeight="medium" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, fontFamily: 'Rubik, sans-serif' }}>
              <FiMapPin size={16} color="#2563eb" />
              نوع ماموریت
            </Typography>
            <StyledTextField
              select
              fullWidth
              size="small"
              value={formData.missionType}
              onChange={(e) => handleInputChange('missionType', e.target.value)}
              SelectProps={{
                sx: {
                  textAlign: 'right',
                  '& .MuiSelect-select': {
                    textAlign: 'right',
                  }
                }
              }}
            >
              <MenuItem value="" sx={{ fontFamily: 'Rubik, sans-serif', justifyContent: 'flex-end' }}>انتخاب کنید</MenuItem>
              {missionTypes.map((type) => (
                <MenuItem key={type} value={type} sx={{ fontFamily: 'Rubik, sans-serif', justifyContent: 'flex-end' }}>{type}</MenuItem>
              ))}
            </StyledTextField>
          </Box>

          {/* Mission Goal */}
          <Box sx={{ gridColumn: { lg: 'span 2' } }}>
            <Typography variant="body2" fontWeight="medium" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, fontFamily: 'Rubik, sans-serif' }}>
              <FiTarget size={16} color="#2563eb" />
              هدف از ماموریت
            </Typography>
            <StyledTextField
              select
              fullWidth
              size="small"
              value={formData.missionGoal}
              onChange={(e) => handleInputChange('missionGoal', e.target.value)}
              SelectProps={{
                sx: {
                  textAlign: 'right',
                  '& .MuiSelect-select': {
                    textAlign: 'right',
                  }
                }
              }}
            >
              <MenuItem value="" sx={{ fontFamily: 'Rubik, sans-serif', justifyContent: 'flex-end' }}>انتخاب کنید</MenuItem>
              {missionGoals.map((goal) => (
                <MenuItem key={goal} value={goal} sx={{ fontFamily: 'Rubik, sans-serif', justifyContent: 'flex-end' }}>{goal}</MenuItem>
              ))}
            </StyledTextField>
          </Box>
        </Box>

        {/* Form Actions */}
        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              fontFamily: 'Rubik, sans-serif',
              borderRadius: '12px',
              px: 3,
              py: 1,
              color: '#374151',
              borderColor: '#d1d5db',
              '&:hover': {

                backgroundColor: '#f9fafb',
              }
            }}
          >
            انصراف
          </Button>
          <Button
            variant="contained"
            onClick={() => alert('درخواست ماموریت با موفقیت ثبت شد')}
            sx={{
              fontFamily: 'Rubik, sans-serif',
              background: 'linear-gradient(to left, #2563eb, #7c3aed)',
              borderRadius: '12px',
              px: 4,
              py: 1,
              '&:hover': {
                background: 'linear-gradient(to left, #1d4ed8, #6b21e5)',
              }
            }}
          >
            <FiSave size={18} style={{ marginLeft: 8 }} />
            ثبت درخواست
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default MissionForm;