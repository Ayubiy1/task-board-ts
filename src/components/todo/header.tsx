import { useDispatch, useSelector } from "react-redux";
import { Button, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import { MenuUnfoldOutlined } from "@ant-design/icons";

export interface PropsHeader {
  collapsedd: boolean;
}

const Headers = ({ collapsedd: collapsed }: PropsHeader) => {
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
            // icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              //   setCollapsed(!collapsed);
              //   setSelectedKeys(1);
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
                  <MenuUnfoldOutlined />
                </>
              ) : (
                <>
                  <MenuUnfoldOutlined onClick={() => console.log(state)} />
                </>
              )
            }
            onClick={() => {
              //   setCollapsed(!collapsed);
              //   setSelectedKeys(2);
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
