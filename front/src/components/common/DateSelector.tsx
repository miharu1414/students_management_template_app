import React, { useState, FC } from 'react';
import { Box, Stack } from "@chakra-ui/react"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateSelector.css'; // カスタムスタイルをインポート


type DateSelectorProps = {
  children? : Node;
  selectedDate: Date;
  handleDateChange: (value:Date) => void;
}

const DateSelector:FC<DateSelectorProps> = (props) => {
  const {children, ...rest} = props;


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
        selected={rest.selectedDate}
        onChange={rest.handleDateChange}
        dateFormat="yyyy/MM/dd"
        className="datePicker"
      />
    </Stack>
  );
};

export default DateSelector;
