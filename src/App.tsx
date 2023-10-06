import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Layout, Menu, Modal, theme } from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "./App.css";
import { Todo } from "./components/todo/Todo.1";
import Headers, { PropsHeader } from "./components/todo/header";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { DataTypes, ListsTypes, data } from "./data";
import { setData, setBoardId, setBoard } from "./redux/reducers";

const { Header, Sider, Content } = Layout;
export interface ItemsInterface {
  key: number;
  icon: React.ReactNode;
  label: string;
}

const App = () => {
  const boardId = useAppSelector((state) => state?.boardId);

  const dataa = useAppSelector((state) => state?.dataa);

  const dispatch = useAppDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const [boardAdd, setBoardAdd] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(1);
  const [activeBoard, setActiveBoard] = useState(1);
  // const [activeBoard, setActiveBoard] = useLocalStorageState<number>(
  //   "selectedKeyss",
  //   {
  //     defaultValue: 1,
  //   }
  // );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

  const onFinishs = (values: any) => {
    // console.log(values?.boardName);
    dispatch(setBoard(values.boardName));
    setBoardAdd(false);
    handleCancel();
  };

  return (
    <Layout className="border-solid h-[100vh] bg-[#222222]">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[`1`]}>
          {dataa?.map((i: DataTypes, index: number) => {
            return (
              <Menu.Item
                onClick={() => {
                  setActiveBoard(i?.id);
                  dispatch(setBoardId(index));
                }}
                key={i?.id}
              >
                {i?.boardName}
              </Menu.Item>
            );
          })}

          <Button
            className="text-white flex items-center justify-center w-[80%] mx-auto"
            onClick={() => showModal()}
          >
            <PlusOutlined />
          </Button>

          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
          >
            <Form onFinish={onFinishs}>
              <div className="">
                <Form.Item
                  name={"boardName"}
                  rules={[
                    { required: true, message: "Board nomini kiriting!!!" },
                  ]}
                >
                  <Input
                    className="bg-transparent my-2 mb-3 mx-auto w-[90%]"
                    placeholder="Board name"
                  />
                </Form.Item>
              </div>

              <Button
                className="flex items-center justify-center ml-auto"
                htmlType="submit"
              >
                Add Board
              </Button>
            </Form>
          </Modal>
        </Menu>
      </Sider>
      <Layout>
        <Headers
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          activeBoard={activeBoard}
        />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Todo collapsed={collapsed} activeBoard={activeBoard} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
