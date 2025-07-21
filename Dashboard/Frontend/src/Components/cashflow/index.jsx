import { useNavigate } from "react-router-dom";
import { MonthData } from "./cashflow"
import { Link } from "react-router-dom"
import SixMonth from "./SixMonth.jsx";
import CompareTwoMonth from "./CompareTwoMonth.jsx";
import CurrentMonth from "./MonthList/CurrentMonth.jsx";
import NotFound from "../NotFound.jsx";
import './style.css'
export default function CashflowPage() {


    const navigate = useNavigate();

    const handleClick = (e) => {
        const value = e.target.value;
        navigate(`/cashflow${value}`)
    }


    return (
        <>
            {/* Main Container */}
            <div className='flex flex-row '>

                {/* Cashflow Container */}
                <div className="bg-[#B8D7DE8C] dashboaard-right mb-[80px] rounded-md mt-4 h-full w-[85vw] md:w-[300px] pt-6 pl-4 dashboard"
                    style={{ position: "fixed", right: 0, overflowY: "auto" }} >

                    {/* Heading */}
                    <div>

                        <h1 className="text-3xl text-emerald-900 text-shadow-md font-bold text-start ml-2" style={{ marginBottom: "1.5rem" }}>Cashflow</h1>

                    </div>

                    {/* Button for changing data list */}
                    <div className="cashflow-head text-center flex flex-row  gap-4 bg-white w-full h-fit  rounded-2xl px-8 py-4">
                        {MonthData.map((item) => (

                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={handleClick}
                                className={`cashflow-head-1 rounded-full px-5 py-1 border ${location.pathname === item.href ? "bg-gray-300" : ""}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {location.pathname === "/cashflow/thisMonth" || location.pathname === "/cashflow" ? (
                        <>
                            <CurrentMonth />
                        </>
                    ) : ""}

                    {location.pathname === "/cashflow/SixMonth" && (
                        <>
                            <SixMonth />
                        </>
                    )}

                    {location.pathname === "/cashflow/CompareLastMonth" && (
                        <>
                            <CompareTwoMonth />
                        </>
                    )}

                  

                </div>
            </div>
        </>
    )
}