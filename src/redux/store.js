import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

/**
 * 创建 Redux store
 * 配置全局状态管理，整合所有 reducers
 */
export const store = configureStore({
  reducer: {
    user: userReducer, // 用户相关状态管理
  },
});

export default store; 