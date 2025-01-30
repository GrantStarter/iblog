import { Card, Avatar, Divider, Tag } from 'antd';
import { GithubOutlined, WechatOutlined, MailOutlined } from '@ant-design/icons';
import { ADMIN_INFO } from '../../mock/data';
import './style.css';

/**
 * 博主信息卡片组件
 * 展示博主的基本信息、统计数据、技术栈和联系方式
 * 
 * @returns {ReactElement} 返回博主信息卡片组件
 */
const BloggerInfo = () => {
  return (
    <Card className="blogger-info">
      {/* 博主基本信息 */}
      <div className="blogger-header">
        <Avatar 
          size={64} 
          src={ADMIN_INFO.avatar}
          alt="博主头像"
        />
        <h2>{ADMIN_INFO.username}</h2>
        <p className="blogger-motto">{ADMIN_INFO.motto}</p>
      </div>

      <Divider />

      {/* 统计信息 */}
      <div className="blogger-stats">
        <div className="stat-item">
          <span className="stat-number">{ADMIN_INFO.articleCount}</span>
          <span className="stat-label">文章</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{ADMIN_INFO.viewCount}</span>
          <span className="stat-label">访问</span>
        </div>
      </div>

      <Divider>技术栈</Divider>
      
      {/* 技术标签 */}
      <div className="blogger-tags">
        {ADMIN_INFO.skills.map(skill => (
          <Tag key={skill}>{skill}</Tag>
        ))}
      </div>

      <Divider>联系方式</Divider>
      
      {/* 联系方式 */}
      <div className="blogger-contact">
        <a href={ADMIN_INFO.github} target="_blank" rel="noopener noreferrer">
          <GithubOutlined /> GitHub
        </a>
        <span><WechatOutlined /> {ADMIN_INFO.wechat}</span>
        <span><MailOutlined /> {ADMIN_INFO.email}</span>
      </div>
    </Card>
  );
};

export default BloggerInfo; 