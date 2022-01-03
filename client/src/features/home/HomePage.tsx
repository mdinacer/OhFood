import {lazy, Suspense} from "react";
import Hero from "./Hero";
import "./HomePage.scss";


const Announces = lazy(() => import("./Announces"));
const Contact = lazy(() => import("./Contact"));
const Specialities = lazy(() => import("./Specialities"));

export default function HomePage() {

    return (
        <div className="home">
            <section className="hero">
                <Hero/>
            </section>

            <section className="announces" aria-label="Announces">
                <Suspense fallback={<div/>}>
                    <Announces/>
                </Suspense>
            </section>

            <section className="specialities" aria-label="Specialities">
                <Suspense fallback={<div/>}>
                    <Specialities/>
                </Suspense>
            </section>

            <section className="contact">
                <Suspense fallback={<div/>}>
                    <Contact/>
                </Suspense>
            </section>
        </div>
    );
}
