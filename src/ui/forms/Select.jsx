import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ReactComponent as BoxEmptyImg } from "./../../assets/layout/boxempty.svg";
import classes from "./Select.module.scss";

const Select = ({ options, onChange, className }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const selectOption = (option) => {
    setSelectedOption(option);
    onChange?.(option.title);
  };

  return (
    <Listbox value={selectedOption} onChange={selectOption} by="title">
      {({ open }) => (
        <div className={`${classes.select} ${className || ""}`}>
          <ListboxButton type="button" className={classes["select__input"]}>
            <BoxEmptyImg
              aria-hidden="true"
              className={`${classes["select__icon"]} ${classes["select__icon--box"]}`}
            />
            <span
              className={
                selectedOption ? "" : classes["select__placeholder"]
              }
            >
              {selectedOption?.title || "Select size"}
            </span>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              className={classes["select__arrow"]}
            >
              <ChevronDownIcon aria-hidden="true" />
            </motion.span>
          </ListboxButton>

          <AnimatePresence>
            {open && (
              <ListboxOptions
                static
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95, zIndex: -1 }}
                animate={{ opacity: 1, scale: 1, zIndex: 1 }}
                exit={{ opacity: 0, scale: 0.95, zIndex: -1 }}
                className={classes["select__field"]}
              >
                <div className={classes["select__field-container"]}>
                  {options.map((item) => (
                    <ListboxOption
                      key={item.title}
                      value={item}
                      className={classes["select__label"]}
                    >
                      <div className={classes["select__title"]}>
                        {item.img && (
                          <div className={classes["select__img"]}>
                            {item.img}
                          </div>
                        )}
                        <span>{item.title}</span>
                      </div>
                      <div className={classes["select__desc"]}>
                        {item.size && (
                          <span className={classes["select__size"]}>
                            {item.size}
                          </span>
                        )}
                        {item.description && <span>{item.description}</span>}
                      </div>
                    </ListboxOption>
                  ))}
                </div>
              </ListboxOptions>
            )}
          </AnimatePresence>
        </div>
      )}
    </Listbox>
  );
};

export default Select;
