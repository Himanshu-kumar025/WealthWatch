import "./style.css";
import { BASE_URL } from "../../../../backend/axiosConfig.js";
import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "./calendar";

export default function Navbar() {

    // State to hold user profile image
    const [profileImage, setProfileImage] = useState("");

    const [name, setName] = useState("");
    const [show, setShow] = useState(false);

    // Show the calendar popup
    const handleClick = () => {
        setShow(true);
    };

    // Hide the calendar popup
    const handleCross = () => {
        setShow(false);
    };

    // On component mount, check for token and fetch user profile
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            fetchGoalsFromBackend(); // Fetch user info if token exists
        } else {
            console.error("No user token found.");
        }
    }, []);

    // Fetch user profile data from backend
    const fetchGoalsFromBackend = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getUserProfile`, {
                headers: {
                    Authorization: localStorage.getItem("token"), // Pass token in headers
                },
            });

            // Update UI with fetched profile data
            if (response.data?.formData) {
                setProfileImage(response.data.formData.profilePicture);
                setName(response.data.formData.name);
            }

        } catch (error) {
            console.error("Error while fetching user profile:", error.message);
        }
    };

    return (
        <>
            {/* Main navigation bar container */}
            <nav id="navbar" className="sticky top-0 px-4 max-[450px]:px-0 py-2 shadow-md z-50 align-middle" style={{ backgroundColor: "rgb(184, 215, 222)" }}>
                {/* Inner content container */}
                <div className="max-w-7xl mx-auto px-2 flex items-center align-middle justify-between">

                    {/* Left: Logo */}
                     <div id="logo">
                        <img src="/image/logo.png" alt="logo_image" className="h-10 w-auto"/>
                    </div>

                    {/* Calendar popup */}
                    {show &&
                        <div
                            className="calendar bg-white p-5 rounded-2xl"
                            style={{
                                position: "fixed",
                                top: "100px",
                                right: "30px",
                                border: "3px solid rgb(184, 215, 222)",
                                boxShadow: "1px 1px 16px 4px rgba(192, 192, 192, 0.2)",
                            }}
                        >
                            {/* Close button for calendar */}
                            <i
                                className=" fa-solid fa-xmark fa-xl mb-4 cursor-pointer"
                                onClick={handleCross}
                                style={{ color: "#2D5359" }}
                            ></i>

                            {/* Embedded calendar component */}
                            <Calendar />
                        </div>
                    }

                    {/* Right side: Calendar button, profile image, user name */}
                    <div className="flex flex-row align-middle items-center justify-center gap-4">

                        {/* Calendar toggle icon */}
                        <div className="block px-4 h-fit rounded-full m-auto cursor-pointer max-[500px]:px-0 max-[450px]:mr-2" onClick={handleClick}>
                            <i className="fa-solid fa-calendar-days"></i>
                        </div>

                        {/* User profile image */}
                        <div className="h-[30px] w-[30px] rounded-full">
                            <img
                                src={
                                    profileImage
                                        ? `${BASE_URL}/uploads/${profileImage}`
                                        : `${BASE_URL}/uploads/profile.png`
                                }
                                alt="ProfileImage"
                                style={{
                                    borderRadius: "50%",
                                    width: "35px",
                                    height: "30px"
                                }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `${BASE_URL}/uploads/profile.png`;
                                }}
                            />
                        </div>

                        {/* Username with link to profile page */}
                        <div>
                            <a href="/profile">{name}</a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
