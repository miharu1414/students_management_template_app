import React, { useState } from 'react';
import { Box, Stack } from "@chakra-ui/react"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateSelector.css'; // カスタムスタイルをインポート

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  return (
    <Stack width={"165px"} direction={"row"} alignItems={"center"} justifyContent={"center"} height={"100%"}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          height: '100%', // コンテナの高さいっぱいにテキストを中央配置
        }}
      >
        日付
      </Box>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy/MM/dd"
        className="datePicker"
      />
    </Stack>
  );
};

export default DateSelector;
