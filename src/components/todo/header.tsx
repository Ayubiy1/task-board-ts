import { useDispatch, useSelector } from "react-redux";
import { Button, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  MenuUnfoldOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

export interface PropsHeader {
  collapsed: boolean;
  selectedKeys: number;
  activeBoard: number;
  setCollapsed: (collapsed: boolean) => void;
  setSelectedKeys: (selectedKeys: number) => void;
}

const Headers = ({
  collapsed,
  setCollapsed,
  selectedKeys,
  setSelectedKeys,
  activeBoard,
}: PropsHeader) => {
  const state = useSelector((state: boolean | number) => state);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        {collapsed ? (
          <Button
            type="text"
            icon={collapsed ? <RightOutlined /> : <RightOutlined />}
            onClick={() => {
              setCollapsed(!collapsed);
              setSelectedKeys(1);
            }}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        ) : (
          <Button
            type="text"
            icon={
              collapsed ? (
                <>
                  <RightOutlined />
                </>
              ) : (
                <>
                  <LeftOutlined />
                </>
              )
            }
            onClick={() => {
              setCollapsed(!collapsed);
              setSelectedKeys(2);
            }}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        )}
      </Header>
    </div>
  );
};

export default Headers;
