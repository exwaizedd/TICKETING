import React from 'react';
import styles from './successModal.module.scss';

const SuccessModal = (props) => {
  if (props.isLoading) {
    return (
      <article
        className={`${styles.article} ${styles.loading}`}
        onClick={(e) => e.target.stopPropagation()}
      >
        <p className={styles.article__loadingText}>Processing Ticket...</p>
      </article>
    );
  }
  if (props.error) {
    return (
      <article
        className={`${styles.article} ${styles.error}`}
        onClick={(e) => e.target.stopPropagation()}
      >
        <p className={styles.article__loadingText}>
          Opp!! Something went wrong
        </p>
      </article>
    );
  }

  return (
    <article
      className={`${styles.article} ${styles.success}`}
      onClick={(e) => e.target.stopPropagation()}
    >
      <div className={styles.success_checkmark}>
        <div className={styles.check_icon}>
          <span className={`${styles.icon_line} ${styles.line_tip}`}></span>
          <span className={`${styles.icon_line} ${styles.line_long}`}></span>
          <div className={styles.icon_circle}></div>
          <div className={styles.icon_fix}></div>
        </div>
      </div>
      <h3>Ticket confirmed for use. </h3>
    </article>
  );
};

export default SuccessModal;
