import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

/**
 * 路由守卫组件
 * 用于保护需要登录才能访问的路由
 * 如果用户未登录，重定向到登录页面
 * 
 * @param {Object} props - 组件属性
 * @param {ReactNode} props.children - 子组件
 * @returns {ReactElement} 如果用户已认证返回子组件，否则重定向到登录页
 */
const AuthRoute = ({ children }) => {
  const location = useLocation();
  const isAuth = isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthRoute; 