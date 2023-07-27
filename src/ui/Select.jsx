import classes from "./Select.module.scss";
import { ReactComponent as BoxEmptyImg } from "./../assets/layout/boxempty.svg";
import { useRef, useState } from "react";
import Input from "./Input";

const Select = ({ options, onChange }) => {
  const [selectIsOpen, setSelectIsOpen] = useState(false);
  const [boxValue, setBoxValue] = useState("");
  const fieldRef = useRef();

  const onBoxSizeChange = (e) => {
    setBoxValue(e.target.value);
    onChange(e.target.value);
    setSelectIsOpen(false);
  };

  const onShowSelect = () => {
    setSelectIsOpen((state) => !state);
  };

  const selectOptions = options.map((item, i) => {
    return (
      <div key={i} className={classes["select__item"]}>
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
    <div className={classes["select"]} onClick={onShowSelect}>
      <span
        className={`${classes["select__arrow"]} ${
          selectIsOpen ? classes["select__arrow--open"] : ""
        }`}
      ></span>
      <Input
        className={classes["select__input"]}
        type="text"
        placeholder="Select size"
        value={boxValue}
        readOnly
      />
      <BoxEmptyImg
        className={`${classes["select__icon"]} ${classes["select__icon--box"]}`}
      />
      <fieldset
        ref={fieldRef}
        className={`${classes["select__field"]} ${
          !selectIsOpen ? classes["select__field--hide"] : ""
        }`}
        onChange={onBoxSizeChange}
      >
        <div className={classes["select__field-container"]}>
          {selectOptions}
        </div>
      </fieldset>
    </div>
  );
};

export default Select;
