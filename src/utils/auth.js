/**
 * 从 localStorage 获取 token
 * @returns {string|null} 认证 token 或 null
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * 将 token 保存到 localStorage
 * @param {string} token - 认证 token
 */
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 * 从 localStorage 移除 token
 */
export const removeToken = () => {
  localStorage.removeItem('token');
};

/**
 * 检查用户是否已认证
 * @returns {boolean} 如果用户已认证返回 true，否则返回 false
 */
export const isAuthenticated = () => {
  return !!getToken();
}; 