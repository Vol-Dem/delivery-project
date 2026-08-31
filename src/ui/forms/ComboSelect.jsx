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
import { useEffect, useMemo, useState } from "react";

const optionsBatchSize = 40;
const scrollEndThreshold = 8;

const optionsMatch = (option, selectedOption) => {
  if (option == null || selectedOption == null) {
    return option === selectedOption;
  }

  if (option.name != null || selectedOption.name != null) {
    return option.geonameId != null && selectedOption.geonameId != null
      ? option.geonameId === selectedOption.geonameId
      : option === selectedOption;
  }

  if (option.countryCode != null && selectedOption.countryCode != null) {
    return option.countryCode === selectedOption.countryCode;
  }

  if (option.isoNumeric != null && selectedOption.isoNumeric != null) {
    return option.isoNumeric === selectedOption.isoNumeric;
  }

  return option === selectedOption;
};

const ComboSelect = ({
  optionsData,
  setQuery,
  setSelected,
  selected,
  placeholder,
  loading,
  disabled,
}) => {
  const [visibleOptionsAmount, setVisibleOptionsAmount] =
    useState(optionsBatchSize);
  const conditionalPlaceholder = !loading ? placeholder : "Loading...";
  const selectOptionHandler = (value) => setSelected(value);
  const resetVisibleOptions = () => setVisibleOptionsAmount(optionsBatchSize);
  const clearQueryHandler = () => setQuery("");
  const closeOptionsHandler = () => {
    clearQueryHandler();
    resetVisibleOptions();
  };
  const queryChangeHandler = (event) => {
    resetVisibleOptions();
    setQuery(event.target.value);
  };
  const loadMoreOptions = (event) => {
    const { clientHeight, scrollHeight, scrollTop } = event.currentTarget;
    const distanceFromEnd = scrollHeight - scrollTop - clientHeight;

    if (distanceFromEnd <= scrollEndThreshold) {
      setVisibleOptionsAmount((currentAmount) =>
        Math.min(currentAmount + optionsBatchSize, optionsData.length),
      );
    }
  };
  const visibleOptions = useMemo(
    () => optionsData.slice(0, visibleOptionsAmount),
    [optionsData, visibleOptionsAmount],
  );

  useEffect(() => {
    setVisibleOptionsAmount(optionsBatchSize);
  }, [optionsData]);

  return (
    <div>
      <Combobox
        immediate
        by={optionsMatch}
        value={selected}
        onChange={selectOptionHandler}
        onClose={closeOptionsHandler}
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
                onChange={queryChangeHandler}
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
                  modal={false}
                  as={motion.div}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  anchor="bottom"
                  transition
                  className={classes.options}
                  onAnimationComplete={clearQueryHandler}
                  onScroll={loadMoreOptions}
                >
                  {visibleOptions.map((option, index) => {
                    const optionMatchesSelection = optionsMatch(
                      option,
                      selected,
                    );
                    const selectedClass = optionMatchesSelection
                      ? classes.selected
                      : "";

                    return (
                      <ComboboxOption
                        key={option?.isoNumeric || option?.geonameId || index}
                        value={option}
                        className={`${classes.option} ${selectedClass}`}
                      >
                        {optionMatchesSelection && (
                          <CheckIcon className={classes.check} />
                        )}
                        <div>{option?.name || option?.countryName}</div>
                      </ComboboxOption>
                    );
                  })}
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
