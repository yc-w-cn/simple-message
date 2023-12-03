import React from 'react';
import ReactDOM from 'react-dom/client';
import 'modern-normalize/modern-normalize.css';
import './index.css';
import { App, ConfigProvider, theme } from 'antd';
import Dashboard from './components/Dashboard';
import zhCN from 'antd/locale/zh_CN';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            linkHoverBg: '#3277fc',
          },
        },
        token: {
          colorLink: '#FFFFFF',
          colorLinkHover: '#FFFFFF',
        },
        algorithm: theme.darkAlgorithm,
      }}
      locale={zhCN}
    >
      <App>
        <Dashboard />
      </App>
    </ConfigProvider>
  </React.StrictMode>,
);
