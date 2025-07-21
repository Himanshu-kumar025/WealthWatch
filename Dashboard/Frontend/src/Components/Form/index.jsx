import { useState } from "react";
import "./style.css";
import "../SignUp/style.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from "../../../../backend/axiosConfig";

export default function Form() {
    const navigate = useNavigate();

    // Navigate back to signup page
    const handleclick = () => {
        navigate("/signup");
    };

    // Form state management
    const [name, setName] = useState("");
    const [profession, setProfession] = useState("");
    const [income, setIncome] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Handle form submission and navigate to dashboard
    const handleDashboard = async () => {
        try {
            setSuccess("");
            const email = localStorage.getItem("userEmail"); // Get email from local storage
            const token = localStorage.getItem("token");

            if (!email) {
                setError("User not found. Please sign up again.");
                return;
            }

            // Send user details to backend
            const respond = await axios.post(`${BASE_URL}/form`,
                {
                    name,
                    profession,
                    income,
                    email
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token, // Attach the token to the Authorization header
                    },
                    timeout: 5000,
                }
            );

            // If submission is successful, navigate to dashboard
            if (respond.data) {
                setSuccess("SuccessFully Signed Up");
                navigate(`/dashboard`);
            }
        } catch (error) {
            setError("Please fill all the details correctly.");

        }
    };

    return (
        <>
            <div className="page">
                {/* Back button */}
                <button className="text-center m-4  px-5 py-2 mb-17 font-bold font-sm text-white rounded-md hover:scale-105 cursor-pointer"
                    style={{ backgroundColor: "#2D5359" }} onClick={handleclick}>
                    <i className="fa-solid fa-arrow-left" style={{ color: "#fff" }}></i> &nbsp;
                    Back
                </button>

                {/* Form box */}
                <div className="box m-120">
                    <button className="text-center m-4 w-50 p-3 px-0 font-bold font-lg rounded-md" style={{ border: "3px solid #2D5359" }}>
                        User Details
                    </button>

                    {/* Display error or success messages */}
                    {error && <div className="text-red-600 font-mediud">{error}</div>}
                    {success && <div className="text-green-600 font-mediud">{success}</div>}

                    {/* Input fields */}
                    <div className="form">
                        <div className="input flex p-3 rounded-xl my-7">
                            <input type="text" id="name" placeholder="Enter your name" className='p-20'
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="input flex p-3 rounded-xl my-7">
                            <input type="text" id="profession" placeholder="Enter your profession" className='p-20'
                                onChange={(e) => setProfession(e.target.value)} />
                        </div>

                        <div className="input flex p-3 rounded-xl my-7">
                            <input type="number" id="income" placeholder="Enter your income" className='p-20'
                                onChange={(e) => setIncome(e.target.value)} />
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className="w-full text-center items-center h-[20%]">
                        <button id="form-btn" className="m-4 w-[70%] px-5 py-2 font-bold font-sm text-white hover:scale-105 cursor-pointer"
                            style={{ backgroundColor: "#2D5359", borderRadius: "45px" }}
                            onClick={handleDashboard}>
                            Go to Dashboard
                            &nbsp; &nbsp;
                            <i className="fa-solid fa-arrow-right" style={{ color: "#fff" }}></i> &nbsp;
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
