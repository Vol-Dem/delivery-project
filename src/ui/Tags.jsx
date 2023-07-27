import classes from "./Tags.module.scss";

const Tags = ({ tagList, onClick }) => {
  const tags = tagList?.map((tag) => (
    <span key={tag} className={classes["tags__item"]} data-city={tag}>
      {tag}
    </span>
  ));
  return (
    <div className={classes["tags"]} onClick={onClick}>
      {tags}
    </div>
  );
};

export default Tags;
