import React from 'react';
import { useFormik } from 'formik';
import { deleteNull } from '../../utils/deleteNull';
import styles from './RegisterForm.module.css';

const RegisterForm = (props) => {

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      birthday: '',
      feedback: null
    },
    onSubmit: values => {
      const readyValues = deleteNull(values);
      props.setFormDate(readyValues);
    },
  });

  return (

    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles["form-container"]}>
        <div className={styles.padding}>
        <label htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.fullName}
        />
        </div>
        <div className={styles.padding}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        </div>
        <div className={styles.padding}>
        <label htmlFor="birthday">Date of birth</label>
        <input
          id="birthday"
          name="birthday"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.birthday}
        />
        </div>
        <fieldset className={styles.padding}>
          <legend>Where did you here about this event?</legend>
          <div className={styles["radio-container"]}>
            <div>
              <input type="radio" id="socialMedia" name="feedback" value="socialMedia" onChange={formik.handleChange} />
              <label htmlFor="socialMedia">Social media</label>
            </div>

            <div>
              <input type="radio" id="friends" name="feedback" value="friends" onChange={formik.handleChange} />
              <label htmlFor="friends">Friends</label>
            </div>

            <div>
              <input type="radio" id="ownSearch" name="feedback" value="ownSearch" onChange={formik.handleChange} />
              <label htmlFor="ownSearch">Found myself</label>
            </div>
          </div>
        </fieldset>

        <button className={styles.submit} type="submit">Submit</button>
      </div>
    </form>

  );
}

export default RegisterForm;
