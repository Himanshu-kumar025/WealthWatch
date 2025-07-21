// Import necessary hooks and components
import { useState, useEffect } from "react";
import BarGraph from "../pie/barGraph.jsx";
import {
    SixthTotalExpence,
    SixthFoodExpence,
    SixthTransportExpence,
    SixthPersonalExpence,
    SixthSavingExpence,
    SixthHousingExpence
} from "../../data/CalSixthMonthExpence.js";
import SixthMonthList from "./SixthMonthList.jsx";
import SixthPie from "../pie/SixthMonthpie.jsx";

export default function SixthMonth() {

    // State variables for expense categories, total income, spent amount, and balance
    const [FoodExpences, setFoodExpences] = useState(0);
    const [TransportExpences, setTransportExpences] = useState(0);
    const [PersonalExpences, setPersonalExpences] = useState(0);
    const [HousingExpences, setHousingExpences] = useState(0);
    const [SavingExpences, setSavingExpences] = useState(0);
    const [TotalExpences, setTotalExpences] = useState(0); // Total income
    const [Spended, setSpended] = useState(0); // Total amount spent
    const [Balance, setBalance] = useState(0); // Remaining balance

    // Fetch and set data when the component mounts
    useEffect(() => {
        const loadData = async () => {
            // Get each category's expense
            const food = await SixthFoodExpence();
            const transport = await SixthTransportExpence();
            const personal = await SixthPersonalExpence();
            const saving = await SixthSavingExpence();
            const housing = await SixthHousingExpence();
            const total = await SixthTotalExpence();

            // Update state with formatted values or defaults
            setFoodExpences(food?.foodExpence.toFixed(1) || 0);
            setTransportExpences(transport?.transportExpence.toFixed(1) || 0);
            setPersonalExpences(personal?.personalExpence.toFixed(1) || 0);
            setSavingExpences(saving?.savingExpence.toFixed(1) || 0);
            setHousingExpences(housing?.housingExpence.toFixed(1) || 0);
            setTotalExpences(total?.TotalBudget || 0);
            setSpended(total?.Spended || 0);
            setBalance((total?.TotalBudget || 0) - (total?.Spended || 0));
        }

        loadData(); // Call the function to load data
    });

  
    // Bar chart labels and data
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
            <div className="monthly-exp bg-white w-full mt-4 rounded-2xl py-5 px-10">
                <div className="font-medium text-xl mb-7">
                    Monthly Expenses
                </div>

                {/* Bar chart and statistics container */}
                <div className="bar-graph flex justify-between">

                    {/* Left: Bar chart visual */}
                    <div className="bar-graph-1 w-[60%] h-full">
                        <BarGraph data={datas} />
                    </div>

                    {/* Right: Summary of Income, Expenses, Balance */}
                    <div className="bar-graph-2 text-center flex flex-col mb-12 mr-10 w-[24%]" style={{ justifyContent: "center" }}>
                        {/* Income Box */}
                        <div className="bar-graph-2-1 w-full p-3 rounded-xl border-1 flex px-4 justify-between bg-gray-200 mb-5">
                            <p className="text-xl">Income</p>
                            <p className="text-lg font-semibold"> &#8377; {TotalExpences} </p>
                        </div>

                        {/* Expenses Box */}
                        <div className="bar-graph-2-1 w-full p-3 rounded-xl border-1 flex px-4 justify-between bg-gray-200 mb-5">
                            <p className="text-xl">Expenses</p>
                            <p className="text-lg font-semibold" style={{ color: "rgb(255, 0, 0)" }}> &#8377; {Spended} </p>
                        </div>

                        {/* Balance Box */}
                        <div className="bar-graph-2-1 w-full p-3 rounded-xl border-1 flex px-4 justify-between bg-gray-200">
                            <p className="text-xl">Balance</p>
                            <p className="text-lg font-semibold" style={{ color: "rgb(48, 161, 78)" }}> &#8377; {Balance} </p>
                        </div>
                    </div>
                </div>
            </div>

            {/*  Pie Chart Section  */}
            <div className="c-monthlychart bg-white w-full mt-4 rounded-2xl p-5">
                <SixthPie />
            </div>

            {/*  Expense List Section  */}
            <SixthMonthList />
        </>
    )
}
