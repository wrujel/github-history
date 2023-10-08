import styles from "../styles/Loader.module.css";

interface LoaderProps {
  size?: string;
  type?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = "l", type }) => {
  return (
    <div
      className={
        styles[`section-center-loading-${size}${type ? "-" + type : ""}`]
      }
    >
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
