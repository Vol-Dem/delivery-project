import Titles from "../../../ui/Titles";
import classes from "./Calculator.module.scss";
import { ReactComponent as EnvelopeImg } from "./../../../assets/box/envelope.svg";
import { ReactComponent as BoxImg } from "./../../../assets/box/box.svg";
import { ReactComponent as BoxPalletImg } from "./../../../assets/box/boxes-pallet.svg";
import { ReactComponent as MarkerImg } from "./../../../assets/layout/map-marker.svg";
import { useState } from "react";
import Button from "../../../ui/Button";
import Tags from "../../../ui/Tags";
import Input from "../../../ui/Input";
import Wrap from "../../layout/Wrap";
import Select from "../../../ui/Select";

const Calculator = () => {
  const [dispatchCity, setDispatchCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [parcelSize, setParcelSize] = useState("");
  const tags = ["London", "New York", "Kyiv"];
  const selectData = [
    {
      title: "Envelope",
      size: "42x36x5 cm, up to 2 kg",
      description: "Small items: documents, jewelry, accessories",
      img: <EnvelopeImg />,
    },
    {
      title: "Box S",
      size: "33x25x15 cm, up to 5 kg",
      description: "A little more than a shoebox",
      img: <BoxImg />,
    },
    {
      title: "Box M",
      size: "31x25x38 cm, up to 12 kg",
      description: "Like a microwave box",
      img: <BoxImg />,
    },

    {
      title: "Box L",
      size: "60x35x30 cm, up to 18 kg",
      description: "For equipment, spare parts, tools",
      img: <BoxImg />,
    },
    {
      title: "Pallet",
      size: "120x120x80 cm, up to 200 kg",
      description: "Large cargo: large household appliances, home library",
      img: <BoxPalletImg />,
    },
  ];

  const onDispatchCityChangeHandler = (e) => {
    setDispatchCity(e.target.value);
  };
  const onDestinationCityChangeHandler = (e) => {
    setDestinationCity(e.target.value);
  };
  const onParcelSizeChangeHandler = (size) => {
    setParcelSize(size);
  };

  const onTagDispatch = (e) => {
    const city = e.target.dataset.city;
    if (!city) {
      return;
    }
    setDispatchCity(city);
  };

  const onTagDestination = (e) => {
    const city = e.target.dataset.city;
    if (!city) {
      return;
    }
    setDestinationCity(city);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      dispatchCity,
      destinationCity,
      parcelSize,
    };
    console.log(formData);
  };

  return (
    <section className={classes["calculator-section"]}>
      <Wrap>
        <div className={classes["calculator-container"]}>
          <Titles
            main="Calculate shipping"
            className={classes["calculator-section__title"]}
          />
          <form onSubmit={onFormSubmit} className={classes["calculator"]}>
            <div>
              <div className={classes["calculator__field"]}>
                <Input
                  className={classes["calculator__input"]}
                  type="text"
                  placeholder="Dispatch city"
                  onChange={onDispatchCityChangeHandler}
                  value={dispatchCity}
                />
                <MarkerImg className={classes["calculator__input-img"]} />
              </div>
              <Tags tagList={tags} onClick={onTagDispatch} />
              <fieldset className={classes["calculator__delivery-type"]}>
                <input type="radio" name="delivery-type" id="1" />
                <label htmlFor="1">From the door</label>
                <input type="radio" name="delivery-type" id="2" />
                <label htmlFor="2">From stock</label>
              </fieldset>
            </div>
            <div>
              <div className={classes["calculator__field"]}>
                <Input
                  className={classes["calculator__input"]}
                  type="text"
                  placeholder="Destination city"
                  onChange={onDestinationCityChangeHandler}
                  value={destinationCity}
                />
                <MarkerImg className={classes["calculator__input-img"]} />
              </div>
              <Tags tagList={tags} onClick={onTagDestination} />
              <fieldset className={classes["calculator__delivery-type"]}>
                <input type="radio" name="delivery-type2" id="4" />
                <label htmlFor="4">To the door</label>
                <input type="radio" name="delivery-type2" id="5" />
                <label htmlFor="5">To pickup point</label>
              </fieldset>
            </div>

            <Select options={selectData} onChange={onParcelSizeChangeHandler} />
            <Button className={classes["calculator__btn"]} type="submit">
              Calculate
            </Button>
          </form>
        </div>
      </Wrap>
    </section>
  );
};

export default Calculator;
