import classes from "./Services.module.scss";
import shopImg from "../../../assets/shop.png";
import basketImg from "../../../assets/basket-full.png";
import usersImg from "../../../assets/users.png";
import globeServiceImg from "../../../assets/globe-service.png";
import ServiceCard from "./service-card/ServiceCard";
import Titles from "../../../ui/Titles";
import Wrap from "../../layout/Wrap";

const Services = () => {
  const servicesInfo = [
    {
      img: shopImg,
      title: "For online stores",
      text: "Careful delivery to the door or pickup point even on weekends, 7 days free storage of your customers' parcels",
    },
    {
      img: basketImg,
      title: "For marketplaces",
      text: "Dedicated support line, free returnsunaccepted cargo back to the delivery warehouse",
    },
    {
      img: usersImg,
      title: "Individual",
      text: "Send packages to your relatives or friends easily and without unnecessary formalities",
    },
    {
      img: globeServiceImg,
      title: "International",
      text: "Reliable delivery to 206 countries of the world for individuals and legal entities, customs clearance of cargo",
    },
  ];
  return (
    <section className={classes["services-section"]} id="section-services">
      <Wrap>
        <div className={classes["services__head"]}>
          <Titles
            main="Delivery types"
            sub="Our services"
            className={classes["services__head__titles"]}
          />
        </div>
        <div className={classes.services}>
          {servicesInfo.map((service, i) => {
            return (
              <ServiceCard
                key={i}
                image={service.img}
                title={service.title}
                text={service.text}
              />
            );
          })}
        </div>
      </Wrap>
    </section>
  );
};

export default Services;
