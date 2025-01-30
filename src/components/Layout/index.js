import { Layout as AntLayout } from 'antd';
import './style.css';

/**
 * 布局组件
 * 为所有页面提供统一的布局结构
 * 
 * @param {Object} props - 组件属性
 * @param {ReactNode} props.children - 子组件
 * @returns {ReactElement} 返回布局组件
 */
const Layout = ({ children }) => {
  return (
    <AntLayout className="main-layout">
      {children}
    </AntLayout>
  );
};

export default Layout; 