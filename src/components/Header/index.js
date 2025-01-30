import { Layout, Button, Menu } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';
import { ADMIN_INFO } from '../../mock/data';
import logo from './logo.svg';
import './style.css';

const { Header: AntHeader } = Layout;

/**
 * 页面顶部导航栏组件
 * 显示网站 logo、导航菜单和用户操作按钮
 */
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = isAuthenticated();
  const isAdmin = isAuth && localStorage.getItem('userId') === String(ADMIN_INFO.id);

  /**
   * 处理用户登出
   * 清除本地存储的认证信息并跳转到首页
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const menuItems = [
    { key: 'home', label: '首页' }
  ];

  return (
    <AntHeader className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
          <h1>我的博客</h1>
        </Link>

        <div className="header-right">
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname === '/' ? 'home' : '']}
            items={menuItems}
            onClick={({ key }) => key === 'home' && navigate('/')}
            className="header-menu"
          />
          
          {isAdmin && (
            <Button type="primary" onClick={() => navigate('/article/edit')}>
              写文章
            </Button>
          )}
          {isAuth && (
            <Button type="link" onClick={handleLogout}>
              退出
            </Button>
          )}
        </div>
      </div>
    </AntHeader>
  );
};

export default Header; 