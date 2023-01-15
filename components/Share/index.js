import styles from "./style.module.css";
import { FaWhatsappSquare } from "react-icons/fa";
import { BsFacebook, BsTelegram } from "react-icons/bs";

import {
  WhatsappShareButton,
  FacebookShareButton,
  TelegramShareButton,
} from "next-share";

const Share = ({ title, url, slug }) => {
  return (
    <div>
      <hr />
      <div className={styles.container}>
        {/* share */}
        <div className={styles.shareDiv}>
          <span className={styles.share}>
            <WhatsappShareButton
              url={url}
              title={title}
              separator=":: "
            >
              <FaWhatsappSquare className={styles.waicon}  />
            </WhatsappShareButton>
          </span>
          <span className={styles.share}>
            <FacebookShareButton
              url={url}
              quote={title}
            >
              <BsFacebook className={styles.fbicon} size={32} round />
            </FacebookShareButton>
          </span>
          <span className={styles.share}>
            <TelegramShareButton
              url={url}
              title={title}
            >
              <BsTelegram className={styles.teicon} size={32} round />
            </TelegramShareButton>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Share;
