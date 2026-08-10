import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "../Loader";
import styles from "../../styles/Dropdown.module.css";

interface DropdownProps {
  id: string;
  label: string;
  disabled?: boolean;
  data: string[];
  option: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  id,
  label,
  disabled = false,
  data,
  option,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  const filtered = query
    ? data.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    : data;

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Never stay open while a fetch disables the field.
  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  // Fresh search on every open.
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <div className="w-full px-3 mb-6 md:mb-0">
      <span className={`block uppercase ${styles.label}`} id={`${id}-label`}>
        {label}
      </span>
      <div className={styles.dropdown} ref={rootRef}>
        <button
          type="button"
          id={id}
          className={styles.trigger}
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${id}-label ${id}`}
          disabled={disabled}
        >
          <span className={styles.triggerValue}>{option}</span>
          {disabled ? (
            <Loader size="sm" type="select" />
          ) : (
            <svg
              className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          )}
        </button>

        <AnimatePresence>
          {open && !disabled && (
            <motion.div
              className={styles.panel}
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
            >
              <div className={styles.searchRow}>
                <input
                  className={styles.search}
                  type="text"
                  placeholder="filter..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <ul
                className={styles.list}
                role="listbox"
                aria-labelledby={`${id}-label`}
              >
                {filtered.length > 0 ? (
                  filtered.map((item, index) => (
                    <motion.li
                      key={item}
                      role="option"
                      aria-selected={item === option}
                      className={`${styles.item} ${
                        item === option ? styles.itemActive : ""
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: 0.04 + Math.min(index * 0.03, 0.35),
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => {
                        onChange(item);
                        setOpen(false);
                      }}
                    >
                      <span className={styles.itemDot} />
                      <span className={styles.itemText}>{item}</span>
                    </motion.li>
                  ))
                ) : (
                  <li className={styles.noMatch}>no matches</li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dropdown;
