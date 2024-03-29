import styles from "../styles/SearchButton.module.css";

const SearchButton = () => {
  return (
    <button type="submit" className={styles.searchButton}>
      <svg
        className={`w-6 h-6 ${styles.icon}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </button>
  );
};

export default SearchButton;
