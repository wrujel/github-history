import Arrow from "../Arrow";
import styles from "../../styles/Input.module.css";
import EmptySelect from "./EmptySelect";

interface SelectProps {
  id: string;
  label: string;
  disabled?: boolean;
  data: string[];
  option: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  disabled = false,
  data,
  option,
  onChange,
}) => {
  return (
    <>
      {!disabled ? (
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
              value={option}
              onChange={onChange}
              disabled={disabled}
            >
              {data?.map((selectOption: string) => {
                return (
                  <option key={selectOption} value={selectOption}>
                    {selectOption}
                  </option>
                );
              })}
            </select>

            <Arrow />
          </div>
        </div>
      ) : (
        <EmptySelect id={id} label={label} disabled={disabled} />
      )}
    </>
  );
};

export default Select;
