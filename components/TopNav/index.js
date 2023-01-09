import { useState, useEffect, useContext } from "react";

import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  CoffeeOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Context } from "../../context";
import axios from "axios";
import { typeFromAST } from "graphql";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    // console.log("pathname", window.location.pathname)
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  return (
    <Menu mode="horizontal" selectedKeys={[current]} className="mb-2">
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreAddOutlined />}
      >
        <Link href="/">App</Link>
      </Item>

      {user !== null && user.role && user.role.includes("Instructor") && (
        <Item
          key="/instructor/course/create"
          onClick={(e) => setCurrent(e.key)}
          icon={<CarryOutOutlined />}
        >
          <Link href="/instructor/course/create">Create Course</Link>
        </Item>
      )}
      {user !== null && user.role && !user.role.includes("Instructor") && (
        <Item
          key="/user/become-instructor"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
        >
          <Link href="/user/become-instructor">Become Instructor</Link>
        </Item>
      )}

      {user === null && (
        <>
          <Item
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined />}
          >
            <Link href="/login">Login</Link>
          </Item>
          <Item
            key="/register"
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
          >
            <Link href="/register">Register</Link>
          </Item>
        </>
      )}

      {user !== null && (
        <SubMenu
          icon={<CoffeeOutlined />}
          title={user && user.name}
          className="float-right"
        >
          <ItemGroup>
            <Item key="/user">
              <Link href="/user">Dashboard</Link>
            </Item>
            <Item
              onClick={logout}
              icon={<LogoutOutlined />}
              className="float-right"
            >
              Logout
            </Item>
          </ItemGroup>
        </SubMenu>
      )}
      {user !== null && user.role && user.role.includes("Instructor") && (
        <Item
          key="/instructor"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
          className="float-right"
        >
          <Link href="/instructor"> Instructor</Link>
        </Item>
      )}
    </Menu>
  );
};

export default TopNav;
