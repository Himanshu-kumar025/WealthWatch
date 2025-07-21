import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../axiosConfig.js";
import { CurrentTotalExpence } from "../data/CalCurrentMonthExpence.js";

export default function ProfilePage() {
    // States for user profile
    const [profileImage, setProfileImage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profession, setProfession] = useState("");
    const [income, setIncome] = useState("");
    const [AverageExpences, setAverageExpences] = useState("");

    // States for UI behavior
    const [isModelOpen, SetIsModelOpen] = useState(false);
    const [Error, setError] = useState(false);
    const [FileError, setFileError] = useState(false);
    const [success, setSuccess] = useState(false);

    // Fetch average monthly expenses
    useEffect(() => {
        const loadData = async () => {
            const CurrentData = await CurrentTotalExpence();
            setAverageExpences(CurrentData?.AverageExpence || 0);
        };
        loadData();
    }, []);

    // Fetch user profile on component mount
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            fetchProfileFromBackend();
        } else {
            alert("Please first Login .");
        }
    }, []);

    // Get profile from backend
    const fetchProfileFromBackend = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getUserProfile`, {
                headers: { Authorization: localStorage.getItem("token") },
            });

            if (response.data?.formData) {
                const { profilePicture, profession, income, name } = response.data.formData;
                setProfileImage(profilePicture);
                setProfession(profession);
                setIncome(income);
                setName(name);
                setEmail(response.data.userData.email);
            }
        } catch (error) {
            console.error("Error while fetching user profile:", error.message);
        }
    };

    // Save changes to profile
    const handleSave = () => {
        updateProfileData();
        SetIsModelOpen(false);
    };

    // Upload new profile picture
    const updateProfilePicture = async (file) => {
        try {
            const formData = new FormData();
            formData.append("profileImage", file);

            const response = await axios.post(`${BASE_URL}/updateProfilePicture`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': localStorage.getItem("token"),
                },
            });

            if (!response.data) {
                setError(true);
                setTimeout(() => setError(false), 5000);
                return;
            }

            if (response.data?.message === "Profile Picture Updated") {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 5000);

                const userRes = await axios.get(`${BASE_URL}/getUserProfile`, {
                    headers: { Authorization: localStorage.getItem("token") },
                });

                setProfileImage(userRes.data.formData?.profilePicture);
            }
        } catch (error) {
            setFileError(true);
            setTimeout(() => setFileError(false), 5000);
        }
    };

    // Send updated profession & income to backend
    const updateProfileData = async () => {
        const userToken = localStorage.getItem("token");

        if (!userToken) {
           alert("Firstly Please Login. ")
            return;
        }

        try {
            await axios.post(`${BASE_URL}/updateProfileData`, {
                profession,
                income,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": userToken,
                },
            });

            alert("Profile Updated Successfully");
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
    };

    // Alert dismissal handlers
    const handleSuccess = () => setSuccess(false);
    const handleError = () => setError(false);
    const handleFileError = () => setFileError(false);

    return (
        <div className='flex flex-row'>
            {/* Profile Container */}
            

                <div className="profile bg-[#B8D7DE8C] dashboaard-right mb-[80px] rounded-md mt-4 h-full w-[85vw] md:w-[300px] pt-6 px-4 dashboard"
    style={{ position: "fixed", right: 0, overflowY: "auto" }}>
                    <h1 className="profile-text text-3xl text-emerald-900 text-shadow-md font-bold text-start ml-2" style={{marginBottom: "1.3rem"}}>My Profile</h1>

                {/* Success Alert */}
                {success && (
                    <div className="flex justify-between w-[90%] mx-auto bg-green-100 text-green-800 border border-green-300 rounded p-2">
                        <div>Profile Picture Successfully Recorded!</div>
                        <button onClick={handleSuccess}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                )}

                {/* Error: File too big */}
                {Error && (
                    <div className="flex justify-between w-full mx-auto bg-red-200 text-red-800 border border-red-400 rounded p-2 mt-2">
                        <div>Your image must be larger than 4MB.</div>
                        <button onClick={handleError}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                )}

                {/* Error: Not an image file */}
                {FileError && (
                    <div className="flex justify-between w-[90%] mx-auto bg-red-200 text-red-800 border border-red-400 rounded p-2 mt-2 mb-2">
                        <div>Only image files are allowed.</div>
                        <button onClick={handleFileError}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                )}

                {/* Profile Image + Info */}
                <div className="flex flex-col items-center justify-center bg-white h-[37vh] rounded-2xl">
                    <span className="flex flex-col items-center gap-2">
                        {profileImage && (
                            <img
                                src={profileImage ? `${BASE_URL}/uploads/${profileImage}` : `${BASE_URL}/uploads/profile.png`}
                                alt="Profile"
                                className="rounded-full"
                                style={{ width: "170px", height: "170px" }}
                            />
                        )}
                        <label className="cursor-pointer" style={{position: "relative", top: "-40px", left: "62px"}}>
                            <i className="fa-solid fa-circle-plus fa-2xl" style={{ color: "#2D5359" }}></i>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => updateProfilePicture(e.target.files[0])}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </span>

                    <div className="text-center">
                        <p className="text-2xl">{name}</p>
                        <p style={{ color: "rgb(50, 47, 47)" }}>{email}</p>
                    </div>
                </div>

                {/* Profession Field */}
                <div className="goal-1 bg-white p-4 px-10 mb-3 rounded-2xl flex items-center justify-between my-5"
                        >
                        <p className="text-2xl pt-1 max-[460px]:text-[20px] font-medium">Profession</p>
                    {isModelOpen ? (
                        <input
                            type="text"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            className="w-[30%] h-[30px] bg-gray-200 rounded-md p-4 max-[450px]:w-[50%]"
                            
                        />
                    ) : (
                        <p style={{ color: "rgb(50, 47, 47)" }}>{profession}</p>
                    )}
                </div>

                {/* Income Field */}
            
                    <div className="goal-1 bg-white p-4 px-8 mb-3 rounded-2xl flex items-center align-middle justify-between my-5">
                        <p className="text-2xl max-[460px]:text-[20px] pt-1 font-medium">Income</p>
                    {isModelOpen ? (
                        <input
                            type="number"
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}

                                className="w-[30%] h-[30px] bg-gray-200 rounded-md p-4 max-[450px]:w-[50%]"
                        />
                    ) : (
                        <p style={{ color: "rgb(50, 47, 47)" }}>&#8377; {income}</p>
                    )}
                </div>

                {/* Average Expenses */}
                <div className="goal-1 bg-white p-4 px-2 sm:px-8 mx-auto mb-7 rounded-2xl flex items-center justify-between my-5">
                        <p className="text-2xl max-[460px]:text-[20px] pt-1 font-medium">Average Expenses</p>
                    <p style={{ color: "rgb(50, 47, 47)" }}>&#8377; {AverageExpences}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 ml-16 mb-10">
                    <button
                        className="bg-[#2D5359] text-white text-lg font-medium rounded-lg px-5 py-1 mb-[200px]"
                        onClick={() => SetIsModelOpen(true)}
                    >
                        Edit
                    </button>

                    {isModelOpen && (
                        <button
                            className="bg-[#2D5359] text-white text-lg font-medium rounded-lg px-5 py-1 mb-[200px]"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
