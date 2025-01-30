import { Layout, Row, Col } from 'antd';
import ArticleList from '../../components/ArticleList';
import BloggerInfo from '../../components/BloggerInfo';
import './style.css';

const { Content } = Layout;

/**
 * 首页组件
 * 展示文章列表和博主信息
 */
const Home = () => {
  return (
    <Content className="home-content">
      <div className="content-wrapper">
        <Row gutter={24}>
          {/* 文章列表区域 */}
          <Col xs={24} md={16}>
            <ArticleList />
          </Col>
          {/* 博主信息区域 */}
          <Col xs={24} md={8}>
            <BloggerInfo />
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default Home; 