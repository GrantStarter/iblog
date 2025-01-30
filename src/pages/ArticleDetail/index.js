import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { Layout, Typography, Space, Tag, Skeleton, message, Avatar, Button } from 'antd';
import { EyeOutlined, LikeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import request from '../../utils/request';
import { mockArticles, mockComments } from '../../mock/data';
import 'bytemd/dist/index.css';
import './style.css';
import { isAuthenticated } from '../../utils/auth';

const { Content } = Layout;
const { Title } = Typography;
const plugins = [gfm(), highlight()];

/**
 * 文章详情页组件
 * 显示文章内容、评论列表和相关操作
 */
const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const isAuth = isAuthenticated();

  /**
   * 获取文章详情和评论数据
   */
  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        // 模拟 API 请求
        setTimeout(() => {
          const foundArticle = mockArticles.find(a => a.id === parseInt(id));
          if (foundArticle) {
            setArticle(foundArticle);
            const articleComments = mockComments.filter(c => c.articleId === parseInt(id));
            setComments(articleComments);
          } else {
            setError('文章不存在');
          }
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('获取文章详情失败:', error);
        setError('获取文章失败');
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  /**
   * 处理添加评论
   * @param {string} content - 评论内容
   * @returns {Promise<void>} 返回处理评论的 Promise
   */
  const handleAddComment = async (content) => {
    if (!isAuth) {
      message.info('请先登录后再评论');
      navigate('/login', { state: { from: location } });
      return;
    }
    // 处理添加评论的逻辑
  };

  if (error) {
    return (
      <Content className="article-detail-content">
        <div className="article-container">
          <div className="error-message">
            <h2>{error}</h2>
            <Button type="primary" onClick={() => navigate(-1)}>
              <ArrowLeftOutlined /> 返回上一页
            </Button>
          </div>
        </div>
      </Content>
    );
  }

  if (loading) {
    return (
      <Content className="article-detail-content">
        <div className="article-container">
          <Skeleton active paragraph={{ rows: 10 }} />
        </div>
      </Content>
    );
  }

  return (
    <Content className="article-detail-content">
      <div className="article-container">
        <div className="article-header">
          <Button 
            type="link" 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            style={{ marginBottom: 16 }}
          >
            返回列表
          </Button>
          <Title level={2}>{article?.title}</Title>
        </div>
        
        <div className="article-meta">
          <Space size={16}>
            {article?.category && (
              <Tag color="blue">{article.category.name}</Tag>
            )}
            <span>
              <EyeOutlined /> {article?.views}
            </span>
            <span>
              <LikeOutlined /> {article?.likes}
            </span>
            <span>
              {new Date(article?.createdTime).toLocaleDateString()}
            </span>
          </Space>
        </div>

        <div className="article-content">
          <Viewer value={article?.content || ''} plugins={plugins} />
        </div>

        <div className="comments-section">
          <div className="comments-header">
            <Title level={3}>评论 ({comments.length})</Title>
            {!isAuth && (
              <div className="comment-login-tip">
                <Link to="/login" state={{ from: location }}>登录</Link>
                后参与评论，还没有账号？
                <Link to="/register">立即注册</Link>
              </div>
            )}
            {isAuth && (
              <Button 
                type="primary" 
                onClick={() => setShowCommentInput(true)}
              >
                写评论
              </Button>
            )}
          </div>
          
          {comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <Space align="start">
                <Avatar src={comment.user.avatar} />
                <div>
                  <div className="comment-meta">
                    <span className="comment-author">{comment.user.username}</span>
                    <span className="comment-time">
                      {new Date(comment.createdTime).toLocaleString()}
                    </span>
                  </div>
                  <div className="comment-content">{comment.content}</div>
                  {comment.children?.map(reply => (
                    <div key={reply.id} className="comment-reply">
                      <Space align="start">
                        <Avatar src={reply.user.avatar} size="small" />
                        <div>
                          <div className="comment-meta">
                            <span className="comment-author">{reply.user.username}</span>
                            <span className="comment-time">
                              {new Date(reply.createdTime).toLocaleString()}
                            </span>
                          </div>
                          <div className="comment-content">{reply.content}</div>
                        </div>
                      </Space>
                    </div>
                  ))}
                </div>
              </Space>
            </div>
          ))}
        </div>
      </div>
    </Content>
  );
};

export default ArticleDetail; 