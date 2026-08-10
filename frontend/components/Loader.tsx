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
      <div className={styles[`pulse-${size}`]} aria-label="Loading">
        <span className={styles.pulseNode} />
        <span className={styles.pulseLink} />
        <span className={styles.pulseNode} />
        <span className={styles.pulseLink} />
        <span className={styles.pulseNode} />
      </div>
    </div>
  );
};

export default Loader;
