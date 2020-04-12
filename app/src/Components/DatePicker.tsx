import React, { FC } from 'react';
import styled from 'styled-components';
import { DatePicker as AntDatePicker, Button } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment';

const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const StyledDatePicker = styled(AntDatePicker)`
  margin: 0 12px;
`;

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const DatePickerLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
`;

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

interface Props {
  selectedDate: Moment
  setSelectedDate: (arg: Moment) => void
}

const DatePicker: FC<Props> = ({ selectedDate, setSelectedDate }) => {
  const handleDatePick = (e: any) => {
    if (e !== null) {
      setSelectedDate(moment(e._d, dateFormatList[0]));
    }
  }
  return (
    <DatePickerContainer>
      <DatePickerLabel>Diary Date</DatePickerLabel>
      <DatePickerWrapper>
        <Button 
          type="primary" 
          size="large"
          icon={<LeftOutlined />}
          onClick={() => setSelectedDate(moment(selectedDate, dateFormatList[0]).subtract(1, 'days'))}
        />
        <StyledDatePicker 
          size="large"
          format={dateFormatList} 
          onChange={handleDatePick}
          value={selectedDate}
        />
        <Button 
          type="primary" 
          size="large"
          icon={<RightOutlined />}
          onClick={() => setSelectedDate(moment(selectedDate, dateFormatList[0]).add(1, 'days'))}
        />
      </DatePickerWrapper>
    </DatePickerContainer>
  )
};

export default DatePicker;