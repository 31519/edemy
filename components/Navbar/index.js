import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

import { UserOutlined, CloseOutlined, MenuOutlined } from "@ant-design/icons";
import Image from "next/image";
import SearchBox from "../Searchbox/SearchBox";
import { Button, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const sidebarLink = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Jobs",
    link: "/",
  },
  {
    title: "Syllabus",
    link: "/education?cat=Syllabus",
  },
  {
    title: "Question",
    link: "/education?cat=Questions",
  },
  {
    title: "About Us",
    link: "/aboutus",
  },
  {
    title: "Privacy Policy",
    link: "/privacy",
  },
  {
    title: "Terms And Conditions",
    link: "/termsandconditions",
  },
  
];

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [keyword, setKeyword] = useState("");
  // console.log("ajlsdj", sidebar);

  // search box

  let queryParams;
  if (typeof window != "undefined") {
    queryParams = new URLSearchParams(document.location.search.substring(1));
  }

  const searchHandler = async (e) => {
    e.preventDefault();

    // if(category){
    //   setCat(category)
    // } else {
    //   setCat("")
    // }
    // if(!page) {
    //   setPages(1)
    // }

    // await router.push(`/news?q=${keyword}&category=${cat}&page=${pages}`)
    await router.push(`/?q=${keyword}`);
    setOpen(!open);
    if (sidebar) {
      setSidebar(false);
    }
    if (open) {
      setOpen(false);
    }
  };

  const showModal = () => {
    setOpen(!open);
    if (sidebar) {
      setSidebar(false);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const openSidebarHandler = () => {
    // const open = document.querySelector(".sidebarContainer");
    // open.style.left = "0px";
    setSidebar(!sidebar);
  };

  const linkClickHandler = () => {
    // const open = document.querySelector(".sidebarContainer");
    // open.style.left = "0px";
    if (open) {
      setOpen(false);
    }
    setSidebar(!sidebar);
  };
  return (
    <div>
      <div className={styles.container}>
        {/* brand name */}
        <div className={styles.brandDiv}>
          <Link href="/" className={styles.link}>
            <div className={styles.imageDiv}>
              <Image
                src="/megskill.png"
                alt="pyrtajam"
                layout="fill"
                className={styles.image}
              />
            </div>
          </Link>
          <div className={styles.categoryDiv}>Category</div>
        </div>

        {/* menu */}
        <div className={styles.menuDiv}>
          <div className={styles.loginDiv}>
            <Link href="/" className={styles.link}>
              <p className={styles.login1}>Login</p>
              <p className={styles.login2}>
                <UserOutlined
                  style={{ fontSize: "25px", width: "20px", height: "20px" }}
                />
              </p>
            </Link>
          </div>
          <div className={styles.signupDiv}>
            <p>Signup</p>
          </div>
        </div>

        {/* search  && menu*/}
        <div className={styles.searchMenu}>
          <div className={styles.searchDiv}>
            <div>
              <SearchOutlined
                style={{ fontSize: "25px" }}
                onClick={showModal}
              />
            </div>
            <Modal
              title="Search"
              open={open}
              footer={null}
              // confirmLoading={confirmLoading}
              onCancel={showModal}
            >
              <SearchBox
                searchHandler={searchHandler}
                setKeyword={setKeyword}
              />
            </Modal>
          </div>

          {/* sidebar */}
          <div className={styles.menuDiv}>
            {sidebar === true ? (
              <CloseOutlined
                style={{ fontSize: "25px" }}
                onClick={linkClickHandler}
              />
            ) : (
              <MenuOutlined
                style={{ fontSize: "25px" }}
                onClick={linkClickHandler}
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.height}></div>

      {sidebar && (
        <div
          onClick={() => setSidebar(!sidebar)}
          className={styles.sidebarContainer}
        >
          {/* <div className={styles.height}></div> */}
          <div className={styles.sidebar}>
            <div className={styles.menu}>
              <div className={styles.name}>
                <div className={styles.imageDiv2}>
                  <Image
                    src="/megskill.png"
                    alt="pyrtajam"
                    layout="fill"
                    className={styles.image}
                  />
                </div>
                <div>
                    <CloseOutlined
                      style={{ fontSize: "30px", color:'white' , marginRight:"15px"}}
                      onClick={linkClickHandler}
                    />
                </div>
              </div>
              <div className={styles.menu}>
                <ul className={styles.sidebarUl}>
                  {sidebarLink.map((sidebar) => (
                    <Link
                      key={sidebar.title}
                      className={styles.link}
                      href={sidebar.link}
                    >
                      <li
                        onClick={() => setSidebar(!sidebar)}
                        className={styles.sidebarlist}
                      >
                        <p className={styles.sidebarlink}>{sidebar.title}</p>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
              <div className={styles.menu}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
