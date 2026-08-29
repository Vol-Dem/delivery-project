import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import classes from "./ComboSelect.module.scss";
import { motion, AnimatePresence } from "framer-motion";

const ComboSelect = ({
  optionsData,
  setQuery,
  setSelected,
  selected,
  placeholder,
  loading,
  disabled,
}) => {
  const conditionalPlaceholder = !loading ? placeholder : "Loading...";
  return (
    <div className="mx-auto h-screen w-52 pt-20">
      <Combobox
        immediate
        value={selected}
        onChange={(value) => setSelected(value)}
        onClose={() => setQuery("")}
      >
        {({ open }) => (
          <>
            <div className={classes.relative}>
              <ComboboxInput
                disabled={loading || disabled}
                placeholder={
                  open && !!optionsData.length
                    ? "Start typing"
                    : conditionalPlaceholder
                }
                className={classes.select}
                displayValue={(options) =>
                  options?.name || options?.countryName
                }
                onChange={(event) => setQuery(event.target.value)}
              />
              <ComboboxButton className={classes.button}>
                {!!optionsData?.length && (
                  <motion.div animate={{ rotate: open ? 180 : 0 }}>
                    <ChevronDownIcon className={classes.arrow} />
                  </motion.div>
                )}
              </ComboboxButton>
            </div>
            <AnimatePresence>
              {open && (
                <ComboboxOptions
                  static
                  as={motion.div}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  anchor="bottom"
                  transition
                  className={classes.options}
                  onAnimationComplete={() => setQuery("")}
                >
                  {optionsData.map((options, i) => (
                    <ComboboxOption
                      key={options?.isoNumeric || i}
                      value={options}
                      className={`${classes.option} ${
                        (options?.name && options?.name === selected?.name) ||
                        (options?.countryName &&
                          options?.countryName === selected?.name)
                          ? classes.selected
                          : ""
                      }`}
                    >
                      {(options?.name && options?.name === selected?.name) ||
                        (options?.countryName &&
                          options?.countryName === selected?.name && (
                            <CheckIcon className={classes.check} />
                          ))}
                      <div className="text-sm/6 text-white">
                        {options?.name || options?.countryName}
                      </div>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              )}
            </AnimatePresence>
          </>
        )}
      </Combobox>
    </div>
  );
};

export default ComboSelect;
