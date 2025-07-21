import "./style.css";
import Testimonials from "./testimonial.jsx";
import Hero from "./hero.jsx";
import Record from "./record.jsx";
import Card from "./card.jsx";
import Team from "./team.jsx";
import Vision from "./vision.jsx";

export default function AboutUs() {

    return (
        <>
            <Hero />
            <Record />
            <Card />
            <Vision />
            <Team />
            <Testimonials />
        </>
    );
};
