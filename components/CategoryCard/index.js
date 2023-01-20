import styles from "./style.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";





const CategoryCard = ({data, header}) => {
  const router = useRouter();
  return (
    <>
      <h2 className={styles.header}>{header}</h2>
      <div className={styles.container}>
        {data && data.map((d) => (
          <Link className={styles.link} href={d.link}>
            <div className={styles.mainDiv}>
              <div className={styles.imageDiv}>
                <Image
                  src={d.image}
                  alt="pyrtajam"
                  layout="fill"
                  className={styles.image}
                />
              </div>
              <h1 className={styles.title}>{d.title}</h1>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CategoryCard;
