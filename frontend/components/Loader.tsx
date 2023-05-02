import styles from "../styles/Home.module.css";

interface LoaderProps {
  size?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = "l" }) => {
  return (
    <div className={styles[`section-center-loading-${size}`]}>
      <div className={styles[`sk-chase-${size}`]}>
        <div className={styles["sk-chase-dot"]}></div>
        <div className={styles["sk-chase-dot"]}></div>
        <div className={styles["sk-chase-dot"]}></div>
        <div className={styles["sk-chase-dot"]}></div>
        <div className={styles["sk-chase-dot"]}></div>
        <div className={styles["sk-chase-dot"]}></div>
      </div>
    </div>
  );
};

export default Loader;
