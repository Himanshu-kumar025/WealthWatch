import { SecondFoodExpence, SecondTransportExpence, SecondPersonalExpence, SecondHousingExpence, SecondSavingExpence } from "../../data/CalSecondMonthExpence.js";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import '../style.css'
export default function SecondHistory() {
    const navigate = useNavigate();

    // State variables for storing percentages for each category
    const [Foodpercentage, setFoodpercentage] = useState(0);
    const [TransportPercentage, setTransportPercentage] = useState(0);
    const [Personal_percentage, setPersonal_percentage] = useState(0);
    const [Housing_percentage, setHousing_percentage] = useState(0);
    const [Saving_percentage, setSaving_percentage] = useState(0);

    // State variables for storing expense values for each category
    const [foodExpence, setFoodExpence] = useState(0);
    const [transportExpence, setTransportExpence] = useState(0);
    const [personalExpence, setPersonalExpence] = useState(0);
    const [housingExpence, setHousingExpence] = useState(0);
    const [savingExpence, setSavingExpence] = useState(0);

    // Fetch category-wise percentage and expense data on component mount
    useEffect(() => {
        const loadData = async () => {
            const food = await SecondFoodExpence();
            const transport = await SecondTransportExpence();
            const personal = await SecondPersonalExpence();
            const saving = await SecondSavingExpence();
            const housing = await SecondHousingExpence();

            // Set percentages
            setFoodpercentage(food?.Foodpercentage || 0);
            setTransportPercentage(transport?.TransportPercentage || 0);
            setPersonal_percentage(personal?.Personal_percentage || 0);
            setSaving_percentage(saving?.Saving_percentage || 0);
            setHousing_percentage(housing?.Housing_percentage || 0);

            // Set expense values
            setFoodExpence(food?.foodExpence || 0);
            setTransportExpence(transport?.transportExpence || 0);
            setPersonalExpence(personal?.personalExpence || 0);
            setSavingExpence(saving?.savingExpence || 0);
            setHousingExpence(housing?.housingExpence || 0);
        };

        loadData();
    }, []);

    // Handles navigation to detailed view of each expense category
    const handleclick = (e) => {
        const value = e.target.value;
        const path = location.pathname;
        navigate(`${path}/${value}`);
    };

    // Extract month name from URL path
    const monthName = location.pathname.replace('/historys/', '');

    const allZero =
        foodExpence == 0 &&
        transportExpence == 0 &&
        savingExpence == 0 &&
        housingExpence == 0 &&
        personalExpence == 0;

    if (allZero) {
        return (
            <div className="text-center mt-20">
                <div className="monthlist w-full h-[100px] bg-white rounded-2xl mt-8 px-8 py-4 flex items-center justify-center max-[1030px]:mb-[200px]">
                    <p className="text-gray-600 text-lg">No expense data available for the current month.</p>
                </div>
            </div>
        );
    }



    return (
        <>
            {/* History Data Container */}
            <div className="monthlist w-full h-[460px] bg-white rounded-2xl mt-8 px-8 py-4">

                {/* Month Heading */}
                <div className="monthlist-head font-medium text-xl">
                    {monthName.toUpperCase()}
                </div>

                {/* Expense Category Breakdown */}
                <div className="monthlist-1 w-full h-fit rounded-2xl px-8">

                    {/* Food */}
                    <div className="flex flex-row justify-between mt-4 border-b pt-4 pb-2 pl-2">
                        <div className="flex flex-row gap-2 hover:cursor-pointer">
                            <button className="text-xl font-medium" value='Food' onClick={handleclick}>Food</button>
                            <p className="text-[12px] mt-2 font-medium text-gray-800">{Foodpercentage.toFixed(1)}%</p>
                        </div>
                        <div>
                            <p className="text-[15px] mt-1">- &nbsp; &#8377;{foodExpence}</p>
                        </div>
                    </div>

                    {/* Housing */}
                    <div className="flex flex-row justify-between mt-4 border-b pt-4 pb-2 pl-2 hover:cursor-pointer">
                        <div className="flex flex-row gap-2">
                            <button className="text-xl font-medium" value='Housing' onClick={handleclick}>Housing</button>
                            <p className="text-[12px] mt-2 font-medium text-gray-800">{Housing_percentage.toFixed(1)}%</p>
                        </div>
                        <div>
                            <p className="text-[15px] mt-1">- &nbsp; &#8377;{housingExpence}</p>
                        </div>
                    </div>

                    {/* Personal Expenses */}
                    <div className="flex flex-row justify-between mt-4 border-b pt-4 pb-2 pl-2 hover:cursor-pointer">
                        <div className="flex flex-row gap-2">
                            <button className="text-xl font-medium" value='PersonalExpence' onClick={handleclick}>Personal expence</button>
                            <p className="text-[12px] mt-2 font-medium text-gray-800">{Personal_percentage.toFixed(1)}%</p>
                        </div>
                        <div>
                            <p className="text-[15px] mt-1">- &nbsp; &#8377;{personalExpence}</p>
                        </div>
                    </div>

                    {/* Transport */}
                    <div className="flex flex-row justify-between mt-4 border-b pt-4 pb-2 pl-2 hover:cursor-pointer">
                        <div className="flex flex-row gap-2">
                            <button className="text-xl font-medium" value='Transport' onClick={handleclick}>Transport</button>
                            <p className="text-[12px] mt-2 font-medium text-gray-800">{TransportPercentage.toFixed(1)}%</p>
                        </div>
                        <div>
                            <p className="text-[15px] mt-1">- &nbsp; &#8377;{transportExpence}</p>
                        </div>
                    </div>

                    {/* Saving */}
                    <div className="flex flex-row justify-between mt-4 border-b pt-4 pb-2 pl-2 hover:cursor-pointer">
                        <div className="flex flex-row gap-2">
                            <button className="text-xl font-medium" value='Saving' onClick={handleclick}>Saving</button>
                            <p className="text-[12px] mt-2 font-medium text-gray-800">{Saving_percentage.toFixed(1)}%</p>
                        </div>
                        <div>
                            <p className="text-[15px] mt-1">+ &nbsp; &#8377;{savingExpence}</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}