import { useEffect, useState } from "react";
import { Col, Row, Image, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../basket/basketSlice";
import { productSelectors, fetchProductAsync } from "./catalogSlice";

import "./ProductDetails.scss";
import Background from "../../images/backgrounds/product_details_bg.jpg";

// const supplements = [
//   { label: "Camambert", price: 100, quantity: 0 },
//   { label: "Gruyère", price: 100, quantity: 0 },
//   { label: "Fromage Rouge", price: 100, quantity: 0 },
//   { label: "Cheddar", price: 100, quantity: 0 },
//   { label: "Pain Noir", price: 50, quantity: 0 },
//   { label: "Frites", price: 100, quantity: 0 },
// ];

// const sauces = [
//   { label: "OH-MG" },
//   { label: "Samurai" },
//   { label: "Biggy" },
//   { label: "Américaine" },
//   { label: "Blanche" },
//   { label: "BBQ" },
// ];

const ingredients = ["Frites", "Fromage", "V.H", "Oeufs", "Salade"];

export default function ProductDetails() {
  const { id } = useParams<string>();
  const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector((state) => state.basket);
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, parseInt(id!))
  );
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const [quantity, setQuantity] = useState(1);
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductAsync(parseInt(id!)));
    }
    if (item) {
      setQuantity(item.quantity);
    }
  }, [dispatch, id, item, product]);

  function increment() {
    const qty = quantity + 1;
    setQuantity(qty);
  }

  function decrement() {
    if (quantity > 1) {
      const qty = quantity - 1;
      setQuantity(qty);
    }
  }

  function handleUpdateCart() {
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item?.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          productId: product!.id,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItemAsync({
          productId: product!.id,
          quantity: updatedQuantity,
        })
      );
    }
  }

  if (productStatus.includes("pending")) return <p>loading</p>;

  if (!product) {
    return <NotFound />;
  }

  return (
    <div className="product-details pt-5 " style={{backgroundImage:Background}}>
      <Container className="product-details-container pt-5 ">
        <Row className="w-100">
          <Col
            xs={12}
            md={6}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <Image
              src={product.pictureUrl}
              alt={product.name}
              className="img-fluid"
            ></Image>
          </Col>
          <Col xs={12} md={6} className="d-flex align-items-center my-5">
            <Container className="my-3 my-md-auto ">
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <h3>Ingrédients</h3>
              <ul className="">
                {ingredients.map((item) => (
                  <li className="mx-2" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
              <small className="text-center d-block">Quantité</small>

              <div className="quantity d-flex flex-row justify-content-center align-items-center">
                <Button variant="dark" onClick={decrement}>
                  -
                </Button>
                <p className="my-auto">{quantity}</p>
                <Button variant="dark" onClick={increment}>
                  +
                </Button>
              </div>

              <div className="price d-flex flex-row align-items-end justify-content-between my-3 border-bottom border-dark">
                <small>Prix unitaire</small>
                <p className="mb-0">{product.price} DA</p>
              </div>
              <div className="price d-flex flex-row align-items-end justify-content-between my-3 border-bottom border-dark">
                <small>Total</small>
                <p className="mb-0">{product.price * quantity} DA</p>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <LinkContainer to="/">
                  <Button variant="outline-dark">Retour</Button>
                </LinkContainer>
                <Button
                  variant="dark"
                  onClick={handleUpdateCart}
                  disabled={
                    item?.quantity === quantity || (!item && quantity === 0)
                  }
                >
                  {status.includes("pending")
                    ? "Loading…"
                    : item
                    ? "Actualiser"
                    : "Ajouter"}
                </Button>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
