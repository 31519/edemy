import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import style from "../styles/error.module.css";
import Link from "next/link";
import MetaScreen from "../components/MetaScreen/MetaScreen";

function ErrorPage() {
  const router = useRouter();
  return (
    <>
      <MetaScreen
        pageTitle="Pyrtajam -- Page Not Found"
        description="Page Not Found"
        previewImage="/Pyrtajam.png"
        siteName="www.pyrtajam.com"
        currentURL="404"
        twitterHandle="Pyrtajam"
      />
      <div>
        <div className={style.mainContainer}>
          <div className={style.container}>
            <Image
              layout="fill"
              alt="404"
              className={style.image}
              src="/404.jpg"
            />
          </div>
          <div className={style.buttonDiv}>
            <Link href="/">
              <button className={style.button}>Back</button>
            </Link>
          </div>
        </div>
        {/* from instagram */}
        {/* <div className={style.central-body}>
                <Image className={style.image-404} src="http://salehriaz.com/404Page/img/404.svg" width="300px"/>
                <a href="#" className={style.btn-go-home} target="_blank">GO BACK HOME</a>
            </div>
            <div className={style.objects}>
                <Image className={style.object_rocket} src="http://salehriaz.com/404Page/img/rocket.svg" width="40px"/>
                <div className={style.earth-moon}>
                    <Image className={style.object_earth} src="http://salehriaz.com/404Page/Image/earth.svg" width="100px"/>
                    <Image className={style.object_moon} src="http://salehriaz.com/404Page/img/moon.svg" width="80px"/>
                </div>
                <div className={style.box_astronaut}>
                    <Image className={style.object_astronaut} src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px"/>
                </div>
            </div>
            <div className={style.glowing_stars}>
                <div className={style.star}></div>
                <div className={style.star}></div>
                <div className={style.star}></div>
                <div className={style.star}></div>
                <div className={style.star}></div>


            </div> */}
      </div>
    </>
  );
}

export default ErrorPage;
