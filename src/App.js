import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Layout from './components/Layout';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ArticleDetail from './pages/ArticleDetail';
import ArticleEdit from './pages/ArticleEdit';
import AuthRoute from './components/AuthRoute';

/**
 * 应用程序根组件
 * 配置路由和全局状态管理
 */
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Header />
          <Routes>
            {/* 公开路由 */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            
            {/* 需要登录的路由 */}
            <Route 
              path="/article/edit" 
              element={
                <AuthRoute>
                  <ArticleEdit />
                </AuthRoute>
              } 
            />
            <Route 
              path="/article/edit/:id" 
              element={
                <AuthRoute>
                  <ArticleEdit />
                </AuthRoute>
              } 
            />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
