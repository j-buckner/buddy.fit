import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import {
  Switch,
  Route,
  useRouteMatch,
  Link,
  useLocation
} from "react-router-dom";
import styled from 'styled-components';
import { blue } from '@ant-design/colors';

const DashboardContainer = styled.div`
  margin-top: 12px;
  width: 100%;
`;

const TopBackground = styled.div`
  width: 100%;
  height: 100px;
  background: linear-gradient(150deg, ${blue[6]} 15%,${blue[5]} 70%,${blue[4]} 94%);
  position: absolute;
  z-index: -2;
  left: 0;
  top: 0;
`;

const StyledMenu = styled(Menu)`
  display: flex;
  justify-content: center;
  box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
  box-shadow: 0 2px 5px 0 rgba(60,66,87, 0.12), 0 1px 1px 0 rgba(0,0,0, 0.12);
`;

const DashboardContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  h1 {
    color: black;
  }
`;

const DashboardContent = styled.div`
  width: 1040px;
  margin: 24px 24px;
  @media (max-width: 768px) {
    margin: 0 0 200px;
  }
`;

const Card = styled.div`
  width: 100%;
  background: #fff;
  padding: 48px 48px 24px;
  border-radius: 4px;
  box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
  @media (max-width: 768px) {
    width: 100%;
    box-shadow: none;
  }
  h1 {
    text-align: center;
  }
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
  const handleClick = (e: any) => {
    setCurrent(e.key)
  };
  return (
    <DashboardContainer>
      <TopBackground />
      <StyledMenu 
        onClick={handleClick} 
        selectedKeys={[current]} 
        mode="horizontal"
      >
        <Menu.Item key="home">
          <Link to={`${match.url}/home`}>Home</Link>
        </Menu.Item>
        <Menu.Item key="food-diary">
          <Link to={`${match.url}/food-diary`}>Food Diary</Link>
        </Menu.Item>
        <Menu.Item key="goals">
          <Link to={`${match.url}/goals`}>Goals</Link>
        </Menu.Item>
        <Menu.Item key="my-foods">
          <Link to={`${match.url}/my-foods`}>My Foods</Link>
        </Menu.Item>
        <Menu.Item key="settings">
          <Link to={`${match.url}/settings`}>Settings</Link>
        </Menu.Item>
      </StyledMenu>
      <DashboardContentWrapper>
        <DashboardContent>
          <Switch>
            <Route path={`${match.path}/home`}>
              <Card><h1>Home</h1></Card>
            </Route>
            <Route path={`${match.path}/food-diary`}>
              <Card><h1>Food Diary</h1></Card>
            </Route>
            <Route path={`${match.path}/goals`}>
              <Card><h1>Goals</h1></Card>
            </Route>
            <Route path={`${match.path}/my-foods`}>
              <Card><h1>My Foods</h1></Card>
            </Route>
            <Route path={`${match.path}/settings`}>
              <Card><h1>Settings</h1></Card>
            </Route>
          </Switch>
        </DashboardContent>
      </DashboardContentWrapper>
    </DashboardContainer>
  );
};

export default Dashboard;
