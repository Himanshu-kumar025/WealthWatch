// Importing required hooks and components
import { useState, useEffect } from "react";
import BarGraph from "../pie/barGraph.jsx";
import { ForthTotalExpence, ForthFoodExpence, ForthTransportExpence, ForthPersonalExpence, ForthHousingExpence, ForthSavingExpence
} from "../../data/CalForthMonthExpence.js";
import ForthMonthList from "./ForthMonthList.jsx";
import ForthPie from "../pie/ForthMonthpie.jsx";

export default function ForthMonth() {

    // Initializing state variables for each expense category and totals
    const [FoodExpences, setFoodExpences] = useState(0);
    const [TransportExpences, setTransportExpences] = useState(0);
    const [PersonalExpences, setPersonalExpences] = useState(0);
    const [HousingExpences, setHousingExpences] = useState(0);
    const [SavingExpences, setSavingExpences] = useState(0);
    const [TotalExpences, setTotalExpences] = useState(0); // Total income
    const [Spended, setSpended] = useState(0); // Total expenses
    const [Balance, setBalance] = useState(0); // Income - Expenses

    // useEffect to fetch and set data on component mount
    useEffect(() => {
        const loadData = async () => {
            // Fetching individual expense values
            const food = await ForthFoodExpence();
            const transport = await ForthTransportExpence();
            const personal = await ForthPersonalExpence();
            const saving = await ForthSavingExpence();
            const housing = await ForthHousingExpence();
            const total = await ForthTotalExpence();

            // Updating state with fetched values (formatted to 1 decimal place)
            setFoodExpences(food?.foodExpence.toFixed(1) || 0);
            setTransportExpences(transport?.transportExpence.toFixed(1) || 0);
            setPersonalExpences(personal?.personalExpence.toFixed(1) || 0);
            setSavingExpences(saving?.savingExpence.toFixed(1) || 0);
            setHousingExpences(housing?.housingExpence.toFixed(1) || 0);
            setTotalExpences(total?.TotalBudget || 0);
            setSpended(total?.Spended || 0);
            setBalance((total?.TotalBudget || 0) - (total?.Spended || 0)); // Calculating remaining balance
        }
        loadData(); // Calling the data loading function
    }); 

    
  

    // Labels and data structure for bar chart
    const labels = ['Food', 'Housing', 'Personal expenses', 'Transport', 'Saving'];
    const datas = {
        labels,
        datasets: [
            {
                type: 'bar',
                label: '',
                data: [FoodExpences, HousingExpences, PersonalExpences, TransportExpences, SavingExpences],
                backgroundColor: 'rgb(130, 231, 130)'
            }
        ]
    };

    return (
        <>
            {/*  Bar Chart and Summary Section  */}
            <div className="monthly-exp bg-white w-full mt-4 rounded-2xl p-5 ">
                <div className="font-medium text-xl mb-7">
                    Monthly Expenses
                </div>

                {/* Layout container for bar chart and summary cards */}
                <div className="bar-graph flex justify-between">

                    {/* Bar chart visualizing categorized expenses */}
                    <div className="bar-graph-1 w-[60%] h-full">
                        <BarGraph data={datas} />
                    </div>

                    {/* Summary panel showing Income, Expenses, and Balance */}
                    <div className="bar-graph-2 text-center flex flex-col mb-12 mr-10 w-[24%]" style={{ justifyContent: "center" }}>

                        {/* Income display */}
                        <div className="bar-graph-2-1 w-full p-3 rounded-xl border-1 flex px-4 justify-between bg-gray-200 mb-5">
                            <p className="text-xl">Income</p>
                            <p className="text-lg font-semibold"> &#8377; {TotalExpences} </p>
                        </div>

                        {/* Expenses display */}
                        <div className="bar-graph-2-1 w-full p-3 rounded-xl border-1 flex px-4 justify-between bg-gray-200 mb-5">
                            <p className="text-xl">Expenses</p>
                            <p className="text-lg font-semibold" style={{ color: "rgb(255, 0, 0)" }}> &#8377; {Spended} </p>
                        </div>

                        {/* Balance display */}
                        <div className="bar-graph-2-1 w-full p-3 rounded-xl border-1 flex px-4 justify-between bg-gray-200">
                            <p className="text-xl">Balance</p>
                            <p className="text-lg font-semibold" style={{ color: "rgb(48, 161, 78)" }}> &#8377; {Balance} </p>
                        </div>
                    </div>
                </div>
            </div>

            {/*  Pie Chart Section  */}
            <div className="c-monthlychart bg-white w-full mt-4 rounded-2xl p-5">
                <ForthPie />
            </div>

            {/*  Expense List Section  */}
            <ForthMonthList />
        </>
    )
}
