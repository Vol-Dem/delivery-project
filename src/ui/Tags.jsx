import classes from "./Tags.module.scss";

const Tags = ({ tagList, onClick }) => {
  const tags = tagList?.map((tag) => (
    <span
      key={tag.isoNumeric}
      className={classes["tags__item"]}
      data-tag={tag.countryName}
      data-iso={tag.countryCode}
      data-id={tag.isoNumeric}
    >
      {tag.countryName}
    </span>
  ));
  return (
    <div className={classes["tags"]} onClick={onClick}>
      {tags}
    </div>
  );
};

export default Tags;
