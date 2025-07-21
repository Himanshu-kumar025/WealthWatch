import { useState, useEffect } from "react";
import BarGraph from "../pie/barGraph.jsx";
import {
    FifthTotalExpence, FifthFoodExpence, FifthTransportExpence, FifthPersonalExpence, FifthHousingExpence, FifthSavingExpence
} from "../../data/CalFifthMonthExpence.js";
import FifthMonthList from "./FifthMonthList.jsx";
import FifthPie from "../pie/FifthMonthpie.jsx";
import '../style.css'


export default function FifthMonth() {

    // Defining state variables to store expense data
    const [FoodExpences, setFoodExpences] = useState(0);
    const [TransportExpences, setTransportExpences] = useState(0);
    const [PersonalExpences, setPersonalExpences] = useState(0);
    const [HousingExpences, setHousingExpences] = useState(0);
    const [SavingExpences, setSavingExpences] = useState(0);
    const [TotalExpences, setTotalExpences] = useState(0); // Total income
    const [Spended, setSpended] = useState(0); // Total spent
    const [Balance, setBalance] = useState(0); // Remaining balance

    // useEffect to fetch expense and income data when component mounts
    useEffect(() => {
        const loadData = async () => {
            // Fetch individual category-wise expenses
            const food = await FifthFoodExpence();
            const transport = await FifthTransportExpence();
            const personal = await FifthPersonalExpence();
            const saving = await FifthSavingExpence();
            const housing = await FifthHousingExpence();

            // Fetch overall income and spent values
            const total = await FifthTotalExpence();

            // Update state with fetched data (with values rounded to 1 decimal place)
            setFoodExpences(food?.foodExpence.toFixed(1) || 0);
            setTransportExpences(transport?.transportExpence.toFixed(1) || 0);
            setPersonalExpences(personal?.personalExpence.toFixed(1) || 0);
            setSavingExpences(saving?.savingExpence.toFixed(1) || 0);
            setHousingExpences(housing?.housingExpence.toFixed(1) || 0);
            setTotalExpences(total?.TotalBudget || 0);
            setSpended(total?.Spended || 0);
            setBalance((total?.TotalBudget || 0) - (total?.Spended || 0)); // Calculate balance
        }
        loadData();
    }); 


  

    // Labels and data for bar chart visualization
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
            {/*  Bar Chart Section  */}
            <div className="monthly-exp bg-white w-full mt-4 rounded-2xl p-5 ">
                <div className="font-medium text-xl mb-7">
                    Monthly Expenses
                </div>

                {/* Layout: Bar chart and summary stats */}
                <div className="bar-graph flex justify-between">

                    {/* Bar chart displaying expenses by category */}
                    <div className="bar-graph-1 w-[60%] h-full">
                        <BarGraph data={datas} />
                    </div>

                    {/* Summary: Income, Expenses, Balance */}
                    <div className="bar-graph-2 text-center flex flex-col mb-12 mr-10 w-[24%]" style={{ justifyContent: "center" }}>

                        {/* Income box */}
                        <div className="bar-graph-2-1  w-full p-3 rounded-xl border-1 flex px-4 justify-between bg-gray-200 mb-5">
                            <p className="text-xl">Income</p>
                            <p className="text-lg font-semibold"> &#8377; {TotalExpences} </p>
                        </div>

                        {/* Expenses box */}
                        <div className="bar-graph-2-1 w-full p-3 rounded-xl border-1 flex px-4 justify-between bg-gray-200 mb-5">
                            <p className="text-xl">Expenses</p>
                            <p className="text-lg font-semibold" style={{ color: "rgb(255, 0, 0)" }}> &#8377; {Spended} </p>
                        </div>

                        {/* Balance box */}
                        <div className="bar-graph-2-1 w-full p-3 rounded-xl border-1 flex px-4 justify-between bg-gray-200">
                            <p className="text-xl">Balance</p>
                            <p className="text-lg font-semibold" style={{ color: "rgb(48, 161, 78)" }}> &#8377; {Balance} </p>
                        </div>
                    </div>
                </div>
            </div>

            {/*  Pie Chart Section  */}
            <div className="c-monthlychart bg-white w-full mt-4 rounded-2xl p-5">
                <FifthPie />
            </div>

            {/*  Expense List Section  */}
            <FifthMonthList />
        </>
    )
}
