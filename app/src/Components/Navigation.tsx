import React, { useEffect, useState } from 'react';
import {
  Link,
  useLocation
} from "react-router-dom";
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

const StyledLink = styled(Link)`
  font-size: 17px;
  color: #fff;
  display: flex;
  align-items: center;
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
              <StyledLink to="/login">
                Log Out
              </StyledLink>
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