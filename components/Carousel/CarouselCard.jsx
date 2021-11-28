import React from "react";
import Image from "next/image";
import styles from "./CarouselCard.module.css";

const Card = ({ imgSrc, title, handleSelectedEvent, id, isSelectedEvent }) => {
  return (
    <div
      className={`${styles.card_container} ${
        isSelectedEvent && styles.card_container_selected
      }`}
      onClick={handleSelectedEvent(id)}
    >
      <Image
        className={styles.multi__image}
        src={imgSrc}
        alt=""
        objectFit="cover"
        layout="fill"
      />
      <div className={styles.text}>
        <label className={styles.hashTag}>#{title}</label>
      </div>
    </div>
  );
};

export default Card;
