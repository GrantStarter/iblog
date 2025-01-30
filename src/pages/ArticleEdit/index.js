import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout, Form, Input, Button, Select, message } from 'antd';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import request from '../../utils/request';
import 'bytemd/dist/index.css';
import './style.css';

const { Content } = Layout;
const plugins = [gfm(), highlight()];

/**
 * 文章编辑页组件
 * 用于创建新文章或编辑现有文章
 */
const ArticleEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isDirty, setIsDirty] = useState(false);

  /**
   * 获取分类列表
   */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await request.get('/categories');
        setCategories(response.data);
      } catch (error) {
        message.error('获取分类失败：' + error.message);
      }
    };
    fetchCategories();
  }, []);

  /**
   * 如果是编辑模式，获取文章详情
   */
  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const response = await request.get(`/articles/${id}`);
          const article = response.data;
          form.setFieldsValue({
            title: article.title,
            categoryId: article.categoryId,
          });
          setContent(article.content);
        } catch (error) {
          message.error('获取文章失败：' + error.message);
        }
      };
      fetchArticle();
    }
  }, [id, form]);

  // 添加自动保存草稿功能
  useEffect(() => {
    if (content || form.getFieldValue('title')) {
      setIsDirty(true);
      const draftData = {
        title: form.getFieldValue('title'),
        content,
        categoryId: form.getFieldValue('categoryId'),
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem('article_draft', JSON.stringify(draftData));
    }
  }, [content, form]);

  // 加载草稿
  useEffect(() => {
    if (!id) {  // 只在新建文章时加载草稿
      const draft = localStorage.getItem('article_draft');
      if (draft) {
        const draftData = JSON.parse(draft);
        form.setFieldsValue({
          title: draftData.title,
          categoryId: draftData.categoryId,
        });
        setContent(draftData.content);
        message.info('已加载上次编辑的草稿');
      }
    }
  }, []);

  /**
   * 处理表单提交
   * @param {Object} values - 表单值
   */
  const onFinish = async (values) => {
    if (!content.trim()) {
      message.error('请输入文章内容');
      return;
    }

    setLoading(true);
    try {
      const articleData = {
        ...values,
        content,
      };
      
      if (id) {
        await request.put(`/articles/${id}`, articleData);
        message.success('文章更新成功');
      } else {
        await request.post('/articles', articleData);
        message.success('文章发布成功');
      }
      localStorage.removeItem('article_draft');
      navigate('/');
    } catch (error) {
      message.error((id ? '更新' : '发布') + '失败：' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 添加离开提示
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '您有未保存的更改，确定要离开吗？';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  return (
    <Content className="article-edit-content">
      <div className="edit-container">
        <Form
          form={form}
          name="article"
          onFinish={onFinish}
          layout="vertical"
          className="article-form"
        >
          <Form.Item
            name="title"
            label="文章标题"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="文章分类"
            rules={[{ required: true, message: '请选择文章分类' }]}
          >
            <Select placeholder="请选择文章分类">
              {categories.map(category => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="文章内容" required>
            <Editor
              value={content}
              plugins={plugins}
              onChange={(v) => setContent(v)}
              placeholder="请输入文章内容（支持 Markdown 格式）"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              {id ? '更新文章' : '发布文章'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default ArticleEdit; 