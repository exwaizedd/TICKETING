import React from 'react';
import styles from './useTicket.module.scss';

const UseTicket = (props) => {
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
        <p className={styles.errorText}>Opp!! Something Went Wrong</p>
        <p>
          If you did not decline to proceed with this step, then there might be
          several reasons for this error . <br />
          Please make sure the Ticket id is valid. If it is click the View
          Ticket Info button to ;
        </p>
        <ul>
          <li>
            Check if you are authorized to proceed with this step by the owner
            of this ticket.
          </li>
          <li>
            Check If this operation has previously been carried out on this
            ticket.
          </li>
          <li>Check if the ticket validity date has passed.</li>
        </ul>
        <p className={styles.error__tryAgain}>
          If all the above checks were passed, check your network connection or
          try again later.
        </p>
      </article>
    );
  }

  if (props.withdraw) {
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
        <h3>Widthdrawal Successful </h3>
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
      <h3>Ticket Used </h3>
    </article>
  );
};

export default UseTicket;
