import {
    CurrentFoodExpence, CurrentTransportExpence, CurrentHousingExpence, CurrentSavingExpence, CurrentPersonalExpence,
} from "../../data/CalCurrentMonthExpence.js";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../axiosConfig.js";
import { fetchMonthlyData } from "../../data/InputData.js";

export default function CurrentHistoryIndividual() {
    const navigate = useNavigate();
    const location = useLocation();

    // State for each expense category
    const [Foodlist, setFoodlist] = useState([]);
    const [TransportListing, setTransportListing] = useState([]);
    const [PersonalListing, setPersonalListing] = useState([]);
    const [SavingListing, setSavingListing] = useState([]);
    const [HousingListing, setHousingListing] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0); // Trigger re-render on deletion
    const [Delete, setDelete] = useState(false)
    const [error, setError] = useState(false);
     const [MonthName, setMonthName] = useState([]);

    // Fetch current month’s data on mount or when refreshKey changes
    useEffect(() => {
        const loadData = async () => {
            const food = await CurrentFoodExpence();
            const transport = await CurrentTransportExpence();
            const personal = await CurrentPersonalExpence();
            const saving = await CurrentSavingExpence();
            const housing = await CurrentHousingExpence();

            setFoodlist(food?.Foodlist || []);
            setTransportListing(transport?.TransportListing || []);
            setPersonalListing(personal?.PersonalListing || []);
            setSavingListing(saving?.SavingListing || []);
            setHousingListing(housing?.HousingListing || []);
        };

        loadData();
    }, [refreshKey]);

    // State to store month names
   

    useEffect(() => {
        // Fetch names of the last 6 months on mount
        const loadAllData = async () => {
            const promises = Array.from({ length: 6 }, (_, i) => fetchMonthlyData(i));
            const results = await Promise.all(promises);
            const name = results.map(data => data.monthName);
            setMonthName(name);
        };

        loadAllData();
    }, []);

    // Extract category from the pathname
    const pathParts = location.pathname.split("/");
    const basePath = `/${pathParts[1]}/${pathParts[2]}`;
    const name = location.pathname.replace(`${basePath}/`, "");
    const category = name.charAt(0).toLowerCase() + name.slice(1);


    // Delete handler
    const handleDelete = async (itemName) => {

        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(
                ` ${BASE_URL}/deleteData`,
                { category, name: itemName, month: MonthName[5] },  // dynamically pass current month if needed
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    timeout: 5000,
                }
            );

            if (response.data?.message) {
                setDelete(true)
                setTimeout(() => {
                    setDelete(false)
                }, 5000);
                setRefreshKey((prev) => prev + 1); // Trigger re-fetch
            }
        } catch (error) {
            setError(error);
            setTimeout(() => {
                setError(false);// Hide Error message after 5 seconds
            }, 5000);
        }
    };

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
    const handleDeleteMsg = () => {
        setDelete(false);
    }

    // Helper to render list section
    const renderListSection = (list) =>
        list.map((item, index) => (
            <div
                key={index}
                className="flex flex-row justify-between mt-4 border-b pt-4 pb-2 pl-2"
            >
                <div className="flex flex-row gap-2">
                    <button className="text-xl font-medium">{item.name} </button>
                    <p className="text-[12px] mt-2 font-medium text-gray-800">
                        {item.percentage.toFixed(1)}%
                    </p>
                </div>
                <div className="flex flex-row gap-2">
                    <p className="text-[15px] mt-1">- &nbsp; ₹{item.value}</p>

                    <button
                        className="ml-3 cursor-pointer"
                        onClick={() => handleDelete(item.name)}
                    >

                        <i className="fa-solid fa-trash"></i>
                    </button>

                </div>
            </div>
        ));

    // Determine which category list to render
    const getListByPath = () => {
        if (location.pathname === `${basePath}/Food`) return renderListSection(Foodlist);
        if (location.pathname === `${basePath}/Transport`) return renderListSection(TransportListing);
        if (location.pathname === `${basePath}/Housing`) return renderListSection(HousingListing);
        if (location.pathname === `${basePath}/Saving`) return renderListSection(SavingListing);
        if (location.pathname === `${basePath}/Personal`) return renderListSection(PersonalListing);
        return <p className="mt-4 text-gray-600">No data found.</p>;
    };

    return (
        <>
            {/* Main Container */}
            <div className='flex flex-row '>

                {/* History Data Container */}
                <div className="history-individual bg-[#B8D7DE8C] dashboaard-right mb-[80px] rounded-md mt-4 h-full w-[85vw] md:w-[300px] pt-6 pl-4 dashboard"
                    style={{ position: "fixed", right: 0, overflowY: "auto" }}>

                    {/* Back Btn */}
                    <div className=" mb-8">
                        <button className="bg-[#2D5359] text-white text-[20px] font-medium rounded-lg px-5 py-1" onClick={handleBack} ><i className="fa-solid fa-arrow-left"></i> &nbsp;Back</button>
                    </div>

                    {/* History data list*/}
                    <div className="history-individual-1 bg-white w-full h-fit rounded-2xl mt-2 px-12 py-8">

                        <div className="font-medium text-[25px]">
                            <h1>{name}</h1>
                        </div>



                        {/* Delete Message */}
                        {Delete && <div className="flex flex-row mb-1 w-1/2 justify-between" style={{
                            backgroundColor: "#d4edda",
                            border: "1px solid #c3e6cb",
                            color: "#155724",
                            padding: "5px",
                            borderRadius: "5px",
                            marginTop: "10px"
                        }}>
                            <div> Deletion SuccessFully ! </div>
                            <button onClick={handleDeleteMsg}><i className="fa-solid fa-xmark"></i></button>
                        </div>}

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
        </>
    );
}
