import React from 'react';
import styles from './aboutUs.module.scss';

const About = () => {
  return (
    <>
      <section className={styles.about}>
        <p className={styles.about__text}>
          We aim to create a
          <br />
          <span className={styles.pinkText}>Decentralized Ticketing</span>{' '}
          solution using
          <br />
          <span className={styles.blueText}>Blockchain Technology.</span>
        </p>
      </section>
    </>
  );
};

export default About;
