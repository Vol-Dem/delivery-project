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
import type { ChangeEvent, UIEvent } from "react";

interface ComboSelectOption {
  name?: string;
  countryName?: string;
  geonameId?: number;
  countryCode?: string;
  isoNumeric?: string;
}

const optionsBatchSize = 40;
const scrollEndThreshold = 8;

const optionsMatch = <T extends ComboSelectOption>(
  option: T | null,
  selectedOption: T | null,
) => {
  if (option == null || selectedOption == null) {
    return option === selectedOption;
  }

  if ("name" in option || "name" in selectedOption) {
    return "geonameId" in option && "geonameId" in selectedOption
      ? option.geonameId === selectedOption.geonameId
      : option === selectedOption;
  }

  if ("countryCode" in option && "countryCode" in selectedOption) {
    return option.countryCode === selectedOption.countryCode;
  }

  if ("isoNumeric" in option && "isoNumeric" in selectedOption) {
    return option.isoNumeric === selectedOption.isoNumeric;
  }

  return option === selectedOption;
};

const getOptionLabel = (option: ComboSelectOption | null): string => {
  if (!option) return "";

  return option.name || option.countryName || "";
};

interface ComboSelectProps<T extends ComboSelectOption> {
  optionsData: T[];
  setQuery: (query: string) => void;
  setSelected: (option: T | null) => void;
  selected: T | null;
  placeholder: string;
  loading?: boolean;
  disabled?: boolean;
  query?: string;
}

const ComboSelect = <T extends ComboSelectOption,>({
  optionsData,
  setQuery,
  setSelected,
  selected,
  placeholder,
  loading = false,
  disabled = false,
}: ComboSelectProps<T>) => {
  const [visibleOptionsAmount, setVisibleOptionsAmount] =
    useState(optionsBatchSize);
  const conditionalPlaceholder = !loading ? placeholder : "Loading...";
  const selectOptionHandler = (value: T | null) => setSelected(value);
  const resetVisibleOptions = () => setVisibleOptionsAmount(optionsBatchSize);
  const clearQueryHandler = () => setQuery("");
  const closeOptionsHandler = () => {
    clearQueryHandler();
    resetVisibleOptions();
  };
  const queryChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    resetVisibleOptions();
    setQuery(event.target.value);
  };
  const loadMoreOptions = (event: UIEvent<HTMLDivElement>) => {
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
                displayValue={(option: T | null) => getOptionLabel(option)}
                onChange={queryChangeHandler}
              />
              <ComboboxButton
                aria-label={`${open ? "Close" : "Open"} ${placeholder} options`}
                className={classes.button}
              >
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
                        key={
                          ("isoNumeric" in option
                            ? option.isoNumeric
                            : option.geonameId) || index
                        }
                        value={option}
                        className={`${classes.option} ${selectedClass}`}
                      >
                        {optionMatchesSelection && (
                          <CheckIcon className={classes.check} />
                        )}
                        <div>{getOptionLabel(option)}</div>
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
