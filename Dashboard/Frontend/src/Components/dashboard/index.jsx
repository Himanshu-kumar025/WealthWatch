import { useEffect, useState } from "react";
import { CurrentTotalExpence } from "../data/CalCurrentMonthExpence.js";
import AddDailyRecord from "./AddDailyRecord.jsx";
import MonthlyChart from "./MonthlyChart.jsx";
import { useNavigate } from "react-router-dom";
import { fetchProfileFromBackend } from "../data/InputData.js";
import './style.css'

export default function Dashboard() {
    const navigate = useNavigate();

    const [isDismissed, setIsDismissed] = useState(false);
    const [Balance, setBalance] = useState(0);
    const [Spended, setSpended] = useState(0);
    const [Totalincome, setTotalincome] = useState(0);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            const budget = await CurrentTotalExpence();
            const TotalBudget = await fetchProfileFromBackend();

            setTotalincome(TotalBudget || 0);
            setSpended(budget?.Spended || 0);
            setPercentage(budget?.TotalExpence_percentage || 0);
            setBalance(budget?.TotalBudget - budget?.Spended || 0);
        };
        loadData();
    }, []);



    useEffect(() => {
        const dismissedTime = localStorage.getItem("anomalyDismissedAt");
        if (dismissedTime) {
            const now = new Date().getTime();
            const elapsed = now - parseInt(dismissedTime, 10);
            if (elapsed > 86400000) {
                setIsDismissed(false);
                localStorage.removeItem("anomalyDismissedAt");
            } else {
                setIsDismissed(true);
            }
        }
    }, []);

    const handleDismiss = () => {
        setIsDismissed(true);
        localStorage.setItem("anomalyDismissedAt", new Date().getTime().toString());
    };

    const handleClick = () => {
        navigate("/budgetRecommendation/ai");
    };

    const ProgressBar = () => {
        return (
            <div
                className="h-full bg-emerald-900 rounded-full"
                style={{ width: percentage + "%" }}
            ></div>
        );
    };

    return (
        <>
            <div className="flex flex-row gap-2 ">
                <div className="bg-[#B8D7DE8C] dashboaard-right mb-[80px] rounded-md mt-4 h-full w-[85vw] md:w-[300px] pt-6 pl-4 dashboard"
                    style={{ position: "fixed", right: 0, overflowY: "auto" }}>
                    <h1 className="text-3xl text-emerald-900 text-shadow-md font-bold text-start ml-2" style={{ marginBottom: "1rem" }}>
                        Dashboard
                    </h1>

                    <div className=" d-1 flex flex-row h-[50vh] w-[98%]   mt-2 h-fit">

                        <div className="balance-1 mr-2    flex flex-col justify-between gap-5 py-2">
                            <div className="progess-bar anomaly bg-white h-[30%] rounded-2xl px-12 py-4">
                                <div className="flex flex-row justify-between h-fit w-full my-2">
                                    <h1 className="text-[1.5rem] font-semibold">Balance</h1>
                                    <h1 className="text-[1.5rem] font-semibold">Spended</h1>
                                </div>
                                <div className="flex flex-row justify-between h-fit mb-8 w-full">
                                    <p className="text-[1rem] font-medium">&#8377;{Balance}</p>
                                    <p className="text-[1rem] font-medium">
                                        &#8377;{Spended}/{Totalincome}
                                    </p>
                                </div>
                                <div className="h-[10px] w-full bg-gray-200 my-4 mr-4 rounded-full">
                                    {ProgressBar()}
                                </div>
                            </div>

                            <div id="add-daily" className="add-daily anomaly bg-white w-[57.2vw] max-[450px]:py-[24px] p-[1.5rem]  h-fit rounded-2xl " style={{ paddingInline: "45px" }}>
                                <AddDailyRecord />
                            </div>
                        </div>

                        <div className="monthlychart  grow  flex flex-col gap-2  py-2 px-2 w-fit " >
                            <MonthlyChart />
                        </div>
                    </div>

                    <div className="anomaly flex flex-col bg-white w-[98.5%] h-fit rounded-2xl mt-4 lg:mt-4 p-[1.5rem]" style={{ paddingInline: "45px" }}>
                        <div className="w-full">
                            <h1 className="heading text-[1.4rem] font-semibold mb-5">Anomaly Detected</h1>
                        </div>
                        <div className="text-start w-full">
                            <p className="text-gray-600 ">
                                Our system analyzes your past spending habits to identify
                                significant deviations. We will alert you to expenses that are
                                higher than your average or appear to be unusual, ensuring you
                                stay informed about your financial activity.
                            </p>
                        </div>

                        {!isDismissed && percentage >= 50 && (
                            <div className={`anomaly-alert flex flex-row justify-between items-center border w-full h-fit rounded-2xl mt-4 py-2 px-4 ${percentage >= 90 ? 'border-red-700' : 'border-yellow-500'
                                }`}>
                                <div className="flex flex-row gap-4 items-center">
                                    <div className="flex flex-row items-center">
                                        <div className={`text-center rounded-full h-[30px] w-[30px] ${percentage >= 90 ? 'bg-red-700' : 'bg-yellow-500'
                                            } text-white font-bold text-xl`}>
                                            !
                                        </div>
                                        <h1 className={`font-medium ml-[10px] ${percentage >= 90 ? 'text-red-700' : 'text-yellow-600'
                                            }`}>
                                            {
                                                percentage >= 90
                                                    ? "Alert! You're nearing your budget limit."
                                                    : "Caution: You've spent over half your budget."
                                            }
                                        </h1>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={handleDismiss}
                                        className="bg-[#2D5359] text-white py-2 px-4 rounded-2xl"
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>

                    <div className="budget flex flex-col gap-2 bg-white w-[98.5%] h-fit rounded-2xl mt-4 mb-8 p-[1.5rem]" style={{ paddingInline: "45px", marginBottom: "220px" }}>
                        <div className="w-full flex flex-row gap-4">
                            <h1 className="text-[1.4rem] font-semibold mb-5">Budget Recommendations</h1>
                            <div className="flex flex-row justify-between gap-1 items-center px-3 h-fit w-fit bg-black rounded-md">
                                <p className="text-blue-600 text-2xl">&#9733;</p>
                                <h1 className="text-white font-bold">AI</h1>
                            </div>
                        </div>

                        <div className="budget-text flex justify-between gap-8">
                            <p className="text-gray-600 w-fit">
                                Ask AI for smart investment tips, savings strategies, or
                                personalized budgeting advice in simple language!
                            </p>
                            <button
                                className="bg-[#2D5359] text-white w-fit text-[19px] font-medium rounded-lg px-5 py-1 cursor-pointer"
                                onClick={handleClick} style={{ alignSelf: "end" }}
                            >
                                Ask AI &nbsp;{" "}
                                <i className="fa-solid fa-arrow-right" style={{ color: "#fff" }}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
