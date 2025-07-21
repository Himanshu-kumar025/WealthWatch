import { SixthFoodExpence, SixthHousingExpence, SixthPersonalExpence, SixthSavingExpence, SixthTransportExpence } from "../../data/CalSixthMonthExpence";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Main component for displaying individual expense data
export default function SixthIndividualData(urlId) {
    const navigate = useNavigate();

    // State declarations for each expense category
    const [Foodlist, setFoodlist] = useState([]);
    const [TransportListing, setTransportListing] = useState([]);
    const [PersonalListing, setPersonalListing] = useState([]);
    const [SavingListing, setSavingListing] = useState([]);
    const [HousingListing, setHousingListing] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0); // Trigger to reload data

    // Fetch data when component mounts or refreshKey changes
    useEffect(() => {
        const loadData = async () => {
            const food = await SixthFoodExpence;
            const transport = await SixthTransportExpence();
            const personal = await SixthPersonalExpence();
            const saving = await SixthSavingExpence();
            const housing = await SixthHousingExpence();

            // Set state with fallback to empty array in case of undefined
            setFoodlist(food?.Foodlist || []);
            setTransportListing(transport?.TransportListing || []);
            setPersonalListing(personal?.PersonalListing || []);
            setSavingListing(saving?.SavingListing || []);
            setHousingListing(housing?.HousingListing || []);
        };

        loadData();
    }, [refreshKey]);

    // Parse current URL path to get category (e.g., "Food")
    const parts = location.pathname.split("/");
    const basePath = `/${parts[1]}/${parts[2]}/${parts[3]}`; // Example: "/cashflow/SixMonth/JULY"
    const name = parts[4]; // Example: "Food"

    // Navigate back to the parent route
    const handleBack = () => {
        if (parts.length >= 5) {
            const backPath = parts.slice(0, -1).join("/");
            navigate(backPath);
        }
    };

    return (
        <>
            {/* Main Container */}
            <div className='flex flex-row'>
                {/* Inner Content */}
                <div className="c-individual-data bg-[#B8D7DE8C] rounded-md mt-4 ml-64 h-[100vh] w-[60vw] grow px-12 py-8">

                    {/* Back Button */}
                    <div className="mb-8">
                        <button
                            className="bg-[#2D5359] text-white text-[20px] font-medium rounded-lg px-5 py-1"
                            onClick={handleBack}
                        >
                            <i className="fa-solid fa-arrow-left"></i> &nbsp;Back
                        </button>
                    </div>

                    {/* Expense List Container */}
                    <div className="c-individual-data-1 bg-white w-full h-fit rounded-2xl mt-2 px-12 py-8">
                        {/* Category Title */}
                        <div className="font-medium text-[25px]">
                            <h1>{name}</h1>
                        </div>

                        {/* Render Food List */}
                        {location.pathname == `${basePath}/Food` && (Foodlist || []).map((item, index) => (
                            <ExpenseItem key={index} item={item} />
                        ))}

                        {/* Render Transport List */}
                        {location.pathname == `${basePath}/Transport` && (TransportListing || []).map((item, index) => (
                            <ExpenseItem key={index} item={item} />
                        ))}

                        {/* Render Housing List */}
                        {location.pathname == `${basePath}/Housing` && (HousingListing || []).map((item, index) => (
                            <ExpenseItem key={index} item={item} />
                        ))}

                        {/* Render Saving List */}
                        {location.pathname == `${basePath}/Saving` && (SavingListing || []).map((item, index) => (
                            <ExpenseItem key={index} item={item} />
                        ))}

                        {/* Render Personal Expenses */}
                        {location.pathname == `${basePath}/PersonalExpence` && (PersonalListing || []).map((item, index) => (
                            <ExpenseItem key={index} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

// Reusable component to display individual expense items
function ExpenseItem({ item }) {
    return (
        <div className="flex flex-row justify-between mt-4 border-b pt-4 pb-2 pl-2">
            <div className="flex flex-row gap-2">
                <button className="text-xl font-medium">{item.name}</button>
                <p className="text-[12px] mt-2 font-medium text-gray-800">{item.percentage.toFixed(1)}%</p>
            </div>
            <div className="flex flex-row gap-2">
                <p className="text-[15px] mt-1">- &nbsp; &#8377;{item.value}</p>
            </div>
        </div>
    );
}
