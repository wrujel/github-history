import SearchButton from "../SearchButton";
import styles from "../../styles/Input.module.css";

interface InputProps {
  id: string;
  label: string;
  disabled?: boolean;
  user: string;
  setUser: (user: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  disabled = false,
  user,
  onChange,
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
          ${styles.label}`}
      >
        {label}
      </label>
      <form
        className={styles.searchContainer}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className={`
            appearance-none 
            block 
            w-full 
            bg-gray-200 
            text-gray-700 
            border 
            border-gray-200 
            rounded 
            py-3 
            px-4 
            leading-tight 
            focus:outline-none 
            focus:bg-white 
            focus:border-gray-500 
            ${styles.inputQuery}
          `}
          id={id}
          type="text"
          value={user}
          onChange={onChange}
          disabled={disabled}
        />
        <SearchButton />
      </form>
    </div>
  );
};

export default Input;
