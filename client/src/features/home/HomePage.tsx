import { lazy, Suspense } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import Hero from "./Hero";
import "./HomePage.scss";

const Announces = lazy(() => import("./Announces"));
const Specialties = lazy(() => import("./Specialties"));
const Contact = lazy(() => import("./Contact"));


export default function HomePage() {

    return (
        <div className="home">
            <section className="hero">
                <Hero />
            </section>

            <section aria-label="Announces">
                <Suspense fallback={<LoadingComponent />}>
                    <Announces />
                </Suspense>
            </section>

            <section id="menu" aria-label="Specialties">
                <Suspense fallback={<LoadingComponent />}>
                    <Specialties />
                </Suspense>
            </section>

            <section className="contact">
                <Suspense fallback={<LoadingComponent />}>
                    <Contact />
                </Suspense>
            </section>
        </div>
    );
}
