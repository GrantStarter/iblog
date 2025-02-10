import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import request from '../../utils/request';
import './style.css';

/**
 * 注册页面组件
 * 处理用户注册
 * 
 * @returns {ReactElement} 返回注册页面组件
 */
const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  /**
   * 处理表单提交
   * @param {Object} values - 表单值，包含用户名和密码,以及邮箱
   * @returns {Promise<void>} 返回处理注册的 Promise
   */
  const onFinish = async (values) => {
    try {
      await request.post('http://localhost:8080/api/register', {
        username: values.username,
        password: values.password,
        email: values.email
      });
      message.success('注册成功，请登录');
      navigate('/api/login');
    } catch (error) {
      message.error('注册失败：' + error.message);
    }
  };

  return (
    <div className="register-container">
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        className="register-form"
      >
        <h2>注册账号</h2>
        <p className="register-tip">注册账号后可以参与文章评论</p>
        
        <Form.Item
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 2, message: '用户名至少2个字符' },
            { max: 20, message: '用户名最多20个字符' }
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码至少6个字符' }
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: '请确认密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="请确认密码" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: '请输入邮箱' },
            {min: 1}
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register; 