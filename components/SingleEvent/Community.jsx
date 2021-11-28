import React from "react";
import styles from "./community.module.css";

function Community({ communityData }) {
  return (
    <div className={styles.card}>
      <div className={styles.commentBox}>
        <input type="text" placeholder="Write your comments.." />
        <div className={styles.info}>
          * Only those who have picked an outcome can post comment
        </div>
        <div className={styles.button}>
          <button type="submit">Post</button>
        </div>
      </div>
      {communityData.map((item) => (
        <div className={styles.communityEvent} key={item.id}>
          <div className={styles.upper}>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.time}>{item.timeElapsed} minutes ago</div>
          </div>
          <div className={styles.lower}>{item.comment}</div>
        </div>
      ))}
    </div>
  );
}

export default Community;
