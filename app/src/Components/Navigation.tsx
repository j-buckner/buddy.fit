import React, { useEffect, useState } from 'react';
import {
  Link,
  useLocation
} from "react-router-dom";
import { Avatar, Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import { blue } from '@ant-design/colors';

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 12px 0;
`;

const BrandLogo = styled.div`
  font-size: 24px;
  margin-right: auto;
`;

const BrandLink = styled(Link)`
  color: #fff;
  &:hover {
    color: unset;
  }
`;

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(60,66,87, 0.12), 0 1px 1px 0 rgba(0,0,0, 0.12);
`;

const StyledLink = styled(Link)`
  font-size: 17px;
  color: #fff;
  &:hover {
    color: #fff;
    opacity: .7;
  }
`;

const NavMenu = styled.div`
  background: none;
  border: none;
  width: 100%;
  max-width: 1040px;
  display: flex;
  justify-content: flex-end;
  margin: 0 12px;
`;

const userDropdown = (
  <Menu>
    <Menu.Item key="0">
      <Link to="/dashboard/settings">User Settings</Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link to="/">Sign out</Link>
    </Menu.Item>
  </Menu>
);

const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

const Navigation = () => {
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  let location  = useLocation();
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);
  return (
    <>
      {currentPage !== '/login' && currentPage !== '/signup' ? 
        <NavContainer style={{background: currentPage && currentPage.split('/')[1] === 'dashboard' ? `linear-gradient(150deg, ${blue[6]} 15%,${blue[5]} 70%,${blue[4]} 94%)` : 'transparent' }}>
          <NavMenu>
            {currentPage && currentPage.split('/')[1] === 'dashboard' ? 
            <>
              <BrandLogo>
                <BrandLink to="/">Buddy.fit</BrandLink>
              </BrandLogo>
              <Dropdown overlay={userDropdown} trigger={['click']}>
                <StyledAvatar className="ant-dropdown-link" style={{ backgroundColor: ColorList[0], verticalAlign: 'middle' }} size="large">
                  {UserList[0]}
                </StyledAvatar>
              </Dropdown>
            </>
            : 
              <StyledLink to="/login">
                Sign In
              </StyledLink>
            }
          </NavMenu>
        </NavContainer>
      :
        <></>
      }
    </>
  );
}

export default Navigation;