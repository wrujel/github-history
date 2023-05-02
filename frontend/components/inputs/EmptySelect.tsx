import styles from "../../styles/Home.module.css";
import Loader from "../Loader";

interface EmptySelectProps {
  id: string;
  label: string;
  disabled?: boolean;
}

const EmptySelect: React.FC<EmptySelectProps> = ({
  id,
  label,
  disabled = false,
}) => {
  return (
    <div className="w-full px-3 mb-6 md:mb-0">
      <label
        className={`
            block 
            uppercase 
            tracking-wide 
            text-gray-700 
            text-xs 
            font-bold 
            mb-2 
            ${styles.label}
          `}
      >
        {label}
      </label>
      <div className={styles.searchContainer}>
        <select
          className={`
              block 
              appearance-none 
              w-full 
              bg-gray-200 
              border 
              border-gray-200 
              text-gray-700 
              py-3 
              px-4 
              pr-8 
              rounded 
              leading-tight 
              focus:outline-none 
              focus:bg-white 
              focus:border-gray-500 
              ${styles.inputQuery}
            `}
          id={id}
          disabled={disabled}
        />

        <Loader size="sm" />
      </div>
    </div>
  );
};

export default EmptySelect;
