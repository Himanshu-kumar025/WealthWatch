import "./style.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../axiosConfig.js";
import { WEBPAGE_URL } from "../axiosConfig.js";

export default function Signup() {
    const navigate = useNavigate(); // React Router hook for navigation

    // Function to navigate back to main webpage
    const handleclick = () => {
        window.location.href = `${WEBPAGE_URL}`;
    }

    // Function to navigate to login page
    const handleAction = () => {
        navigate("/login");
    }

    // Local state variables to hold user input and feedback
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Function to handle the signup process
    const handleSignUp = async () => {
        try {
            setLoading(true);     // Start loading state
            setError("");         // Clear any previous errors

            // Send POST request to signup API
            const response = await axios.post(`${BASE_URL}/signup`, {
                username,
                email,
                password,
            }, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000 // Request times out after 5 seconds
            });

            // If signup is successful, store token and email in local storage
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem("userEmail", email);
                setSuccess("SuccessFully Signed Up"); // Show success message
                navigate("/form"); // Redirect user to form page
            }

        } catch (error) {
            setError("Please fill all the details correctly."); // Show user-friendly error message
        } finally {
            setLoading(false); // Stop loading
        }
    }

    return (
        <>
            {/* Background page container with semi-transparent overlay */}
            <div className="page" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", height: "100vh" }}>

                {/* Back button */}
                <button
                    className="text-center m-4  px-5 mb-17 py-2 font-bold font-sm text-white rounded-md hover:scale-105 cursor-pointer"
                    style={{ backgroundColor: "#023e8a" }}
                    onClick={handleclick}
                >
                    <i className="fa-solid fa-arrow-left" style={{ color: "#fff" }}></i> &nbsp; Back
                </button>

                {/* Signup form box */}
                <div className="box">

                    {/* Title button */}
                    <button className="text-center m-4 w-30 p-3 px-0 font-bold font-sm rounded-md" style={{ border: "2px solid #023e8a" }}>
                        Sign up
                    </button>

                    {/* Error and Success messages */}
                    {error && <div className="text-red-600 font-mediud">{error}</div>}
                    {success && <div className="text-green-600 font-mediud">{success}</div>}

                    {/* Input Fields */}
                    <div className="w-[90%]">

                        {/* Username input */}
                        <div className="username flex pt-5 pb-1" style={{ borderBottom: "2px solid rgba(0, 0, 0, 0.2)" }}>
                            <img src="/image/signUp-user.png" alt="signUp-user" className='w-9 h-9 p-2' />
                            <input
                                type="text"
                                id="username"
                                placeholder='Enter your username'
                                className='p-6 ml-1'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        {/* Email input */}
                        <div className="email flex pt-5 pb-1" style={{ borderBottom: "2px solid rgba(0, 0, 0, 0.2)" }}>
                            <img src="/image/signUp-email.png" alt="signUp-email" className='w-9 h-9 p-2' />
                            <input
                                type="email"
                                id="email"
                                placeholder='Enter your email'
                                className='p-6 ml-1'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password input */}
                        <div className="password flex pt-5 pb-1" style={{ borderBottom: "2px solid rgba(0, 0, 0, 0.2)" }}>
                            <img src="/image/signUp-password.png" alt="signUp-password" className='w-10 h-10 p-2' />
                            <input
                                type="password"
                                id="password"
                                placeholder='Enter your password'
                                className='p-6 ml-1'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Sign Up Button and Login Link */}
                    <div className="button w-full text-center items-center h-[30%] flex flex-col justify-between">
                        {/* Submit button */}
                        <button
                            className="text-center m-4 w-[70%] px-5 py-2 font-bold font-sm text-white hover:scale-105 cursor-pointer"
                            style={{ backgroundColor: "#023e8a", borderRadius: "45px" }}
                            onClick={handleSignUp}
                            disabled={loading}
                        >
                            Sign up
                        </button>

                        {/* Redirect to Login */}
                        <div className="p-4 w-full text-center pb-0" style={{ borderTop: "2px solid rgba(0, 0, 0, 0.1)" }}>
                            <p>
                                Already have an account? &nbsp;
                                <a href="" className='text-blue-900 font-bold' onClick={handleAction}>Login</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
