import { Carousel, Card } from "react-bootstrap";
import "./Testimonials.scss";

export default function Testimonials() {
  return (
    <div className="testimonials py-5 overflow-hidden">
      <p className="text-center text-uppercase fw-bold display-6">
        Témoignages
      </p>
      <Carousel
        className="border-0 py-0 "
        controls={false}
        indicators={false}
        pause="hover"
      >
        <Carousel.Item>
          <Card
            bg="dark"
            text="white"
            style={{ width: "100%" }}
            className="mx-auto my-auto pt-5  border-0 px-5 py-3 rounded-0"
          >
            <Card.Body className="mx-auto">
              <Card.Title className="fw-bold">Mr John Doe / CEO</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
                rem? Nemo, saepe quasi magni architecto velit magnam eum tempora
                repudiandae?
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item>
          <Card
            bg="dark"
            text="white"
            style={{ width: "100%" }}
            className="mx-auto my-auto pt-5  border-0 px-5 py-3 rounded-0"
          >
            <Card.Body className="mx-auto">
              <Card.Title className="fw-bold">Mr John Doe / CEO</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
                rem? Nemo, saepe quasi magni architecto velit magnam eum tempora
                repudiandae?
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item>
          <Card
            bg="dark"
            text="white"
            style={{ width: "100%" }}
            className="mx-auto my-auto pt-5  border-0 px-5 py-3 rounded-0"
          >
            <Card.Body className="mx-auto">
              <Card.Title className="fw-bold">Mr John Doe / CEO</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
                rem? Nemo, saepe quasi magni architecto velit magnam eum tempora
                repudiandae?
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
