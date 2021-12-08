import styles from "./searchOptions.module.css";
import Image from "next/image";
import Link from "next/link";

export function SearchOptions({ option }) {
  const path = `/singleEvent/${option.id}`;

  return (
    <Link href={path}>
      <div className={styles.eventContainer}>
        <div className={styles.image}>
          <Image src={option.imgSrc} alt="" layout="fill" objectFit="cover" />
        </div>
        <div className={styles.Name}>{option.title}</div>
      </div>
    </Link>
  );
}
