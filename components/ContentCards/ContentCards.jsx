import React from "react";
import styles from "./Contentcards.module.css";
import Card from "./Card.jsx";

function ContentCards({ events, card_details, dataType }) {
  return (
    <div className={styles.content_area}>
      {events.map((item, id) => (
        <Card
          key={`${item.id}_${id}`}
          card_details={card_details}
          data={item}
          dataType={dataType}
        />
      ))}
    </div>
  );
}

export default ContentCards;
