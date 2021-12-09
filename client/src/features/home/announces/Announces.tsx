import {Carousel} from "react-bootstrap";
import "./Announces.scss";

export default function Announces() {
    return (
        <div className="announces position-relative">
            <header className="my-5 position-absolute top-0 start-50 translate-middle-x  py-3 w-100 shadow-sm">
                <h1 className="text-uppercase text-center ">Nos Offres</h1>
                <p className="text-center ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt corporis
                    porro neque.
                </p>
            </header>
            <Carousel className="rounded">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/images/announces/announce1.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/images/announces/announce2.jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/images/announces/announce3.jpeg"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/images/announces/announce4.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption className="carousel-caption ">
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}
