import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { 
  Form,
  Input,
  Checkbox,
  Button
} from 'antd';
import { blue } from '@ant-design/colors';
import WorkingOutSrc from '../assets/healthy-habit.svg';

const SignUpContainer = styled.div`
  width: 1040px;
  margin: 48px 24px 0;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const SignUpContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 164px;
`;

const SignUpTitle = styled.h1`
  margin: 48px 0 36px;
  color: ${blue[5]};
  font-weight: bolder;
  @media (max-width: 768px) {
    margin: 18px 0;
  }
`;

const SignUpCard = styled.div`
  width: 400px;
  background: #fff;
  padding: 48px;
  border-radius: 4px;
  box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
  @media (max-width: 768px) {
    width: 100%;
    box-shadow: none;
  }
`;

const StyledForm = styled(Form)`
  .signup-form {
  max-width: 300px;
  }
  .signup-form-forgot {
    float: right;
  }
  .signup-form-button {
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
  width: 300px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
`;

const SignUp = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <SignUpContainer>
      <SignUpContent>
          <SignUpTitle>
            <Link to="/">Buddy.Fit</Link>
          </SignUpTitle>
        <SignUpCard>
          <StyledForm
            form={form}
            name="signup"
            className="signup-form"
            onFinish={onFinish}
            scrollToFirstError
            size="large"
          >
            <FormTitle>Create an account</FormTitle>
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail',
                },
                {
                  required: true,
                  message: 'Please input your E-mail',
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password',
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords that you entered do not match');
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item
              name="nickname"
              rules={[{ required: true, message: 'Please input your nickname', whitespace: true }]}
            >
              <Input placeholder="Nickname" />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
              ]}
            >
              <Checkbox>
                I have read the <a href="/agreement" target="_blank">agreement</a>
              </Checkbox>
            </Form.Item>
            <Button type="primary" htmlType="submit" className="signup-form-button">
              Sign up
            </Button>
          </StyledForm>
        </SignUpCard>
        <CardFooter>
          <FooterText>
            Already have an account?
          </FooterText>
          <StyledLink to="/login">Sign in</StyledLink>
        </CardFooter>
      </SignUpContent>
      <WorkingOutImg src={WorkingOutSrc} />
      <BottomBackground />
    </SignUpContainer>
  );
}

export default SignUp;
