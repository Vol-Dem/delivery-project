import classes from "./Select.module.scss";
import { ReactComponent as BoxEmptyImg } from "./../../assets/layout/boxempty.svg";
import { useEffect, useRef, useState, useCallback } from "react";
import Input from "./Input";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

const Select = ({ options, onChange, className }) => {
  const [selectIsOpen, setSelectIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const fieldRef = useRef();

  const onSelectChange = (e) => {
    setSelectValue(e.target.value);
    onChange?.(e.target.value);
    setSelectIsOpen(false);
  };

  const onShowSelect = () => {
    setSelectIsOpen((state) => !state);
  };

  const closeSelectHandler = useCallback((e) => {
    if (!e.target.classList.contains(classes["select__input"]))
      setSelectIsOpen(false);
  }, []);

  useEffect(() => {
    if (selectIsOpen) {
      document.removeEventListener("click", closeSelectHandler);
      document.addEventListener("click", closeSelectHandler);
    } else {
      document.removeEventListener("click", closeSelectHandler);
    }

    return () => {
      document.removeEventListener("click", closeSelectHandler);
    };
  }, [selectIsOpen, closeSelectHandler]);

  const selectOptions = options.map((item, i) => {
    return (
      <div key={i}>
        <input
          className={classes["select__radio"]}
          type="radio"
          id={`select-${i}`}
          name="box"
          value={item.title}
        />
        <label className={classes["select__label"]} htmlFor={`select-${i}`}>
          <div className={classes["select__title"]}>
            {item.img && (
              <div className={classes["select__img"]}>{item.img}</div>
            )}
            <span>{item.title}</span>
          </div>
          <div className={classes["select__desc"]}>
            {item.size && (
              <span className={classes["select__size"]}>{item.size}</span>
            )}
            {item.description && <span>{item.description}</span>}
          </div>
        </label>
      </div>
    );
  });

  return (
    <div className={`${classes["select"]} ${className}`} onClick={onShowSelect}>
      <motion.div
        animate={{ rotate: selectIsOpen ? 180 : 0 }}
        className={classes["select__arrow"]}
      >
        <ChevronDownIcon />
      </motion.div>
      <Input
        className={classes["select__input"]}
        type="text"
        placeholder="Select size"
        value={selectValue}
        readOnly
      />
      <BoxEmptyImg
        className={`${classes["select__icon"]} ${classes["select__icon--box"]}`}
      />

      <motion.fieldset
        variants={{
          hidden: { opacity: 0, scale: 0.95, zIndex: -1 },
          visible: { opacity: 1, scale: 1, zIndex: 1 },
          exit: { opacity: 0, scale: 0.95, zIndex: -1 },
        }}
        initial="hidden"
        animate={`${selectIsOpen ? "visible" : "hidden"}`}
        exit="exit"
        ref={fieldRef}
        className={`${classes["select__field"]} `}
        onChange={onSelectChange}
      >
        <div className={classes["select__field-container"]}>
          {selectOptions}
        </div>
      </motion.fieldset>
    </div>
  );
};

export default Select;
