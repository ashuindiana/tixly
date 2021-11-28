import styles from "./Card.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

function Card({ card_details, data, event_category_id }) {
  var { asPath } = useRouter();
  asPath = asPath.slice(1);

  return (
    <Link href={`${asPath}/${event_category_id}/${data.id}`}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.image}>
            <Image src={data.imgSrc} alt="" layout="fill" objectFit="cover" />
          </div>
          <div className={styles.title}>{data.title}</div>
        </div>

        <div className={styles.details}>
          {card_details.map((item, id) => (
            <div className={styles.detail_item} key={`${data.id}_${id}`}>
              <div className={styles.upper_row}>{item}</div>
              <div className={styles.lower_row}>
                {id != 0 && "₹ "} {data[item]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default Card;
