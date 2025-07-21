import "./record.css";
import { useEffect, useState, useRef } from "react";

export default function Record() {

    const [activated, setActivated] = useState(false);
    const countersRef = useRef();

    const countersData = [
        { image: "/image/record1.png", label: "Happy Clients", count: 247, suffix: "k+" },
        { image: "/image/record2.png", label: "Years of Expereince", count: 4, suffix: "+" },
        { image: "/image/record3.png", label: "Accuracy Rate", count: 95, suffix: "%" },
        { image: "/image/record4.png", label: "Reviews of Users", count: 4, suffix: ".5☆" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const container = countersRef.current;

            if (container) {
                const containerTop = container.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (containerTop < windowHeight - 200 && !activated) {
                    activateCounters();
                    setActivated(true);
                }

                if (window.scrollY === 0 && activated) {
                    resetCounters();
                    setActivated(false);
                }
            }
        };

        // window.addEventListener("scroll", handleScroll);
        return () => {
            // window.removeEventListener("scroll", handleScroll);
        };

    }, [activated]);

    const activateCounters = () => {
        const counters = document.querySelectorAll(".counter span");

        counters.forEach((counter) => {
            const target = parseInt(counter.dataset.count, 10);
            let count = 0;
            const increment = Math.ceil(target / 200);

            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    if (count > target) count = target;
                    counter.innerText = count;
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    const resetCounters = () => {
        const counters = document.querySelectorAll(".counter span");
        counters.forEach((counter) => {
            counter.innerText = 0;
        });
    };

    return (
        <>
            <div ref={countersRef} className="counters">

                {countersData.map((item, index) => (
                    <div key={index} className="counter">
                        <img src={item.image} alt={item.label} className="counter-image shadow-xl/30 " />

                        <h1>
                            <span data-count={item.count}>0</span>
                            {item.suffix || ""}
                        </h1>

                        <h3>{item.label}</h3>
                    </div>
                ))}

            </div>
        </>
    );
}