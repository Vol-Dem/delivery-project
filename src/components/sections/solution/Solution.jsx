import classes from "./Solution.module.scss";
import { ReactComponent as DeliveryMarkersImg } from "../../../assets/delivery-markers.svg";
import { ReactComponent as TriangleImg } from "../../../assets/bg-elements/triangle.svg";
import { ReactComponent as SquareImg } from "../../../assets/bg-elements/square.svg";
import { ReactComponent as DocumentsImg } from "./../../../assets/slider/documents.svg";
import { ReactComponent as GoodsImg } from "./../../../assets/slider/goods.svg";
import { ReactComponent as FlowersImg } from "./../../../assets/slider/flowers.svg";
import { ReactComponent as PresentImg } from "./../../../assets/slider/present.svg";
import { ReactComponent as ClothesImg } from "./../../../assets/slider/clothes.svg";
import { ReactComponent as ShoesImg } from "./../../../assets/slider/shoes.svg";
import { ReactComponent as MedicationsImg } from "./../../../assets/slider/medications.svg";
import { ReactComponent as ElectronicsImg } from "./../../../assets/slider/electronics.svg";
import { ReactComponent as AppliancesImg } from "./../../../assets/slider/appliances.svg";
import { ReactComponent as SportImg } from "./../../../assets/slider/sport.svg";
import { ReactComponent as ChildrensGoodsImg } from "./../../../assets/slider/childrens-goods.svg";
import { ReactComponent as FoodImg } from "./../../../assets/slider/food.svg";
import { ReactComponent as CorrespondenceImg } from "./../../../assets/slider/correspondence.svg";
import Titles from "../../../ui/Titles";
import Slider from "../../slider/Slider";
import Wrap from "../../layout/Wrap";
import { useRef } from "react";
import useIntersection from "../../hooks/use-intersection";
import { motion } from "framer-motion";

const Solution = () => {
  const sectionRef = useRef();
  const isIntersecting = useIntersection(sectionRef);
  const sliderData = [
    {
      img: DocumentsImg,
      title: "Documents",
      description: "Delivery of documents to partners",
    },
    {
      img: GoodsImg,
      title: "Goods",
      description: "Deliver goods to customers",
    },
    {
      img: FlowersImg,
      title: "Bouquets",
      description: "Flower delivery to your clients",
    },
    {
      img: PresentImg,
      title: "Present",
      description: "Gift delivery",
    },
    {
      img: ClothesImg,
      title: "Clothes",
      description: "Delivery of clothes with fitting",
    },
    {
      img: ShoesImg,
      title: "Shoes",
      description: "Shoe delivery with fitting",
    },
    {
      img: MedicationsImg,
      title: "Medications",
      description: "Delivery from pharmacies",
    },
    {
      img: ElectronicsImg,
      title: "Electronics",
      description: "Delivery of gadgets and accessories",
    },
    {
      img: AppliancesImg,
      title: "Appliances",
      description: "Careful delivery of equipment",
    },
    {
      img: SportImg,
      title: "Sports",
      description: "Delivery of sports equipment",
    },
    {
      img: ChildrensGoodsImg,
      title: "For childen",
      description: "Convenient delivery for parents",
    },
    {
      img: FoodImg,
      title: "Food",
      description: "Delivery of food and meals",
    },
    {
      img: CorrespondenceImg,
      title: "Correspondence",
      description: "Delivery of newspapers and magazines",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={classes["solution-section"]}
      id="section-solution"
    >
      <Wrap>
        <div className={classes["container"]}>
          <div
            className={`${classes["solution"]} ${
              isIntersecting ? classes["solution--animate"] : ""
            }`}
          >
            <Titles
              main="What do we deliver"
              sub="Solution"
              className={classes["solution__title"]}
            />

            <p className={classes["solution__text"]}>
              Various cargoes are taken into work, from envelopes to large-sized
              ones. We provide services for both business and private clients.
              Online store owners will not need to worry about their own
              logistics network, and ordinary people will not need to worry
              about how to deliver a birthday present to loved ones.
            </p>
            <p className={classes["solution__text"]}>
              With our company, you can transfer items and documents of
              particular importance that need to be delivered without damage
              with a guarantee of safety.
            </p>
            <p className={classes["solution__text"]}>
              Buying food or other perishable products online is no longer a
              problem. Grow your online business, and our courier service will
              take care of the timely delivery of goods.
            </p>
          </div>

          <DeliveryMarkersImg
            className={`${classes["solution-image"]} ${
              isIntersecting ? classes["solution-image--animate"] : ""
            }`}
          />
        </div>
        <Slider
          sliderData={sliderData}
          className={`${classes["slider"]} ${
            isIntersecting ? classes["slider--animate"] : ""
          }`}
        />
      </Wrap>
      <TriangleImg className={classes.triangle} />
      {/* <div>
        <SquareImg className={classes.square} />
      </div> */}
      <motion.div
        className={classes["square-container"]}
        // whileInView={{
        //   // rotate: 360,
        //   y: [0, 56, 0],
        //   transition: {
        //     repeat: Infinity,
        //     duration: 16,
        //     type: "tween",
        //     ease: "linear",
        //   },
        // }}
      >
        <SquareImg className={classes.square} />
      </motion.div>
    </section>
  );
};

export default Solution;
