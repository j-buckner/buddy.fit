import React, { useState, useEffect } from 'react';
import { useRouteMatch, useLocation } from "react-router-dom";
import styled from 'styled-components';
import DashboardContent from './DashboardContent';
import DashboardMenu from './DashboardMenu';

const DashboardContainer = styled.div`
  width: 100%;
`;

const Dashboard = () => {
  const [current, setCurrent] = useState('home');
  const match = useRouteMatch();
  const location = useLocation();
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
