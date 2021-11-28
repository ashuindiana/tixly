import React from "react";
import styles from "./Contentcards.module.css";
import Card from "./Card.jsx";

function ContentCards({ event_category_id, events, card_details }) {
  return (
    <div className={styles.content_area}>
      {events.map((item, id) => (
        <Card
          key={`${item.id}_${id}`}
          card_details={card_details}
          data={item}
          event_category_id={event_category_id}
        />
      ))}
    </div>
  );
}

export default ContentCards;
