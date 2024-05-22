import React from 'react';
import EventItem from '../components/EventItem/EventItem';
import Pagination from '../components/Pagination/Pagination';
import styles from './Pages.module.css';

const Home = (props) => {
  
  return (
    <>
      <header className={styles["header"]}>
        <div className={styles["header-container"]}>
          <h1 className={styles["site-title"]}>EVENTS</h1>

        </div>
      </header>
      <main className={styles["main"]}>
        <div className={styles["elements-wrapper"]}>
        {props?.eventList.map(event=><EventItem event={event} key={event._id} setCurrentEvent={props.setCurrentEvent}/>)}
        </div>
        <Pagination totalPages={props.totalPages} 
                    currentPage={props.currentPage} 
                    setCurrentPage={props.setCurrentPage}/>
      </main>
    </>
  );
}

export default Home;
