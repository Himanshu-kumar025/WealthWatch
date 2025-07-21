import { ForthFoodExpence, ForthTransportExpence, ForthPersonalExpence, ForthHousingExpence, ForthSavingExpence } from "../../data/CalForthMonthExpence.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMonthlyData } from "../../data/InputData.js";
import '../style.css'
export default function ForthMonthList() {

    const [Foodpercentage, setFoodpercentage] = useState(0);
    const [TransportPercentage, setTransportPercentage] = useState(0);
    const [Personal_percentage, setPersonal_percentage] = useState(0);
    const [Housing_percentage, setHousing_percentage] = useState(0);
    const [Saving_percentage, setSaving_percentage] = useState(0);

    const [FoodExpences, setFoodExpences] = useState(0);
    const [TransportExpences, setTransportExpences] = useState(0);
    const [PersonalExpences, setPersonalExpences] = useState(0);
    const [HousingExpences, setHousingExpences] = useState(0);
    const [SavingExpences, setSavingExpences] = useState(0);


    useEffect(() => {
        const loadData = async () => {
            const food = await ForthFoodExpence();
            const transport = await ForthTransportExpence();
            const personal = await ForthPersonalExpence();
            const saving = await ForthSavingExpence();
            const housing = await ForthHousingExpence();

            setFoodpercentage(food?.Foodpercentage.toFixed(1) || 0);
            setTransportPercentage(transport?.TransportPercentage.toFixed(1) || 0);
            setPersonal_percentage(personal?.Personal_percentage.toFixed(1) || 0);
            setSaving_percentage(saving?.Saving_percentage.toFixed(1) || 0);
            setHousing_percentage(housing?.Housing_percentage.toFixed(1) || 0);

            setFoodExpences(food?.foodExpence.toFixed(1) || 0);
            setTransportExpences(transport?.transportExpence.toFixed(1) || 0);
            setPersonalExpences(personal?.personalExpence.toFixed(1) || 0);
            setSavingExpences(saving?.savingExpence.toFixed(1) || 0);
            setHousingExpences(housing?.housingExpence.toFixed(1) || 0);
        }
        loadData();
    });

    // State to store month names
    const [MonthName, setMonthName] = useState([]);

    useEffect(() => {
        // Fetch names of the last 6 months on mount
        const loadAllData = async () => {
            const promises = Array.from({ length: 6 }, (_, i) => fetchMonthlyData(i));
            const results = await Promise.all(promises);
            const name = results.map(data => data.monthName.toUpperCase());
            setMonthName(name);
        };

        loadAllData();
    }, []);

    const navigate = useNavigate();
    const handleclick = (e) => {
        const value = e.target.value;
        const path = location.pathname

        navigate(`/cashflow/SixMonth/${MonthName[2]}/${value}`)
    }

    

    return (
        <>
            {/* History Data */}
            <div className="monthlist w-full h-[460px] bg-white rounded-2xl mt-8 mb-24  px-8 py-4">

                {/* Heading */}
                <div className="font-medium text-xl monthlist-head">
                    {MonthName[2]}
                </div>


                {/* Data */}
                <div className="monthlist-1 w-full h-fit  rounded-2xl mt-2 px-8 py-4 ">


                    {/* Food */}
                    <div className="flex flex-row justify-between mt-4 border-b  pt-4 pb-2 pl-2">
                        <div className="flex flex-row gap-2 hover:cursor-pointer" >
                            <button className="text-xl font-medium hover:cursor-pointer" value='Food' onClick={handleclick}>Food</button>
                            <p className="text-[12px] mt-2 font-medium text-gray-800">{Foodpercentage}%</p>
                        </div>
                        <div>

                            <p className="text-[15px] mt-1">- &nbsp; &#8377;{FoodExpences}</p>
                        </div>
                    </div>

                    {/* Housing */}
                    <div className="flex flex-row justify-between mt-4 border-b  pt-4 pb-2 pl-2 hover:cursor-pointer">
                        <div className="flex flex-row gap-2">
                            <button className="text-xl font-medium hover:cursor-pointer" value='Housing' onClick={handleclick}>Housing</button>
                            <p className="text-[12px] mt-2 font-medium text-gray-800">{Housing_percentage}%</p>
                        </div>
                        <div>

                            <p className="text-[15px] mt-1">- &nbsp; &#8377;{HousingExpences}</p>
                        </div>
                    </div>

                    {/* Personal */}
                    <div className="flex flex-row justify-between mt-4 border-b  pt-4 pb-2 pl-2  hover:cursor-pointer">
                        <div className="flex flex-row gap-2">

                            <button className="text-xl font-medium hover:cursor-pointer" value='PersonalExpence' onClick={handleclick}>Personal expence</button>
                            <p className="text-[12px] mt-2 font-medium text-gray-800">{Personal_percentage}%</p>
                        </div>
                        <div>

                            <p className="text-[15px] mt-1">- &nbsp; &#8377;{PersonalExpences}</p>
                        </div>
                    </div>

                    {/* Transport */}
                    <div className="flex flex-row justify-between mt-4 border-b  pt-4 pb-2 pl-2 hover:cursor-pointer">
                        <div className="flex flex-row gap-2">

                            <button className="text-xl font-medium hover:cursor-pointer" value='Transport' onClick={handleclick}>Transport</button>
                            <p className="text-[12px] mt-2 font-medium text-gray-800">{TransportPercentage}%</p>
                        </div>
                        <div>

                            <p className="text-[15px] mt-1">- &nbsp; &#8377;{TransportExpences}</p>
                        </div>
                    </div>

                    {/* Saving */}
                    <div className="flex flex-row justify-between mt-4 border-b pt-4 pb-2 pl-2 hover:cursor-pointer">
                        <div className="flex flex-row gap-2">

                            <button className="text-xl font-medium hover:cursor-pointer" value='Saving' onClick={handleclick}>Saving</button>
                            <p className="text-[12px] mt-2 font-medium text-gray-800">{Saving_percentage}%</p>
                        </div>
                        <div>

                            <p className="text-[15px] mt-1">- &nbsp; &#8377;{SavingExpences}</p>
                        </div>

                    </div>
                </div>

            </div>


        </>
    )
}