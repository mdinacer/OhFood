import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { removeBasketItemAsync } from "../../basket/basketSlice";
import "./CartMenu.scss";

interface Props {
  onClose: () => void;
}

export default function CartMenu({ onClose }: Props) {
  const { basket } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [subtotal, setSubtotal] = useState(0);
  const deliveryFee = subtotal > 10000 ? 0 : 500;

  function handleEditItem(item: any) {
    navigate(`/menu/${item.productId}`);
    onClose();
  }

  useEffect(() => {
    const total =
      basket?.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      ) ?? 0;

    setSubtotal(total);
  }, [basket?.items]);

  if (!basket || basket.items.length === 0)
    return <h1>Your basket is empty</h1>;
  return (
    <>
      <div className="basket-menu d-flex flex-column justify-content-between h-100">
        {basket.items.map((item, index) => (
          <Row
            className="d-flex align-items-end border-bottom  pb-1 mb-1"
            key={item.productId}
          >
            <Col xs={5}>
              <small className="text-muted">{item.type}</small>
              <p>{item.name}</p>
            </Col>
            <Col xs={1}>
              <p>
                <small>x</small>
                {item.quantity}
              </p>
            </Col>

            <Col xs={3}>
              <p>{item.price * item.quantity} DA</p>
            </Col>
            <Col
              xs={12}
              md={3}
              className="d-flex justify-content-end justify-content-md-around my-3 my-md-0"
            >
              <Button
                size="sm"
                variant="dark"
                onClick={() => handleEditItem(item)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="dark"
                className="mx-2 mx-md-0"
                onClick={() =>
                  dispatch(
                    removeBasketItemAsync({
                      productId: item.productId,
                      quantity: item.quantity,
                      name: "del",
                    })
                  )
                }
              >
                Delete
              </Button>
            </Col>
          </Row>
        ))}
        <Container className="totals mt-auto  py-2 px-4 rounded-2">
          <Row>
            <Col md={9} xs={6}>
              <small className="text-uppercase">somme</small>
            </Col>
            <Col md={3} xs={6}>
              <p className="fw-bold text-end">{subtotal} DA</p>
            </Col>
            <Col md={9} xs={6}>
              <small className="text-uppercase">Livraison</small>
            </Col>
            <Col md={3} xs={6}>
              <p className="fw-bold text-end">{deliveryFee} DA</p>
            </Col>
            <Col md={9} xs={6}>
              <small className="text-uppercase">total</small>
            </Col>
            <Col md={3} xs={6}>
              <p className="fw-bolder text-end">{subtotal + deliveryFee} DA</p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
