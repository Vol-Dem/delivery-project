import classes from "./Counters.module.scss";
import { useRef } from "react";
import useIntersection from "../../hooks/use-intersection";
import Counter from "./counter/Counter";

const Counters = () => {
  const sectionRef = useRef();
  const isIntersecting = useIntersection(sectionRef);
  const countersData = [
    {
      digits: "12+",
      text: "years in logistics",
    },
    {
      digits: "4434",
      text: "branches",
    },
    {
      digits: "5 min",
      text: "to send a parcel",
    },
    {
      digits: "1230",
      text: "online stores",
    },
  ];
  return (
    <section ref={sectionRef} className={classes["counters-sections"]}>
      <div className={classes["counters__container"]}>
        <div className={classes["counters"]}>
          {countersData.map((counter, i) => (
            <Counter
              key={i}
              digits={counter.digits}
              text={counter.text}
              className={
                isIntersecting ? classes[`counter--animate-${i + 1}`] : ""
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counters;
