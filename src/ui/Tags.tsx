import type { MouseEventHandler } from "react";
import type { Country } from "../api/geonames";
import classes from "./Tags.module.scss";

interface TagsProps {
  tagList: Country[];
  onClick: MouseEventHandler<HTMLDivElement>;
}

const Tags = ({ tagList, onClick }: TagsProps) => {
  const tags = tagList?.map((tag) => (
    <button
      type="button"
      key={tag.isoNumeric}
      className={classes["tags__item"]}
      data-tag={tag.countryName}
      data-iso={tag.countryCode}
      data-id={tag.isoNumeric}
    >
      {tag.countryName}
    </button>
  ));
  return (
    <div className={classes["tags"]} onClick={onClick}>
      {tags}
    </div>
  );
};

export default Tags;
