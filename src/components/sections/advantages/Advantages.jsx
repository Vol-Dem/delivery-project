import classes from "./Advantages.module.scss";
import AdvantagesCard from "./advantages-card/AdvantagesCard";
import Titles from "../../../ui/Titles";
import Wrap from "../../layout/Wrap";
import { useRef } from "react";
import useIntersection from "../../hooks/use-intersection";

const Advantages = () => {
  const sectionRef = useRef();
  const isIntersecting = useIntersection(sectionRef);
  const advantagesInfo = [
    {
      img: 1,
      title: "Notifications",
      text: "We notify by SMS, e-mail, robot or in any other way convenient for you.",
    },
    {
      img: 2,
      title: "Payment",
      text: "We accept all payment methods, including payment by card upon collection, cash, electronic money and fast payment systems.",
    },
    {
      img: 3,
      title: "Customer care",
      text: "Responsible and polite couriers who will deliver the package carefully and accurately.",
    },
    {
      img: 4,
      title: "Control",
      text: "Instant and complete tracking. You will always be aware of the movement of the parcel.",
    },
  ];
  return (
    <section ref={sectionRef} className={classes["advantages-section"]}>
      <Wrap>
        <div className={classes.container}>
          <div
            className={`${classes["advantages__head"]} ${
              isIntersecting ? classes["advantages__head--animate"] : ""
            }`}
          >
            <Titles
              main="Our advantages"
              sub="It's convenient"
              className={classes["advantages__head__titles"]}
            />
          </div>
          <div
            className={`${classes.advantages} ${
              isIntersecting ? classes["advantages--animate"] : ""
            }`}
          >
            {advantagesInfo.map((service, i) => {
              return (
                <AdvantagesCard
                  key={i}
                  img={service.img}
                  title={service.title}
                  text={service.text}
                  className={`${classes["advantages__card"]} ${
                    isIntersecting
                      ? classes[`advantages__card--animate-${i + 1}`]
                      : ""
                  }`}
                />
              );
            })}
          </div>
        </div>
      </Wrap>
    </section>
  );
};

export default Advantages;
