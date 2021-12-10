import { Card, Col, Row } from "react-bootstrap";
import "./FeaturedProducts.scss";

export default function Featured() {
  return (
    <div className="featured  h-100 d-flex flex-column justify-content-between align-items-start pt-5 ">
      <header className="align-self-center py-5">
        <h1 className="text-uppercase text-center ">Nos Spécialités</h1>
        <p className="text-center container">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt corporis
          porro neque.
        </p>
      </header>

      <Row xs={1} md={3} className="container g-4 mb-5 mx-auto">
        <Col>
          <Card className="rounded px-2 py-2 h-100  bg-transparent text-light">
            <Card.Img
              className="img-fluid"
              variant="top"
              src="/images/pizza.png"
            />
            <Card.Body>
              <Card.Title>Pizza</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="rounded px-2 py-2 h-100  bg-transparent text-light">
            <Card.Img
              className="img-fluid"
              variant="top"
              src="/images/sandwich.png"
            />
            <Card.Body>
              <Card.Title>Burger</Card.Title>
              <Card.Text>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, laborum?
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="rounded px-2 py-2  h-100  bg-transparent text-light">
            <Card.Img
              className="img-fluid"
              variant="top"
              src="/images/wrap.png"
            />
            <Card.Body>
              <Card.Title>Wrap</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta dolorum ipsum pariatur placeat possimus temporibus.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
