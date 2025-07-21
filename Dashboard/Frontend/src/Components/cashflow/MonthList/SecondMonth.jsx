// Importing necessary hooks and components
import { useState, useEffect } from "react";
import BarGraph from "../pie/barGraph.jsx";
import {
    SecTotalExpence, SecondFoodExpence, SecondTransportExpence, SecondPersonalExpence, SecondHousingExpence, SecondSavingExpence
} from "../../data/CalSecondMonthExpence.js";
import SecondMonthList from "./SecondMonthList.jsx";
import SecondPie from "../pie/SecondMonthpie.jsx";

export default function SecondMonth() {
    // State variables for expense categories and overall totals
    const [FoodExpences, setFoodExpences] = useState(0);
    const [TransportExpences, setTransportExpences] = useState(0);
    const [PersonalExpences, setPersonalExpences] = useState(0);
    const [HousingExpences, setHousingExpences] = useState(0);
    const [SavingExpences, setSavingExpences] = useState(0);
    const [TotalExpences, setTotalExpences] = useState(0); // Total income
    const [Spended, setSpended] = useState(0); // Total expenses
    const [Balance, setBalance] = useState(0); // Remaining balance

    // Effect to fetch and load data once component mounts
    useEffect(() => {
        const loadData = async () => {
            // Fetch individual expense category data
            const food = await SecondFoodExpence();
            const transport = await SecondTransportExpence();
            const personal = await SecondPersonalExpence();
            const saving = await SecondSavingExpence();
            const housing = await SecondHousingExpence();
            const total = await SecTotalExpence();

            // Set state with fetched data (formatted to 1 decimal place)
            setFoodExpences(food?.foodExpence.toFixed(1) || 0);
            setTransportExpences(transport?.transportExpence.toFixed(1) || 0);
            setPersonalExpences(personal?.personalExpence.toFixed(1) || 0);
            setSavingExpences(saving?.savingExpence.toFixed(1) || 0);
            setHousingExpences(housing?.housingExpence.toFixed(1) || 0);
            setTotalExpences(total?.TotalBudget || 0);
            setSpended(total?.Spended || 0);
            setBalance((total?.TotalBudget || 0) - (total?.Spended || 0)); // Compute balance
        }

        loadData(); // Trigger data load
    }); 
  

    // Labels and dataset for bar chart visualization
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
            {/*  Bar Graph and Summary Info  */}
            <div className="monthly-exp bg-white w-full mt-4 rounded-2xl p-5 ">
                <div className="font-medium text-xl mb-7">
                    Monthly Expenses
                </div>

                {/* Container for bar chart and summary cards */}
                <div className="bar-graph flex justify-between">

                    {/* Bar chart section */}
                    <div className="bar-graph-1 w-[60%] h-full">
                        <BarGraph data={datas} />
                    </div>

                    {/* Summary section (Income, Expenses, Balance) */}
                    <div className="bar-graph-2 text-center flex flex-col mb-12 mr-10 w-[24%]" style={{ justifyContent: "center" }}>

                        {/* Income Card */}
                        <div className="bar-graph-2-1  w-full p-3 rounded-xl border-1 flex px-4 justify-between bg-gray-200 mb-5">
                            <p className="text-xl">Income</p>
                            <p className="text-lg font-semibold"> &#8377; {TotalExpences} </p>
                        </div>

                        {/* Expenses Card */}
                        <div className="bar-graph-2-1 w-full p-3 rounded-xl border-1 flex px-4 justify-between bg-gray-200 mb-5">
                            <p className="text-xl">Expenses</p>
                            <p className="text-lg font-semibold" style={{ color: "rgb(255, 0, 0)" }}> &#8377; {Spended} </p>
                        </div>

                        {/* Balance Card */}
                        <div className="bar-graph-2-1 w-full p-3 rounded-xl border-1 flex px-4 justify-between bg-gray-200">
                            <p className="text-xl">Balance</p>
                            <p className="text-lg font-semibold" style={{ color: "rgb(48, 161, 78)" }}> &#8377; {Balance} </p>
                        </div>
                    </div>
                </div>
            </div>

            {/*  Pie Chart Section  */}
            <div className="c-monthlychart bg-white w-full mt-4 rounded-2xl p-5">
                <SecondPie />
            </div>

            {/*  Expense List Section  */}
            <SecondMonthList />
        </>
    )
}
