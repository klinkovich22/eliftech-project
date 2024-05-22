import React, { useEffect, useState } from 'react';
import ParticipantItem from '../components/ParticipantItem/ParticipantItem';
import styles from './Pages.module.css';
import { getEvent } from '../api/api';

const EventPage = (props) => {

  const [currentEventHistory, setCurrentEventHistory] = useState(null);
  
  useEffect(()=>{
    if(props?.currentEvent){
      getEvent(props.currentEvent)
      .then(result=>{
        setCurrentEventHistory(result.data.data);
      })
      .catch(error=>{
        props.setError(error);
      })
      }
  }, []);

  
  return (
    <>
      <header className={styles["header"]}>
        <div className={styles["header-container"]}>
          <h1 className={styles["page-title"]}>"{currentEventHistory?.title}" participants</h1>

        </div>
      </header>
      <main className={styles["main"]}>
        <div className={styles["elements-wrapper"]}>
        {currentEventHistory?.participants.map(user=><ParticipantItem user={user} key={user._id}/>)}
        </div>
      </main>
    </>
  );
}

export default EventPage;
