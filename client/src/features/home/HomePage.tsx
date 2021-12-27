import Announces from "./Announces";
import Contact from "./Contact";
import Hero from "./Hero";
import Specialities from "./Specialities";
import "./HomePage.scss";

export default function HomePage() {
    return (
        <div className="home">
            <section className="hero">
                <Hero/>
            </section>

            <section className="announces" aria-label="Announces">
                <Announces/>
            </section>

            <section className="specialities" aria-label="Specialities">
                <Specialities/>
            </section>

            {/* <section className="gallery">
        <Gallery />
      </section> */}

            <section className="contact">
                <Contact/>
            </section>
        </div>
    );
}
