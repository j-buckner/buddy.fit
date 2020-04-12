import React from 'react';
import styled from 'styled-components';
import { Statistic as Number, Progress as AntProgress } from 'antd';
import { blue } from '@ant-design/colors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProgressWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const StatisticsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
`;

const Statistic = styled.div`
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  justify-content: center;
  align-items: center;
  width: 100%;
  &:first-of-type {
    align-items: flex-start;
  }
  &:last-of-type {
    align-items: flex-end;
  }
`;

const Progress = styled(AntProgress)`
  margin-bottom: 6px;
`;

const CaloriesGoal = () => {
  const calories = {
    goal: 2500,
    total: 1250
  }
  const { goal, total } = calories;
  return (
    <Wrapper>
      <ProgressWrapper>
        <Title>
          Calories
        </Title>
        <Progress 
          width={50}
          strokeColor={{
            '0%': blue[5],
            '100%': blue[4]
          }}
          percent={(goal - total) / goal * 100}
        />
      </ProgressWrapper>
      <StatisticsWrapper>
        <Statistic>
          <Number
            valueStyle={{fontSize: '16px'}} 
            value={goal} 
          />
          Goal
        </Statistic>
        <Statistic>
          <Number
            valueStyle={{fontSize: '16px'}} 
            value={total} 
          />
          Total
        </Statistic>
        <Statistic>
          <Number
            valueStyle={{fontSize: '16px'}} 
            value={goal-total} 
          />
          Remaining
        </Statistic>
      </StatisticsWrapper>
    </Wrapper>
  );
};

export default CaloriesGoal;