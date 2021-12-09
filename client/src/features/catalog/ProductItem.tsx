import { Col, Card } from "react-bootstrap";
import { Product } from "../../app/models/product";

interface Props {
  product: Product;
  onCardClick: () => void;
}

export default function ProductItem({ product, onCardClick }: Props) {
  return (
    <Col>
      <Card
        className="rounded px-2 py-2 border-0 bg-light"
        onClick={onCardClick}
      >
        <Card.Img
          className="img-fluid"
          variant="top"
          src={product.pictureUrl}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text className="text-muted">{product.price} DA</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
