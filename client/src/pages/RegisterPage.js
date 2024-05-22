import React, { useEffect, useState } from 'react';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import { registerParticipant } from '../api/api';
import history from '../history';
import styles from './Pages.module.css';

const RegisterPage = (props) => {

  const [formDate, setFormDate] = useState(null);

  useEffect(() => {
    if (formDate) {
      registerParticipant(props.currentEvent, formDate)
        .then((result) => {
          history.replace('/event');
        })
        .catch(error => {
          props.setError(error);
        })
    }
  }, [formDate])


  return (
    <section className={styles["all-page"]}>
      <div className={styles["register-container"]}>
        <h2 className={styles["register-title"]}>Event registration</h2>
        <RegisterForm setFormDate={setFormDate} />
      </div>
    </section>
  );
}

export default RegisterPage;
