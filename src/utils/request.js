import axios from 'axios';

/**
 * 创建 axios 实例
 * 配置基础 URL 和超时时间
 */
const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  timeout: 5000
});

/**
 * 请求拦截器
 * 为每个请求添加认证 token
 */
request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 * 统一处理响应数据和错误
 */
request.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error);
  }
);

export default request; 