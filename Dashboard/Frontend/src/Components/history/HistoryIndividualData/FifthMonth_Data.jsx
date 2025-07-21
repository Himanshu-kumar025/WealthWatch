import { FifthFoodExpence, FifthHousingExpence, FifthPersonalExpence, FifthSavingExpence, FifthTransportExpence } from "../../data/CalFifthMonthExpence.js";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../../backend/axiosConfig.js";

export default function FifthtHistoryIndividual() {
    const navigate = useNavigate();
    const location = useLocation();

    // State for each expense category
    const [Foodlist, setFoodlist] = useState([]);
    const [TransportListing, setTransportListing] = useState([]);
    const [PersonalListing, setPersonalListing] = useState([]);
    const [SavingListing, setSavingListing] = useState([]);
    const [HousingListing, setHousingListing] = useState([]);
    const [error, setError] = useState(false);
   

    // Fetch current month’s data on mount or when refreshKey changes
    useEffect(() => {
        const loadData = async () => {
            const food = await FifthFoodExpence();
            const transport = await FifthTransportExpence();
            const personal = await FifthPersonalExpence();
            const saving = await FifthSavingExpence();
            const housing = await FifthHousingExpence();

            setFoodlist(food?.Foodlist || []);
            setTransportListing(transport?.TransportListing || []);
            setPersonalListing(personal?.PersonalListing || []);
            setSavingListing(saving?.SavingListing || []);
            setHousingListing(housing?.HousingListing || []);
        };

        loadData();
    });

 // Extract category from the pathname
    const pathParts = location.pathname.split("/");
    const basePath = `/${pathParts[1]}/${pathParts[2]}`;
    const name = location.pathname.replace(`${basePath}/`, "");
    const category = name.charAt(0).toLowerCase() + name.slice(1);

    // Navigate back to the monthly history overview
    const handleBack = () => {
        if (pathParts.length >= 4) {
           const basePath = `/${pathParts[1]}/${pathParts[2]}`;
            navigate(basePath);
        }
    };

    const handleError = () => {
        setError(false);
    }
   

    // Helper to render list section
    const renderListSection = (list) =>
        list.map((item, index) => (
            <div
                key={index}
                className="flex flex-row justify-between mt-4 border-b pt-4 pb-2 pl-2"
            >
                <div className="flex flex-row gap-2">
                    <button className="text-xl font-medium">{item.name}</button>
                    <p className="text-[12px] mt-2 font-medium text-gray-800">
                        {item.percentage.toFixed(1)}%
                    </p>
                </div>
                <div className="flex flex-row gap-2">
                    <p className="text-[15px] mt-1">- &nbsp; ₹{item.value}</p>
                   
                     
                </div>
            </div>
        ));

    // Determine which category list to render
    const getListByPath = () => {
        if (location.pathname === `${basePath}/Food`) return renderListSection(Foodlist);
        if (location.pathname === `${basePath}/Transport`) return renderListSection(TransportListing);
        if (location.pathname === `${basePath}/Housing`) return renderListSection(HousingListing);
        if (location.pathname === `${basePath}/Saving`) return renderListSection(SavingListing);
        if (location.pathname === `${basePath}/PersonalExpence`) return renderListSection(PersonalListing);
        return <p className="mt-4 text-gray-600">No data found.</p>;
    };

    return (
        <div className="flex flex-row">
            {/* Main Panel */}
            <div className="history-individual bg-[#B8D7DE8C] rounded-md mt-4 ml-64 h-[100vh] w-[60vw] grow px-12 py-8">
                {/* Back Button */}
                <div className="mb-8">
                    <button
                        className="bg-[#2D5359] text-white text-[20px] font-medium rounded-lg px-5 py-1"
                        onClick={handleBack}
                    >
                        <i className="fa-solid fa-arrow-left"></i> &nbsp;Back
                    </button>
                </div>

                {/* Expense Section */}
                <div className="history-individual-1 bg-white w-full h-fit rounded-2xl mt-2 px-12 py-8">
                    <div className="font-medium text-[25px]">
                        <h1>{name}</h1>
                    </div>


                    {/* Error Message */}
                    {error && <div className="flex flex-row m-auto justify-between w-full" style={{
                        backgroundColor: "#efb0abff",
                        border: "1px solid #d48377ff",
                        color: "#c10000ff",
                        padding: "10px",
                        borderRadius: "5px",
                        marginTop: "10px"
                    }}>
                        <div> Failed to delete . Please try again</div>

                        <button onClick={handleError}><i className="fa-solid fa-xmark"></i></button>
                    </div>}

                    {/* Render dynamic list based on route */}
                    {getListByPath()}
                </div>
            </div>
        </div>
    );
}
