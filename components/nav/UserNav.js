import styles from "./UserNav.module.css";
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



const UserNav = () => {
  const [current, setCurrent] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    // console.log("pathname", window.location.pathname)
  }, [process.browser && window.location.pathname]);
  return (
    <div className={styles.container}>
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
          <Link className={styles.link} href="/user">
            <span className={styles.spanIcon}>
              <HomeOutlined className={styles.icon} />
            </span>
            <span className={open ? styles.spanName1 : styles.spanName2}>
              Dashboard
            </span>
          </Link>
        </li>
        <li className={styles.list}>
          <Link className={styles.link} href="/user-course">
            <span className={styles.spanIcon}>
              <BookOutlined className={styles.icon} />
            </span>
            <span className={open ? styles.spanName1 : styles.spanName2}>
              My Course
            </span>
          </Link>
        </li>
        <li className={styles.list}>
          <Link className={styles.link} href="/user-cart">
            <span className={styles.spanIcon}>
              <ShoppingCartOutlined className={styles.icon} />
            </span>
            <span className={open ? styles.spanName1 : styles.spanName2}>
              My Cart
            </span>
          </Link>
        </li>
        <li className={styles.list}>
          <Link className={styles.link} href="/user/instructor-signup">
            <span className={styles.spanIcon}>
              <LaptopOutlined className={styles.icon} />
            </span>
            <span className={open ? styles.spanName1 : styles.spanName2}>
              Teach on Megskill
            </span>
          </Link>
        </li>
        <hr />
        <li className={styles.list}>
          <Link className={styles.link} href="/user/profile/account-setting">
            <span className={styles.spanIcon}>
              <SettingOutlined className={styles.icon} />
            </span>
            <span className={open ? styles.spanName1 : styles.spanName2}>
              Account Setting
            </span>
          </Link>
        </li>
        <li className={styles.list}>
          <Link className={styles.link} href="/purchased-history">
            <span className={styles.spanIcon}>
              <HistoryOutlined className={styles.icon} />
            </span>
            <span className={open ? styles.spanName1 : styles.spanName2}>
              Purchased History
            </span>
          </Link>
        </li>
        <hr />
        <li className={styles.list}>
          <Link className={styles.link} href="/user/profile/edit-profile">
            <span className={styles.spanIcon}>
              <UserOutlined className={styles.icon} />
            </span>
            <span className={open ? styles.spanName1 : styles.spanName2}>
              Edit Profile
            </span>
          </Link>
        </li>
      </ul>
      {/* {settings.map((data) => (
        <div key={data.name} className={styles.listDiv}>
            <div>

          <HomeOutlined className={styles.icon} />
            </div>
          <div className={styles.nameDiv}>
            <Link className={styles.link} href={data.link}>
              <h4 className={styles.name}>{data.name}</h4>
            </Link>
          </div>
        </div>
      ))} */}
      {/* <Link href="/user">
        <p className={`nav-link ${current === "/user" && "active"}`}>
          Dashboard
        </p>
      </Link> */}
    </div>
    </div>
  );
};
export default UserNav;
