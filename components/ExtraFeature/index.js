import React from "react";
import styles from "./styles.module.css";
import {
  Check,
} from "react-feather";

function Index({title}) {
  return (
    <div>
      {/* Start course reqirement box */}
      <div className={styles.requirementDiv}>
        <div className={styles.requirementRow}>
          {/* start feature box */}
          <div className={styles.requirementCol}>
            <div className={styles.requirementTitle}>
              <h4 className={styles.requirementTitleStyle}>{title}</h4>
            </div>
            {/* list */}
            <ul className={styles.requirementList}>
              <li className={styles.requirementListStyle}>
                <Check
                  color="green"
                  size={20}
                  className={styles.requirementIcon}
                />
                Become an advanced, confident, and modern JavaScript developer
                from scratch.
              </li>
              <li className={styles.requirementListStyle}>
                <Check
                  color="green"
                  size={20}
                  className={styles.requirementIcon}
                />
                Become an advanced, confident, and modern JavaScript developer
                from scratch.
              </li>
              <li className={styles.requirementListStyle}>
                <Check
                  color="green"
                  size={20}
                  className={styles.requirementIcon}
                />
                Become an advanced, confident, and modern JavaScript developer
                from scratch.
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* end requirement bos */}
    </div>
  );
}

export default Index;
