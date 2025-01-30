import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../utils/auth';
import request from '../../utils/request';

/**
 * 登录页面组件
 * 处理用户登录认证
 * 
 * @returns {ReactElement} 返回登录页面组件
 */
const Login = () => {
  const navigate = useNavigate();

  /**
   * 处理表单提交
   * @param {Object} values - 表单值，包含用户名和密码
   * @returns {Promise<void>} 返回处理登录的 Promise
   */
  const onFinish = async (values) => {
    try {
      const response = await request.post('/auth/login', values);
      setToken(response.token);
      message.success('登录成功');
      navigate('/');
    } catch (error) {
      message.error('登录失败：' + error.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <Form
        name="login"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login; 