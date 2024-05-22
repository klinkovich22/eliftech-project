import React from 'react';
import { format } from 'date-fns';
import { CONSTANTS } from '../../constants';
import styles from './EventItem.module.css'
import history from '../../history';

const EventItem = (props) => {
  const { _id, title, description, organizer, eventDate, imagePath } = props?.event;
  const IMAGE_PLACEHOLDER = './static-images/event-placeholder.svg';

  
  const viewEvent = () => {
    props.setCurrentEvent(_id);
    history.push('/event');
  }

  const register = () => {
    props.setCurrentEvent(_id);
    history.push('/register');
  }

  return (
    <section className={styles["event-wrapper"]}>
      <div className={styles["event-cotainer"]}>
        <div className={styles["image-container"]}>
          {imagePath ? <img className={styles["event-image"]} src={`http://${CONSTANTS.BASE_URL_IMAGES}/${imagePath}`} />
            : <img className={styles["event-image"]} src={IMAGE_PLACEHOLDER} />}
        </div>
        <div className={styles["event-item"]}>
          <h2 className={styles["event-title"]}>{title}</h2>
          <p className={styles["event-date"]}>{format(eventDate, 'ccc MMM d, p')}</p>
          <p className={styles["event-organizer"]}>{organizer}</p>
          <p className={styles["event-description"]}>{description}</p>
          <div className={styles["button-container"]}>
            <a className={styles["button-link"]} onClick={register}>Register</a>
            <a className={styles["button-link"]} onClick={viewEvent}>View</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventItem;
