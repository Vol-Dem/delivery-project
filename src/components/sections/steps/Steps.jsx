import classes from "./Steps.module.scss";
import { ReactComponent as MarkerImg } from "./../../../assets/layout/map-marker.svg";
import Titles from "../../../ui/Titles";
import Wrap from "../../layout/Wrap";
import { useRef } from "react";
import useIntersection from "../../hooks/use-intersection";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Step 1",
    text: "Arrange delivery through your personal account, on the website or by phone. It will take no more than 3 minutes",
  },
  {
    title: "Step 2",
    text: "Service couriers will see the order through the mobile application and take the order to work",
  },
  {
    title: "Step 3",
    text: "As soon as a courier is assigned, you will receive a notification that the delivery has been accepted for execution.",
  },
  {
    title: "Step 4",
    text: "Your client receives the order and you will receive a notification that the delivery has been successfully completed",
  },
];

const Steps = () => {
  const sectionRef = useRef();
  const isIntersecting = useIntersection(sectionRef);
  const stepsHtml = steps.map((step, i) => {
    return (
      <motion.div
        key={i}
        variants={{ hover: { scale: 1.05 } }}
        whileHover="hover"
        className={`${classes["steps__item"]} ${
          i % 2 !== 0 ? "" : classes["steps__item--blue"]
        }`}
      >
        <div
          // variants={{
          //   hover: {
          //     y: [0, -6, 0],
          //     transition: {
          //       repeat: Infinity,
          //       duration: 0.9,
          //     },
          //   },
          // }}
          className={classes["steps__icon"]}
        >
          <motion.div
            variants={{
              hover: {
                y: [0, -6, 0],
                transition: {
                  repeat: Infinity,
                  duration: 1.2,
                },
              },
            }}
          >
            <MarkerImg
              className={`${classes["steps__icon--small"]} ${
                i % 2 === 0
                  ? classes["steps__icon--dark"]
                  : classes["steps__icon--light"]
              }`}
            />
          </motion.div>
          <motion.div
            variants={{
              hover: {
                y: [0, -6, 0],
                transition: {
                  repeat: Infinity,
                  duration: 1.2,
                  delay: 0.3,
                },
              },
            }}
          >
            <MarkerImg
              className={`${classes["steps__icon--big"]} ${
                i % 2 === 0
                  ? classes["steps__icon--light"]
                  : classes["steps__icon--dark"]
              }`}
            />
          </motion.div>
        </div>
        <h4 className={classes["steps__title"]}>{step.title}</h4>
        <p className={classes["steps__text"]}>{step.text}</p>
      </motion.div>
    );
  });

  return (
    <section
      ref={sectionRef}
      className={classes["steps-section"]}
      id="section-steps"
    >
      <Wrap>
        <Titles
          main="Four simple steps between sender and recipient"
          sub="How it works"
          className={`${classes["steps-section__titles"]} ${
            isIntersecting ? classes["steps-section__titles--animate"] : ""
          }`}
        />
        <div
          className={`${classes["steps"]} ${
            isIntersecting ? classes["steps--animate"] : ""
          }`}
        >
          {stepsHtml}
        </div>
      </Wrap>
    </section>
  );
};

export default Steps;
