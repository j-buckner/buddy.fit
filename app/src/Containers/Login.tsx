import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';
import WorkingOutSrc from '../assets/working-out.svg';
import useFetch from 'use-http';

const LoginContainer = styled.div`
  width: 1040px;
  margin: 48px 24px;
  @media (max-width: 768px) {
    margin: 0 0 200px;
  }
`;

const LoginContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.h1`
  margin: 48px 0 36px;
  color: ${blue[5]};
  font-weight: bolder;
  @media (max-width: 768px) {
    margin: 18px 0;
  }
`;

const LoginCard = styled.div`
  width: 400px;
  background: #fff;
  padding: 48px 48px 24px;
  border-radius: 4px;
  box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
  @media (max-width: 768px) {
    width: 100%;
    box-shadow: none;
  }
`;

const StyledForm = styled(Form)`
  .login-form {
  max-width: 300px;
  }
  .login-form-forgot {
    float: right;
  }
  .login-form-button {
    width: 100%;
  }
`;

const FormTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const CardFooter = styled.div`
  margin: 36px 0;
  display: flex;
`;

const FooterText = styled.div`
  color: black;
  margin: 0 6px;
`;

const StyledLink = styled(Link)`
  margin: 0 6px;
`;

const BottomBackground = styled.div`
  width: 100%;
  height: 47px;
  background: linear-gradient(150deg, ${blue[6]} 15%,${blue[5]} 70%,${blue[4]} 94%);
  position: absolute;
  z-index: -2;
  left: 0;
  bottom: 0;
`;

const WorkingOutImg = styled.img`
  position: absolute;
  z-index: -1;
  width: 400px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
`;

const Login = () => {
  const [request, response] = useFetch('http://localhost:8080', { 
    mode: 'no-cors'
  });
  const handleLogin = async ({ email, password }: any) => {
    const login = await request.post('/login', { email, password });
    if (response.ok) {
      console.log(login)
    };
  }
  return (
    <LoginContainer>
      {request.loading && <div style={{color: 'black', textAlign: 'center', fontSize: '48px'}}>Loading...</div>}
      <LoginContent>
        <LoginTitle>
          <Link to="/">Buddy.Fit</Link>
        </LoginTitle>
        <LoginCard>
          <StyledForm
            name="login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            size="large"
          >
            <FormTitle>Sign in to your account</FormTitle>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Email' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/account" className="login-form-forgot">Forgot password</Link>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Sign in
              </Button>
            </Form.Item>
          </StyledForm>
        </LoginCard>
        <CardFooter>
          <FooterText>
            Don't have an account?
          </FooterText>
          <StyledLink to="/signup">Sign up</StyledLink>
        </CardFooter>
      </LoginContent>
      <WorkingOutImg src={WorkingOutSrc} />
      <BottomBackground />
    </LoginContainer>
  );
}

export default Login;
