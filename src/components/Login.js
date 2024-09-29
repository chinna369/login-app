import React from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const onFinish = (values) => {
    dispatch(loginUser(values))
      .unwrap()  // Unwrap the promise for clear error handling
      .then((response) => {
        // Check if the status is "ok" and navigate to the home page
        if (response.status === 'ok') {
          navigate('/home');
        } else {
          console.error('Unexpected response:', response);
        }
      })
      .catch(() => {
        // Error message is already handled via Redux, no navigation happens here
      });
  };

  return (
    <div>
      {error && <Alert message={error} type="error" />}
      <Form form={form} name="login" onFinish={onFinish}>
        <Form.Item
          name="login"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
