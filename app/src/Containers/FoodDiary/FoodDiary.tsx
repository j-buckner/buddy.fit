import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DatePicker, Button } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import FoodDiaryTable from './FoodDiaryTable';

const Card = styled.div`
  width: 100%;
  background: #fff;
  padding: 24px;
  border-radius: 4px;
  box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
    padding: 24px 12px;
    box-shadow: none;
  }
  h1 {
    text-align: center;
  }
`;

const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  margin: 0 0 12px;
`;

const StyledDatePicker = styled(DatePicker)`
  margin: 0 6px;
`;

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const initialMeals: any = {
  breakfast: [
    {
      key: '1',
      name: 'Members Mark - Olive Oil, 1 T',
      calories: 120,
      carbs: 0,
      fat: 14,
      protein: 0
    },
    {
      key: '2',
      name: 'Oikos Triple Zero 5.3 oz - Vanilla Yogurt, 150 g',
      calories: 120,
      carbs: 14,
      fat: 0,
      protein: 15
    },
    {
      key: '3',
      name: 'Chiquita. - Banana, 94.5 g',
      calories: 83,
      carbs: 23,
      fat: 0,
      protein: 1
    },
  ],
  lunch: [
    {
      key: '1',
      name: 'Members Mark - Olive Oil, 1 T',
      calories: 120,
      carbs: 0,
      fat: 14,
      protein: 0
    },
    {
      key: '2',
      name: 'Oikos Triple Zero 5.3 oz - Vanilla Yogurt, 150 g',
      calories: 120,
      carbs: 14,
      fat: 0,
      protein: 15
    },
    {
      key: '3',
      name: 'Chiquita. - Banana, 94.5 g',
      calories: 83,
      carbs: 23,
      fat: 0,
      protein: 1
    }
  ],
  dinner: [
    {
      key: '1',
      name: 'Members Mark - Olive Oil, 1 T',
      calories: 120,
      carbs: 0,
      fat: 14,
      protein: 0
    },
    {
      key: '2',
      name: 'Oikos Triple Zero 5.3 oz - Vanilla Yogurt, 150 g',
      calories: 120,
      carbs: 14,
      fat: 0,
      protein: 15
    },
    {
      key: '3',
      name: 'Chiquita. - Banana, 94.5 g',
      calories: 83,
      carbs: 23,
      fat: 0,
      protein: 1
    }
  ]
};

const FoodDiary = () => {
  const [selectedDate, setSelectedDate] = useState(moment(new Date(), dateFormatList[0]));
  const [meals, setMeals] = useState(initialMeals);
  useEffect(() => { 
    // make api call for user's list of tracked items for intial date on mount here
    console.log(moment(selectedDate).format(dateFormatList[0]));
  }, [selectedDate]);
  const handleDatePick = (e: any) => {
    if (e !== null) {
      setSelectedDate(moment(e._d, dateFormatList[0]));
    }
  }
  const handleDelete = (meal: string, key: any) => {
    console.log('delete: ', meal, key);
  }
  return (
    <Card>
      <DatePickerWrapper>
        <Button 
          type="primary" 
          size="large"
          icon={<LeftOutlined />}
          onClick={() => setSelectedDate(moment(selectedDate, dateFormatList[0]).subtract(1, 'days'))}
        ></Button>
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
        ></Button>
      </DatePickerWrapper>
      {Object.keys(meals).map((meal) => 
        <FoodDiaryTable 
          key={meal}
          meal={meal.toLowerCase().split('').map((a, i) => i === 0 ? a.toUpperCase(): a).join('')} 
          data={meals[meal]} 
          handleDelete={handleDelete} 
        />
      )}
    </Card>
  )
};

export default FoodDiary;