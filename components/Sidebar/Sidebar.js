import React, { useState, useEffect } from "react";
import style from "./Sidebar.module.css";

// import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
// import CloseIcon from "@mui/icons-material/Close";
// import MediaIcon from "../mediaicon/MediaIcon";
// import SearchBox from "../searchbox/SearchBox";
import Image from "next/image";

const sidebarLink = [
  {
    title: "News",
    link: "/news/?category=News",
  },
  {
    title: "Jobs",
    link: "/news/?category=Jobs",
  },
  {
    title: "Sport",
    link: "/news/?category=Sports",
  },
  {
    title: "Politics",
    link: "/news/?category=Politics&keyword=",
  },
  {
    title: "Education",
    link: "/news/?category=Educations&keyword=",
  },
  {
    title: "Notification",
    link: "/news/?category=Notification&keyword=",
  },

  {
    title: "Admit card",
    link: "/news/?category=AdmitCard&keyword=",
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
    title: "Terms and Conditions",
    link: "/termsandconditions",
  },
];

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const [dateState, setDateState] = useState(new Date());

  const openSidebarHandler = () => {
    // const open = document.querySelector(".sidebarContainer");
    // open.style.left = "0px";
    setSidebar(!sidebar);
  };

  const linkClickHandler = () => {
    // const open = document.querySelector(".sidebarContainer");
    // open.style.left = "0px";
    setSidebar(!sidebar);
  };

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  return (
    <header>
      <div className={style.container}>
        <div className={style.dateDiv}>
          <div className={style.imageDiv}>
            <Link href="/" className={style.link}>
              <Image
                src="/Pyrtajam.png"
                alt="pyrtajam"
                layout="fill"
                className={style.image}
              />
            </Link>
          </div>
          {/* <p className={style.dateText}>
              {""}
              {dateState.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p> */}
          {/* <p className={style.dateText}>
              {""}
              {dateState.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: "true",
              })}
            </p> */}
        </div>
        <div className={style.listDiv}>
          <ul className={style.ulDiv}>
            <li className={style.list}>
              <Link href="/">
                <a className={style.link}>Home</a>
              </Link>
            </li>
            <li className={style.list}>
              <Link href="/news/?category=Jobs&keyword=">
                <a className={style.link}>Jobs</a>
              </Link>
            </li>
            <li className={style.list}>
              <Link href="/news/?category=News&keyword=">
                <a className={style.link}>News</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={style.iconDiv}>
          <div className={style.searchDiv}>
            {sidebar === false ? (
              <div>
                {/* <SearchBox /> */}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={style.hamburgerDiv} onClick={openSidebarHandler}>
            <div className={style.hamDiv}>
              <div
                className={sidebar === false ? style.ham1 : style.hamclose1}
              ></div>
              <div
                className={sidebar === false ? style.ham2 : style.hamclose2}
              ></div>
              <div
                className={sidebar === false ? style.ham3 : style.hamclose3}
              ></div>
            </div>
          </div>
          {/*  <MenuIcon /> */}
          {/* Side bar */}

          <div
            className={
              sidebar === true ? style.sidebarContainer : style.sidebarClose
            }
            onClick={linkClickHandler}
          >
            {/* <div className={style.sidebarContainer}> */}
            {/* Only the list in the sidebar view */}
            <div className={style.sidebarDiv}>
              {/* <MediaIcon /> */}
              <ul className={style.sidebarUl}>
                {sidebarLink.map((sidebar) => (
                  <Link
                    key={sidebar.title}
                    href={sidebar.link}
                  >
                    <li className={style.sidebarlist} >
                      <a className={style.sidebarlink}>{sidebar.title}</a>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            {/* End of sidebar list */}
            {/* <div className={style.closeDiv} onClick={openSidebarHandler}>
              <CloseIcon />
            </div> */}
          </div>
        </div>
      </div>
      <div className={style.hight}></div>
    </header>
  );
};

export default Sidebar;
