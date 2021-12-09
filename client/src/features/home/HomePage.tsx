import Announces from "./announces/Announces";
import Featured from "./featured/FeaturedProducts";
import Hero from "./hero/Hero";
import "./Home.scss";
import Footer from "./footer/Footer";
import Testimonials from "./testimonials/Testimonials";
import Catalog from "../catalog/Catalog";

export default function HomePage() {
  return (
    <>
      <div className="main-container bg-light">
        <section id="home">
          <Hero />
        </section>
        <section
          id="announces"
          className="d-flex flex-column  justify-content-end"
        >
          <Announces />
        </section>

        <section id="dujour">
          <Featured />
        </section>

        <section id="menu" className="pt-5">
          <Catalog />
        </section>

        <section id="testimonials" className="pt-5">
          <Testimonials />
        </section>

        <section id="footer">
          <Footer />
        </section>
      </div>
    </>
  );
}
