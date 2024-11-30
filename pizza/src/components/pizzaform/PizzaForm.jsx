import { useState } from "react";
import style from "./PizzaForm.module.css";
import { Button, Stack, Form } from "react-bootstrap";

function genId(item) {
  return (
    item.size +
    "_" +
    item.price +
    "_" +
    item.name.replaceAll('"', "").replaceAll(" ", "_")
  );
}

function PizzaForm({ pizzaList, setPizzaList }) {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");

  function clearForm() {
    setSize("");
    setPrice("");
    setName("");
  }

  function addPizza(pizza) {
    if (
      pizza.price === undefined ||
      pizza.size === undefined ||
      pizza.size === 0
    ) {
      return;
    }
    if (pizza.name === undefined || pizza.name === "") {
      pizza.name = pizza.size + '" Pizza of ₹' + pizza.price;
    }
    pizza.id = genId(pizza);
    setPizzaList(
      [...pizzaList, pizza].sort(
        (p1, p2) => p2.size / p2.price - p1.size / p1.price
      )
    );
  }

  const handleSizeChange = (event) => {
    setSize(Number.parseFloat(event.target.value));
  };
  const handlePriceChange = (event) => {
    setPrice(Number.parseFloat(event.target.value));
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <Form className={`text-start ${style.pizzaForm}`}>
        <Form.Group className="mb-3" controlId="pizzaSize">
          <Form.Label>Size</Form.Label>
          <Form.Control
            type="number"
            placeholder="How big of a pizza is it?"
            value={size}
            onChange={handleSizeChange}
          />
          <Form.Text className={`${style.swalpaAdjust} "text-muted"`}>
            Enter all the measurements in same unit
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="pizzaPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="How much does it cost?"
            value={price}
            onChange={handlePriceChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pizzaName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="What is it called?"
            size="sm"
            value={name}
            onChange={handleNameChange}
          />
          <Form.Text className={`${style.swalpaAdjust} "text-muted"`}>
            It's optional, without this the size will be picked as a label
          </Form.Text>
        </Form.Group>
        <Stack direction="horizontal" gap={2}>
          <Button
            variant="success"
            type="button"
            onClick={() => addPizza({ name: name, price: price, size: size })}>
            Add
          </Button>
          <Button variant="danger" type="reset" onClick={clearForm}>
            Reset
          </Button>
        </Stack>
      </Form>
    </>
  );
}

export default PizzaForm;
