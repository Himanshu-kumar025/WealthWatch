import './style.css'
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../../../backend/axiosConfig.js";
import { CurrentTotalExpence } from "../data/CalCurrentMonthExpence.js";

export default function GoalsPage() {
    const [GoalValue, setGoalValue] = useState({});
    const [savedGoals, setSavedGoals] = useState({});
    const [backendGoalsData, setBackendGoalsData] = useState({});
    const [TotalExpences, setTotalExpences] = useState(0);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const userToken = localStorage.getItem("token");

    const initialGoals = [
        { name: "Food" },
        { name: "Housing" },
        { name: "Personal" },
        { name: "Saving" },
        { name: "Transportation" },
    ];

    // Fetch average monthly expenses
    useEffect(() => {
        const loadData = async () => {
            const budget = await CurrentTotalExpence();
            setTotalExpences(budget?.TotalBudget);
        };

        loadData();
    }, []);

    // Fetch user goals
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            fetchGoalsFromBackend();
        } else {
            alert("Please first Login .");
        }
    });

    // Get Goals from backend
    const fetchGoalsFromBackend = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getGoals`, {
                headers: { Authorization: localStorage.getItem("token") },
            });

            if (response.data) {
                // setBackendGoalsData(response.data);
                const formattedData = {};
                Object.keys(response.data).forEach(key => {
                    // Capitalize first letter to match initialGoals
                    const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
                    formattedData[formattedKey] = response.data[key];
                });
                setBackendGoalsData(formattedData);
                const saved = {};
                initialGoals.forEach(item => {
                    if (response.data[item.name]) {
                        saved[item.name] = true;
                    }
                });
                setSavedGoals(saved);
            }
        } catch (error) {
            console.error("Error while fetching user profile:", error.message);
        }
    };

    const handleInput = (name, value) => {
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue) && value !== "") return; // prevent invalid numbers

        let total = 0;

        initialGoals.forEach(goal => {
            if (goal.name === name) {
                total += parsedValue || 0;  // include current input
            } else if (backendGoalsData[goal.name]) {
                total += parseFloat(backendGoalsData[goal.name]) || 0;
            } else if (GoalValue[goal.name]) {
                total += parseFloat(GoalValue[goal.name]) || 0;
            }
        });

        if (total > TotalExpences) {
            alert(`Total of all goals cannot exceed ₹${TotalExpences}. Current total would be ₹${total}`);
            return;  // prevent updating state
        }

        setGoalValue(prev => ({
            ...prev,
            [name]: value,
        }));
    };



    const handleSave = async (name) => {
        const value = parseFloat(GoalValue[name]);
        if (isNaN(value)) {
            console.error("Invalid input for", name);
            return;
        }

        // Combine backendGoalsData and unsaved GoalValues
        let total = 0;

        initialGoals.forEach(goal => {
            if (goal.name === name) {
                total += value;  // current input value
            } else if (backendGoalsData[goal.name]) {
                total += parseFloat(backendGoalsData[goal.name]) || 0;
            } else if (GoalValue[goal.name]) {
                total += parseFloat(GoalValue[goal.name]) || 0;
            }
        });

        if (total > TotalExpences) {
            alert(`Total of all goals cannot exceed ₹${TotalExpences}. Currently entered total would be ₹${total}`);
            return;
        }

        try {
            const res = await axios.post(
               ` ${ BASE_URL }/goals`,
                { name, value },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": userToken,
                    },
                }
            );

            setSavedGoals(prev => ({ ...prev, [name]: true }));
            setBackendGoalsData(prev => ({ ...prev, [name]: value }));
            setSuccess(true);
            setError(false);
        } catch (err) {
            console.error("Error saving goal:", err);
        }
    };


    const handleDelete = async (name) => {
        try {
            const res = await axios.post(
                `${BASE_URL}/goals`,
                { name, value: 0 },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": userToken,
                    },
                }
            );

            setSavedGoals(prev => {
                const updated = { ...prev };
                delete updated[name];
                return updated;
            });

            setBackendGoalsData(prev => {
                const updated = { ...prev };
                delete updated[name.toLowerCase()];
                return updated;
            });



            setGoalValue(prev => {
                const updated = { ...prev };
                delete updated[name];
                return updated;
            });

            setSuccess(false);
            setError(true);
        } catch (err) {
            console.error("Error deleting goal:", err);
        }
    };


    const handleSuccess = () => setSuccess(false);
    const handleError = () => setError(false);

    return (
        <div className="flex">
            <div className="bg-[#B8D7DE8C] dashboaard-right mb-[80px] rounded-md mt-4 h-full w-[85vw] md:w-[300px] pt-6 px-5 dashboard"
                style={{ position: "fixed", right: 0, overflowY: "auto" }}>
                <div className="flex flex-col ">
                    <h1 className="text-3xl text-emerald-900 text-shadow-md font-bold text-start ml-2" style={{ marginBottom: "0.5rem" }}>Goals</h1>
                    <p className="ml-2 mb-2">Set your goals for different categories.</p>
                </div>

                {success && (
                    <div className="flex flex-row m-auto justify-between w-full"
                        style={{
                            backgroundColor: "#d4edda",
                            border: "1px solid #c3e6cb",
                            color: "#155724",
                            padding: "10px",
                            borderRadius: "5px",
                            marginTop: "10px"
                        }}>
                        <div>Goal Successfully Recorded!</div>
                        <button onClick={handleSuccess}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                )}

                {error && (
                    <div className="flex flex-row m-auto justify-between w-full"
                        style={{
                            backgroundColor: "#efb0abff",
                            border: "1px solid #d48377ff",
                            color: "#c10000ff",
                            padding: "10px",
                            borderRadius: "5px",
                            marginTop: "10px"
                        }}>
                        <div>Set Goal Deleted!</div>
                        <button onClick={handleError}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                )}

                <section className="mt-6 flex flex-col items-center justify-center gap-6 w-full max-[460px]:mb-[200px]">
                    {initialGoals.map((item) => (
                        <div
                            key={item.name}
                            className="goal-1 flex flex-row justify-between items-center bg-white p-4 px-8 rounded-2xl w-full"
                        >
                            <p className="goal-text text-2xl pt-1 font-medium">{item.name}</p>
                            <div className="flex items-center mt-2">
                                <span>&#8377;</span>
                                {savedGoals[item.name] ? (
                                    <div className="ml-2">
                                        {/* {backendGoalsData[item.name.toLowerCase()] ?? GoalValue[item.name] ?? "N/A"} */}
                                        {backendGoalsData[item.name] ?? GoalValue[item.name] ?? "N/A"}

                                    </div>
                                ) : (
                                    <input
                                        type="number"
                                        placeholder="Enter Amount"
                                        className="pl-2 sm:pl-5 py-2 w-40 max rounded-2xl ml-2 max-[460px]:w-[10rem]"
                                        style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                                        value={GoalValue[item.name] ?? ""}
                                        onChange={(e) => handleInput(item.name, e.target.value)}
                                    />
                                )}

                                {!savedGoals[item.name] && (
                                    <button
                                        className="text-white px-4 sm:px-8 py-2 rounded-3xl ml-6 cursor-pointer"
                                        style={{ backgroundColor: "rgba(45, 83, 89, 1)" }}
                                        onClick={() => handleSave(item.name)}
                                    >
                                        Save
                                    </button>
                                )}

                                {savedGoals[item.name] && (
                                    <button className="ml-3 cursor-pointer" onClick={() => handleDelete(item.name)}>
                                        <i className="fa-solid fa-trash text-[#2D5359]"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}