import React, { useEffect, useState } from 'react';
import {
  Link,
  useLocation
} from "react-router-dom";
import { Avatar, Menu, Dropdown } from 'antd';
import styled from 'styled-components';

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

const BrandLogo = styled.div`
  font-size: 24px;
  margin-right: auto;
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

  const [user, setUser] = useState(UserList[0]);
  const [color, setColor] = useState(ColorList[0]);
  // const changeUser = () => {
  //   const index = UserList.indexOf(user);
  //   setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
  //   setColor(index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]);
  // };

  return (
    <>
      {currentPage !== '/login' && currentPage !== '/signup' ? 
        <NavContainer>
          <NavMenu>
            {currentPage && currentPage.split('/')[1] === 'dashboard' ? 
            <>
              <BrandLogo>Buddy.fit</BrandLogo>
              <Dropdown overlay={userDropdown} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <Avatar style={{ backgroundColor: color, verticalAlign: 'middle' }} size="large">
                    {user}
                  </Avatar>
                </a>
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