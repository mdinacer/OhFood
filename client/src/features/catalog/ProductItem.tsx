import { Col, Card } from "react-bootstrap";
import { Product } from "../../app/models/product";
import "./Catalog.scss";

interface Props {
  product: Product;
  onCardClick: () => void;
}

export default function ProductItem({ product, onCardClick }: Props) {
  return (
    <Col>
      <Card
        className="rounded px-2 py-2 border-0 bg-light product-card"
        onClick={onCardClick}
      >
        <Card.Img
          className="img-fluid d-none d-md-flex"
          variant="top"
          src={product.pictureUrl}
        />
        <Card.Body className={"d-flex flex-row flex-md-column justify-content-between   align-items-center align-items-md-start"}>
          <Card.Title className={"mb-0"}>{product.name}</Card.Title>
          <Card.Text className="text-muted">{product.price} DA</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
