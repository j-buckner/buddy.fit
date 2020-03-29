import React from 'react';
import styled from 'styled-components';
import { green } from '@ant-design/colors';

const NotFoundContainer = styled.div`
  margin-top: 48px;
`;

const HeadBackground = styled.div`
  width: 100%;
  height: 52px;
  background: linear-gradient(150deg, ${green[6]} 15%,${green[5]} 70%,${green[4]} 94%);
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
`;

const ErrorCode = styled.div`
  color: black;
  text-align: center;
  font-size: 64px;
`;

const ErrorMessage = styled.div`
  color: black;
  text-align: center;
  font-size: 36px;
`;

const NotFound = () => (
  <NotFoundContainer>
    <HeadBackground />
    <ErrorCode>404</ErrorCode>
    <ErrorMessage>Page does not exist.</ErrorMessage>
  </NotFoundContainer>
);

export default NotFound;