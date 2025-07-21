import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItem } from "./sidebar.js";

export default function Sidebar() {

    const location = useLocation();
    const [Active, setActive] = useState("");

    useEffect(() => {
        // Find the nav item whose path matches the current URL
        const currItem = navItem.find((item) => item.href === location.pathname);

        // Set active state if match found, otherwise reset
        if (currItem) {
            setActive(currItem.name);
        } else {
            setActive("");
        }
    }, [location.pathname]); // Re-run effect whenever route changes

    return (
        <>
            {/* Sidebar container */}
            <div className="flex flex-col justify-center items-center text-center h-[45%] space-y-1 text-[20px] capitalize">
                {/* Render each sidebar nav item */}
                {navItem.map((item) => (
                    <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setActive(item.name)}
                        className={`block w-[150px] h-fit rounded-full m-auto ${
                            // Apply active styles if item is active or matches dynamic route
                            (Active === item.name && item.href === location.pathname) ||
                                (item.href.startsWith("/historys") && location.pathname.startsWith("/historys"))
                                ? "bg-white text-[#2D5359] font-bold py-2 w-[140px]" // Active style
                                : "font-normal" // Default style
                            }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </>
    );
}
