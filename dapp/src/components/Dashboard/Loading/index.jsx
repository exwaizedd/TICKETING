import styles from './loading.module.scss';

const Loading = () => {
  return (
    <section className={styles.successModal}>
      <div className={styles.successModal__cardContainer}>
        <p>Transaction in progress...</p>
      </div>
    </section>
  );
};

export default Loading;
