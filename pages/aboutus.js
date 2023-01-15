import React from "react";
import style from "../styles/AboutUs.module.css";
import MetaScreen from "../components/MetaScreen/MetaScreen";



// COMPONENTS IMPORT

const AboutUs = () => {
  return (
    <>
      <MetaScreen
        pageTitle="MegSkill -- About us"
        description="Best one platform for news, Jobs, educations, notifications in India "
        previewImage="/megskill.png"
        siteName="www.megskill.com"
        currentURL="/aboutus"
        twitterHandle="MegSkill"
      />

      <div spacing={2} className={style.gridContent} container>
        <div className={style.titleContainer}>
          <p className={style.title}>About Us</p>
          <p className={style.title}>- Our Mission -</p>
          <h1 className={style.title}>
            MegSkill is created by Cos Rumut to provide the people with latest
            news and information related to education, jobs, schemes, tourisms,
            event and many other usefull information which benefits the people
          </h1>
          <hr />
          <p className={style.aboutContent}>
            At megskill.com we area group entrepreneur base at Jowai who work hard
            every day to improve and provide updated informations to the people
            related to news, event , schemes, tourisms, jobs. We also except
            partnership with our brand . We are quick to work with you whether
            it be personal or to promote your brand or to advertise according to
            your needs.
          </p>
          <p className={style.aboutContent}>
            We work mainly on providing Jobs related information and Tourisms
            and apart from this we provide latest news relating to education,
            jobs , skill , ideas , business . We provide information about
            various schemes, events . We also let you to put any second hand
            things in our site for reselling
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
