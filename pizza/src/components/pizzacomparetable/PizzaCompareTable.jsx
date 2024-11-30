import { Button, Table } from "react-bootstrap";
import styles from "./PizzaCompareTable.module.css";

function round2Dec(num) {
  return Math.round(num * 100) / 100;
}

function areaRound2Dec(size) {
  return round2Dec(Math.PI * size ** 2);
}

function pricePerSqUnit(area, price) {
  return round2Dec(price / area);
}

function PizzaCompareTable({pizzaList, setPizzaList}) {
  function removeItem(itemId) {
    setPizzaList(pizzaList.filter((item) => item.id != itemId));
  }

  return (
    <>
      <Table striped bordered hover className={styles.wholeTable}>
        <thead className={styles.bgHead}>
          <tr id="banana" className={styles.bgClear}>
            <th scope="col" className={styles.bgClear}>
              #
            </th>
            <th scope="col" className={`${styles.leftWing} ${styles.bgClear}`}>
              Name
            </th>
            <th scope="col" className={styles.bgClear}>
              Size (Unit)
            </th>
            <th scope="col" className={styles.bgClear}>
              Area (Sq. Unit)
            </th>
            <th scope="col" className={styles.bgClear}>
              Price (₹)
            </th>
            <th scope="col" className={styles.bgClear}>
              Price per sq. unit
            </th>
            <th scope="col" className={styles.bgClear}></th>
          </tr>
        </thead>
        <tbody>
          {pizzaList.map((item, index) => (
            <tr id={item.id}>
              <td className={styles.leftWing}>{index + 1}</td>
              <td className={styles.leftWing}>{item.name}</td>
              <td>{item.size + '"'}</td>
              <td className={styles.rightWing}>{areaRound2Dec(item.size)}</td>
              <td className={styles.rightWing}>
                <span className={`${styles.leftWing} ${styles.currencyUnit}`}>
                  ₹
                </span>
                <span className={styles.rightWing}>{item.price}</span>
              </td>
              <td className={styles.rightWing}>
                <span className={`${styles.leftWing} ${styles.currencyUnit}`}>
                  ₹
                </span>
                <span>
                  {pricePerSqUnit(areaRound2Dec(item.size), item.price)}
                </span>
              </td>
              <td>
                <Button
                  type="button"
                  className={`${styles.deleteButton}`}
                  variant="danger"
                  size="sm"
                  onClick={() => removeItem(item.id)}>
                  <div className={styles.deleteMark}>&#215;</div>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default PizzaCompareTable;
