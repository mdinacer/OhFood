import "./Hero.scss";

export default function Hero() {
  return (
    <div className="hero position-relative hero-container d-flex flex-column justify-content-end align-items-start pb-5 ps-5">
      <video
        muted
        loop
        src="/videos/serving.mp4"
        className="d-none d-md-block"
      ></video>

      <img
        src="/images/hero2.jpg"
        alt="hero1"
        className="hero-image d-sm-block d-md-none"
      />

      <div className="overlay d-none d-md-block"></div>

      <div className="text d-flex flex-column justify-content-center align-items-start my-5 mx-3 ">
        <h2>Never Stop</h2>
        <h3>
          <span>Exploring</span> the tastes
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque
          commodi maxime a quo voluptate aliquam ipsa sapiente obcaecati fuga
          amet!
        </p>
        <a className="btn btn-dark" href="#menu">
          Explore
        </a>
      </div>
    </div>
  );
}
