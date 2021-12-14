import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./Contentcards.module.css";
import Card from "./Card.jsx";

function ContentCards({
  events,
  card_details,
  dataType,
  cardsToShowOnEachLoadMore,
}) {
  const [visible, setVisible] = useState(cardsToShowOnEachLoadMore);

  const handleLoadMore = () => {
    setVisible((prevValue) => prevValue + cardsToShowOnEachLoadMore);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content_area}>
        {events.slice(0, visible).map((item, id) => (
          <Card
            key={`${item.id}_${id}`}
            card_details={card_details}
            data={item}
            dataType={dataType}
          />
        ))}
      </div>
      {visible < events.length && (
        <button onClick={handleLoadMore} className={styles.btn}>
          Load More <KeyboardArrowDownIcon style={{ fontSize: "23px" }} />
        </button>
      )}
    </div>
  );
}

export default ContentCards;
