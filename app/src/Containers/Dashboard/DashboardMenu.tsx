import React, { FC } from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledMenu = styled(Menu)`
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 5px 0 rgba(60,66,87, 0.12), 0 1px 1px 0 rgba(0,0,0, 0.12);
`;

interface Props {
  url: string
  current: string
  setCurrent: (arg: string) => void
}

const Dashboard: FC<Props> = ({ url, current, setCurrent }) => {
  // 
  const handleClick = (e: any) => {
    setCurrent(e.key)
  };
  return (
    <StyledMenu 
      onClick={handleClick} 
      selectedKeys={[current]} 
      mode="horizontal"
    >
      <Menu.Item key="food-diary">
        <Link to={`${url}/food-diary`}>Food Diary</Link>
      </Menu.Item>
      <Menu.Item key="goals">
        <Link to={`${url}/goals`}>Goals</Link>
      </Menu.Item>
      <Menu.Item key="settings">
        <Link to={`${url}/settings`}>Settings</Link>
      </Menu.Item>
    </StyledMenu>
  );
}

export default Dashboard;
