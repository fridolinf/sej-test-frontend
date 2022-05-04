import { Layout, Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function HeaderLayout() {
  const location = useLocation();
  return (
    <Layout className="layout">
      <Header>
        <Menu
          style={{
            color: "#ffff",
            fontWeight: "bolder",
            justifyContent: "center",
          }}
          theme="dark"
          defaultSelectedKeys={["1"]}
          selectedKeys={location.pathname !== "/" ? "2" : "1"}
          mode="horizontal"
        >
          <Menu.Item key="1">
            <Link to="/" />
            List Book
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="bookmark" />
            Favorites
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
}

export default HeaderLayout;
