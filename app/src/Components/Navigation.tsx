import React, { useEffect, useState } from 'react';
import {
  Link,
  useLocation
} from "react-router-dom";
import styled from 'styled-components';

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 12px;
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

const Navigation = () => {
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  let location  = useLocation();
  useEffect(() => {
    console.log();
    setCurrentPage(location.pathname);
  }, [location]);
  return (
    <>
      {currentPage !== '/login' && currentPage !== '/signup' ? 
        <NavContainer>
          <NavMenu>
            <StyledLink to="/login">
              Sign In
            </StyledLink>
          </NavMenu>
        </NavContainer>
      :
        <></>
      }
    </>
  );
}

export default Navigation;