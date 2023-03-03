import React from 'react';
import styles from './error.module.scss';
import HomeNav from '../../components/HomePage/homeNav';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <>
      <HomeNav />
      <section className={styles.error}>
        <p className={styles.error__errorText}>
          <span>404 Error</span> <br />
          The page your are looking for does not exist.
        </p>
        <p className={styles.error__goBackText}>
          click to
          <span>
            <Link to='/'>Go Back Home</Link>
          </span>
        </p>
      </section>
    </>
  );
};

export default Error;
