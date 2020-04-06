import React, { useState, useEffect } from 'react';
import { useRouteMatch, useLocation, useHistory } from "react-router-dom";
import styled from 'styled-components';
import DashboardContent from './DashboardContent';
import DashboardMenu from './DashboardMenu';

const DashboardContainer = styled.div`
  width: 100%;
`;

const Dashboard = () => {
  const [current, setCurrent] = useState('food-diary');
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (location.pathname === '/dashboard') {
      history.push('/dashboard/food-diary');
    }
  }, [location, history]);
  useEffect(() => {
    if (location.pathname === `/dashboard/settings`) {
      setCurrent('settings');
    }
  }, [location, setCurrent]);
  
  return (
    <DashboardContainer>
      <DashboardMenu url={match.url} current={current} setCurrent={setCurrent} />
      <DashboardContent path={match.path} />
    </DashboardContainer>
  );
};

export default Dashboard;
