import { Modal, Row, Col, Container, Button, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Product } from "../../app/models/product";
import "./ProductDetailsModal.scss";

interface Props {
  isModalOpen: boolean;
  product: Product;
  onCloseModal: () => void;
}

export default function ProductDetailsModal({
  isModalOpen,
  product,
  onCloseModal,
}: Props) {
  return (
    <div className="product-details-modal">
      <Modal
        scrollable
        className="modal rounded-3"
        show={isModalOpen}
        onHide={onCloseModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="ms-3 text-uppercase">
            {product.name}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col
              xs={12}
              md={6}
              className="d-flex align-items-center justify-content-center"
            >
              <Image
                className="img-fluid modal-image my-auto mx-auto"
                src={product.pictureUrl}
                rounded
              />
            </Col>
            <Col xs={12} md={6}>
              <Container className=" d-flex flex-column justify-content-between h-100">
                <small className="fw-bold mb-2">Ingédients</small>
                <ul>
                  <li>Frites</li>
                  <li>Fromage</li>
                  <li>V.H</li>
                  <li>Oeufs</li>
                  <li>Salad & Tomate</li>
                </ul>

                <p className="fw-bold pt-4">{product.description}</p>
                <p className="fw-bold pt-4">Prix: {product.price} DA</p>
              </Container>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseModal}>
            Fermer
          </Button>
          <LinkContainer to={`/menu/${product.id}`}>
            <Button variant="dark">Commander</Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
