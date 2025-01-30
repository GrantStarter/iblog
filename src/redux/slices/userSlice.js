import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request';

/**
 * 用户登录异步 action creator
 * @param {Object} credentials - 登录凭证，包含用户名和密码
 * @returns {Promise} 包含用户数据的 Promise
 */
export const login = createAsyncThunk(
  'user/login',
  async (credentials) => {
    const response = await request.post('/auth/login', credentials);
    return response.data;
  }
);

/**
 * 获取用户信息异步 action creator
 * @returns {Promise} 包含用户信息的 Promise
 */
export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async () => {
    const response = await request.get('/auth/info');
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer; 