import { useEffect, useState } from 'react';
import { List, Space, Tag, Input } from 'antd';
import { EyeOutlined, LikeOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import request from '../../utils/request';
import { mockArticles } from '../../mock/data';
import './style.css';

const { Search } = Input;

/**
 * 文章列表组件
 * 展示所有文章的列表，支持搜索和分类筛选
 */
const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: mockArticles.length,
  });

  /**
   * 获取文章列表数据
   */
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        // 模拟 API 请求
        setTimeout(() => {
          setArticles(mockArticles);
          setPagination(prev => ({
            ...prev,
            total: mockArticles.length
          }));
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('获取文章列表失败:', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  /**
   * 处理搜索
   * @param {string} value - 搜索关键词
   */
  const handleSearch = (value) => {
    setSearchText(value);
    // 实现搜索逻辑
  };

  /**
   * 渲染文章列表项
   * @param {Object} item - 文章数据
   */
  const renderItem = (item) => (
    <List.Item>
      <List.Item.Meta
        title={
          <Link to={`/article/${item.id}`}>
            {item.title}
          </Link>
        }
        description={
          <Space>
            <Tag color="blue">{item.category.name}</Tag>
            <span>
              <EyeOutlined /> {item.views}
            </span>
            <span>
              <LikeOutlined /> {item.likes}
            </span>
            <span>
              {new Date(item.createdTime).toLocaleDateString()}
            </span>
          </Space>
        }
      />
      <div className="article-content-preview">
        {item.content.replace(/#/g, '').slice(0, 200)}...
      </div>
    </List.Item>
  );

  return (
    <div className="article-list-container">
      <div className="article-list-header">
        <Search
          placeholder="搜索文章"
          allowClear
          enterButton
          className="article-search"
          onSearch={handleSearch}
        />
      </div>
      <List
        className="article-list"
        loading={loading}
        itemLayout="vertical"
        size="large"
        pagination={{
          ...pagination,
          onChange: (page) => setPagination({ ...pagination, current: page }),
        }}
        dataSource={articles}
        renderItem={renderItem}
      />
    </div>
  );
};

export default ArticleList; 