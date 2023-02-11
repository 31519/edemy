import styles from "./AdminNav.module.css";
import { useState, useEffect, useContext } from "react";
import {
  HomeOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  LaptopOutlined,
  SettingOutlined,
  HistoryOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { CloseOutlined, MenuOutlined } from "@ant-design/icons";

import Link from "next/link";

const AdminNav = () => {
  const [current, setCurrent] = useState("");
  const [open, setOpen] = useState(false);

  const clickHandler =() => {
    setOpen(!open)
  }

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    // console.log("pathname", window.location.pathname)
  }, [process.browser && window.location.pathname]);
  return (
    <div className={styles.container} onClick={clickHandler}>
      <div className={open ? styles.navigation1 : styles.navigation2}>
        <div className={styles.toggle}>
          {open ? (
            <CloseOutlined
              className={styles.icon}
              onClick={() => setOpen(!open)}
            />
          ) : (
            <MenuOutlined
              className={styles.icon}
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
        <ul className={styles.ulDiv}>
          <li className={styles.list}>
            <Link className={styles.link} href="/admin">
              <span className={styles.spanIcon}>
                <HomeOutlined className={styles.icon} />
              </span>
              <span className={open ? styles.spanName1 : styles.spanName2}>
                Dashboard
              </span>
            </Link>
          </li>
          <li className={styles.list}>
            <Link className={styles.link} href="/admin">
              <span className={styles.spanIcon}>
                <BookOutlined className={styles.icon} />
              </span>
              <span className={open ? styles.spanName1 : styles.spanName2}>
                Users
              </span>
            </Link>
          </li>

          <li className={styles.list}>
            <Link className={styles.link} href="/instructor/profile/account-setting">
              <span className={styles.spanIcon}>
                <SettingOutlined className={styles.icon} />
              </span>
              <span className={open ? styles.spanName1 : styles.spanName2}>
                Account Setting
              </span>
            </Link>
          </li>
          <li className={styles.list}>
            <Link className={styles.link} href="/admin/category">
              <span className={styles.spanIcon}>
                <HistoryOutlined className={styles.icon} />
              </span>
              <span className={open ? styles.spanName1 : styles.spanName2}>
                Category
              </span>
            </Link>
          </li>
          <hr />
          <li className={styles.list}>
            <Link className={styles.link} href="/instructor/profile/edit-profile">
              <span className={styles.spanIcon}>
                <UserOutlined className={styles.icon} />
              </span>
              <span className={open ? styles.spanName1 : styles.spanName2}>
                Edit Profile
              </span>
            </Link>
          </li>
        </ul>

      </div>
    </div>
  );
};
export default AdminNav;
