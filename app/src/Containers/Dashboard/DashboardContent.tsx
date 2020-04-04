import React, { FC } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import styled from 'styled-components';

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
  width: calc(100% - 24px);
  max-width: 1024px;
  margin: 12px 24px;
  @media (max-width: 768px) {
    width: 100%;
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

interface Props {
  path: string
}

const Dashboard: FC<Props> = ({ path }) => (
  <DashboardContentWrapper>
    <DashboardContent>
      <Switch>
        <Route path={`${path}/home`}>
          <Card><h1>Home</h1></Card>
        </Route>
        <Route path={`${path}/food-diary`}>
          <Card><h1>Food Diary</h1></Card>
        </Route>
        <Route path={`${path}/goals`}>
          <Card><h1>Goals</h1></Card>
        </Route>
        <Route path={`${path}/my-foods`}>
          <Card><h1>My Foods</h1></Card>
        </Route>
        <Route path={`${path}/settings`}>
          <Card><h1>Settings</h1></Card>
        </Route>
      </Switch>
    </DashboardContent>
  </DashboardContentWrapper>
);

export default Dashboard;