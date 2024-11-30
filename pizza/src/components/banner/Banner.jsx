import styles from "./Banner.module.css";
import pizzaLogo from "../../assets/pizza.svg";
import colourfulPizzaLogo from "../../assets/full-color-pizza.svg";

function Banner() {
  return (
    <>
      <img
        src={pizzaLogo}
        className={styles.logo}
        alt="pizza logo"
      />
      <img
        src={colourfulPizzaLogo}
        className={styles.logo}
        alt="pizza logo"
      />
      <img
        src={pizzaLogo}
        className={styles.logo}
        alt="pizza logo"
      />
      <h1 className={`${styles.bannerText} `}>Pizza Comparator</h1>
      <hr/>
    </>
  );
}

export default Banner;
