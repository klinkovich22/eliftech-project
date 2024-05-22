import React from 'react';
import styles from './ParticipantItem.module.css';

const ParticipantItem = (props) => {
  
  const {fullName, email} = props.user;

  return (
    <section className={styles["participant-wrapper"]}>
      <div className={styles["participant-container"]}>
        <img className={styles["participant-image"]} src={'./static-images/user-placeholder.png'}/>
        <div className={styles["participant-info"]}>
        <p className={styles["participant-name"]}>{fullName}</p>
        <p className={styles["participant-email"]}>{email}</p>
        </div>
      </div>
    </section>
  );
}

export default ParticipantItem;
