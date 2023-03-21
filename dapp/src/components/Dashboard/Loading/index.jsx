import styles from './loading.module.scss';

const Loading = (props) => {
  return (
    <section className={styles.successModal}>
      <div className={styles.successModal__cardContainer}>
        <p>{props.text}</p>
      </div>
    </section>
  );
};

export default Loading;
