import { useState } from "react";
import styles from "./App.module.css";
import Banner from "./components/banner/Banner";
import PizzaForm from "./components/pizzaform/PizzaForm";
import PizzaCompareTable from "./components/pizzacomparetable/PizzaCompareTable";

function App() {
  const [pizzaList, setPizzaList] = useState([]);
  return (
    <>
      <Banner />
      <PizzaForm pizzaList={pizzaList} setPizzaList={setPizzaList} />
      {(pizzaList !== undefined && pizzaList.length !== 0) && (
        <PizzaCompareTable pizzaList={pizzaList} setPizzaList={setPizzaList} />
      )}
    </>
  );
}

export default App;
