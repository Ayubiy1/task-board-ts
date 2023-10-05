import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useLocalStorageState } from "ahooks";
import "./App.css";
import { Todo } from "./components/todo/Todo.1";
import Headers from "./components/todo/header";

const { Header, Sider, Content } = Layout;

export interface ItemsInterface {
  key: number;
  icon: React.ReactNode;
  label: string;
}

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useLocalStorageState(
    "selectedKeyss",
    { defaultValue: 1 }
  );

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const itemsData: ItemsInterface[] = [
    {
      key: 1,
      icon: <UserOutlined />,
      label: "nav 1",
    },
    {
      key: 2,
      icon: <VideoCameraOutlined />,
      label: "nav 2",
    },
    {
      key: 3,
      icon: <UploadOutlined />,
      label: "nav 3",
    },
  ];

  return (
    <Layout className="border-solid h-[100vh] bg-[#222222]">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[`${selectedKeys}`]}
          items={itemsData}
        />
      </Sider>
      <Layout>
        <Headers collapsedd={collapsed} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Todo />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
