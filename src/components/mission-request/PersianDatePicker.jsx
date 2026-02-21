import React, { useRef, useState, useEffect } from 'react';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { Box, TextField, InputAdornment } from '@mui/material';
import { FiCalendar, FiClock } from 'react-icons/fi';

const CustomInput = ({ value, onClick, placeholder, icon: Icon, error, onBlur }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) onClick(e);
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }} onClick={handleClick}>
      <TextField
        fullWidth
        size="small"
        value={value || ''}
        placeholder={placeholder}
        onBlur={onBlur}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <Icon size={16} className="text-gray-400" />
            </InputAdornment>
          ),
          sx: {
            fontFamily: 'Rubik, sans-serif',
            backgroundColor: '#f9fafb',
            borderRadius: '12px',
            textAlign: 'right',
            cursor: 'pointer',
            '& input': {
              textAlign: 'right',
              paddingRight: '12px',
              fontFamily: 'Rubik, sans-serif',
              cursor: 'pointer',
            },
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
            ...(error && {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ef4444',
              }
            })
          }
        }}
      />
    </Box>
  );
};

export const PersianDatePicker = ({ value, onChange, label, placeholder = 'انتخاب تاریخ', error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleChange = (date) => {
    if (date) {
      const jsDate = date.toDate();
      onChange(jsDate);
    }
    setIsOpen(false);
  };

  const handleOpenPicker = () => {
    setIsOpen(true);
    if (datePickerRef.current) {
      datePickerRef.current.openCalendar();
    }
  };

  const handleClosePicker = () => {
    setIsOpen(false);
    if (datePickerRef.current) {
      datePickerRef.current.closeCalendar();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        handleClosePicker();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Box ref={wrapperRef} sx={{ width: '100%', position: 'relative' }}>
      <DatePicker
        ref={datePickerRef}
        value={value}
        onChange={handleChange}
        calendar={persian}
        locale={persian_fa}
        format="YYYY/MM/DD"
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        render={<CustomInput 
          icon={FiCalendar} 
          placeholder={placeholder} 
          error={error} 
          onClick={handleOpenPicker}
          onBlur={handleClosePicker}
        />}
        containerStyle={{ 
          width: '100%',
          position: 'relative'
        }}
        calendarPosition="bottom"
        shadow={true}
        zIndex={9999}
        offsetY={5}
      />
    </Box>
  );
};

export const PersianTimePicker = ({ value, onChange, label, placeholder = 'انتخاب ساعت', error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timePickerRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleChange = (time) => {
    if (time) {
      const jsDate = time.toDate();
      onChange(jsDate);
    }
    setIsOpen(false);
  };

  const handleOpenPicker = () => {
    setIsOpen(true);
    if (timePickerRef.current) {
      timePickerRef.current.openCalendar();
    }
  };

  const handleClosePicker = () => {
    setIsOpen(false);
    if (timePickerRef.current) {
      timePickerRef.current.closeCalendar();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        handleClosePicker();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Box ref={wrapperRef} sx={{ width: '100%', position: 'relative' }}>
      <DatePicker
        ref={timePickerRef}
        value={value}
        onChange={handleChange}
        format="HH:mm"
        plugins={[
          <TimePicker 
            position="bottom" 
            key="timepicker"
            hideSeconds
          />
        ]}
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        render={<CustomInput 
          icon={FiClock} 
          placeholder={placeholder} 
          error={error} 
          onClick={handleOpenPicker}
          onBlur={handleClosePicker}
        />}
        containerStyle={{ 
          width: '100%',
          position: 'relative'
        }}
        calendarPosition="bottom"
        shadow={true}
        zIndex={9999}
        offsetY={5}
        onlyTimePicker
      />
    </Box>
  );
};