// 博主信息
export const ADMIN_INFO = {
  id: 1,
  username: '张三',
  avatar: 'https://joeschmoe.io/api/v1/admin',
  role: 'admin',
  motto: '专注于前端开发与技术分享',
  articleCount: 15,
  categoryCount: 5,
  viewCount: 3280,
  skills: [
    'React', 'Vue', 'TypeScript', 
    'Node.js', 'Spring Boot', 
    'Docker', 'MySQL'
  ],
  github: 'https://github.com/yourusername',
  email: 'your.email@example.com',
  wechat: 'your_wechat_id',
  about: `
    Hi，我是张三，一名全栈开发工程师。
    
    主要技术栈：
    - 前端：React、Vue、TypeScript
    - 后端：Node.js、Spring Boot
    - 数据库：MySQL、MongoDB
    - 运维：Docker、Nginx
    
    平时喜欢写技术博客，分享学习心得。
    欢迎交流学习！
  `
};

// 模拟访客数据
export const mockUsers = [
  {
    id: 2,
    username: 'spring_lover',
    avatar: 'https://joeschmoe.io/api/v1/random',
    role: 'visitor'
  },
  {
    id: 3,
    username: 'docker_master',
    avatar: 'https://joeschmoe.io/api/v1/random',
    role: 'visitor'
  }
];

// 模拟分类数据
export const mockCategories = [
  { id: 1, name: 'React', description: '前端框架' },
  { id: 2, name: 'Spring Boot', description: '后端框架' },
  { id: 3, name: 'DevOps', description: '运维部署' },
  { id: 4, name: 'Database', description: '数据库' },
  { id: 5, name: 'Algorithm', description: '算法' }
];

// 模拟文章数据
export const mockArticles = [
  {
    id: 1,
    title: '深入理解 React Hooks',
    content: '# React Hooks 简介\n\nReact Hooks 是 React 16.8 引入的新特性，它可以让你在不编写 class 组件的情况下使用 state 以及其他的 React 特性。\n\n## 为什么使用 Hooks?\n\n1. 更简洁的代码\n2. 更好的复用逻辑\n3. 更清晰的数据流向',
    category: { id: 1, name: 'React' },
    views: 1234,
    likes: 88,
    createdTime: '2024-01-15T08:00:00.000Z',
    author: { id: 1, username: 'admin', avatar: 'https://joeschmoe.io/api/v1/random' }
  },
  // ... 其他文章数据保持不变
];

// 模拟评论数据
export const mockComments = [
  {
    id: 1,
    content: '文章写得很好，对我帮助很大！',
    userId: 2,
    articleId: 1,
    parentId: null,
    createdTime: '2024-01-15T10:30:00.000Z',
    user: { id: 2, username: 'spring_lover', avatar: 'https://joeschmoe.io/api/v1/random' },
    children: [
      {
        id: 3,
        content: '感谢支持，后续会写更多相关内容',
        userId: 1,
        articleId: 1,
        parentId: 1,
        createdTime: '2024-01-15T11:00:00.000Z',
        user: { id: 1, username: 'admin', avatar: 'https://joeschmoe.io/api/v1/random' }
      }
    ]
  },
  // ... 其他评论数据保持不变
]; 