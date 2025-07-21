import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CurrentHistory from "./Monthlylist/CurrentHistory";
import SecondHistory from "./Monthlylist/SecondHistory";
import ThirdHistory from "./Monthlylist/ThirdHistory";
import ForthHistory from "./Monthlylist/ForthHistory";
import FifthHistory from "./Monthlylist/FifthHistory";
import SixthHistory from "./Monthlylist/SixthHistory";
import { fetchMonthlyData } from "../data/InputData.js";

export default function HistoryPage() {

    const location = useLocation();
    const navigate = useNavigate();

    const [MonthName, setMonthName] = useState([]);
    const [category, setCategory] = useState("");

    useEffect(() => {
        const loadAllData = async () => {
            const promises = Array.from({ length: 6 }, (_, i) => fetchMonthlyData(i));
            const results = await Promise.all(promises);
            const names = results.map((data) => data.monthName.toUpperCase());
            setMonthName(names);


            if (location.pathname === "/historys" && names[0]) {
                setCategory(names[0]);
                navigate(`/historys/${names[0]}`);
            }
        };

        loadAllData();
    }, [location.pathname, navigate]);

    const handleChange = (e) => {
        const selectedMonth = e.target.value;
        setCategory(selectedMonth);
        navigate(`/historys/${selectedMonth}`);
    };

    // Get the selected month from the URL path
    const currentMonth = decodeURIComponent(location.pathname.replace("/historys/", ""));
    const Monthnames = currentMonth.toUpperCase();
    return (
        <div className="flex flex-row">
            <div className="history bg-[#B8D7DE8C] dashboaard-right mb-[80px] rounded-md mt-4 h-full w-[85vw] md:w-[300px] pt-6 px-5 dashboard"
                style={{ position: "fixed", right: 0, overflowY: "auto" }}>
                <h1 className="text-3xl text-emerald-900 text-shadow-md font-bold text-start ml-2" style={{marginBottom: "0.3rem"}}>History</h1>

                <select
                    id="category"
                    name="category"
                    value={Monthnames}
                    onChange={handleChange}
                    className="bg-gray-300 text-gray-500 rounded-md w-[8rem] h-[40px] p-2 my-4"
                    style={{ border: "none", outline: "none" }}
                >
                    {[...MonthName].reverse().map((name, index) => (
                        <option key={index} value={name}>
                            {name}
                        </option>
                    ))}
                </select>


                {/* Conditional Component Rendering */}
                {Monthnames === MonthName[0] && <SixthHistory />}
                {Monthnames === MonthName[1] && <FifthHistory />}
                {Monthnames === MonthName[2] && <ForthHistory />}
                {Monthnames === MonthName[3] && <ThirdHistory />}
                {Monthnames === MonthName[4] && <SecondHistory />}
                {Monthnames === MonthName[5] && <CurrentHistory />}
            </div>
        </div>
    );
}
