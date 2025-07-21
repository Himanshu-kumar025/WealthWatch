import { useState, useEffect } from "react";
import BarGraph from "../pie/barGraph.jsx";
import {  CurrentTotalExpence,  CurrentFoodExpence,  CurrentTransportExpence,  CurrentPersonalExpence,  CurrentHousingExpence,  CurrentSavingExpence } from "../../data/CalCurrentMonthExpence.js";
import CurrentMonthList from "./CurrentMonthList.jsx";
import CurrPie from "../pie/CurrentMonthpie.jsx";
import '../style.css'


export default function CurrentMonth() {

    const [FoodExpences, setFoodExpences] = useState(0);
    const [TransportExpences, setTransportExpences] = useState(0);
    const [PersonalExpences, setPersonalExpences] = useState(0);
    const [HousingExpences, setHousingExpences] = useState(0);
    const [SavingExpences, setSavingExpences] = useState(0);
    const [Balance, setBalance] = useState(0);
    const [Spended, setSpended] = useState(0);
    const [TotalExpences, setTotalExpences] = useState(0);

    // Fetch all required data on every component render (missing dependency array)
    useEffect(() => {
        const loadData = async () => {
            // Fetching individual category expenses
            const food = await CurrentFoodExpence();
            const transport = await CurrentTransportExpence();
            const personal = await CurrentPersonalExpence();
            const saving = await CurrentSavingExpence();
            const housing = await CurrentHousingExpence();
            const total = await CurrentTotalExpence();

            // Updating state with fetched data
            setFoodExpences(food?.foodExpence || 0);
            setTransportExpences(transport?.transportExpence || 0);
            setPersonalExpences(personal?.personalExpence || 0);
            setSavingExpences(saving?.savingExpence || 0);
            setHousingExpences(housing?.housingExpence || 0);
            setTotalExpences(total?.TotalBudget || 0);
            setSpended(total?.Spended || 0);
            // Calculating remaining balance
            setBalance((total?.TotalBudget || 0) - (total?.Spended || 0));
        }

        loadData();
    });

   

    // Bar graph data configuration
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
            {/*  Monthly Bar Chart Section  */}
            <div className="monthly-exp bg-white w-full mt-4 rounded-2xl py-5 px-10">
                {/* Section Title */}
                <div className="font-medium text-xl mb-7">
                    Monthly Expenses
                </div>

                {/* Chart and Summary Container */}
                <div className="bar-graph flex justify-between">

                    {/* Bar Chart Area */}
                    <div className="bar-graph-1 w-[60%] h-full">
                        <BarGraph data={datas} />
                    </div>

                    {/* Summary Boxes for Income, Expense, and Balance */}
                    <div className="bar-graph-2 text-center flex flex-col w-fit" style={{ justifyContent: "center" }}>

                        {/* Income Box */}
                        <div className="bar-graph-2-1 w-fit h-fit p-3 rounded-xl items-center border-1 flex justify-between px-4 bg-gray-200 mb-5">
                            <p className="text-xl">Income</p>
                            <p className="text-lg font-semibold">&#8377; {TotalExpences}</p>
                        </div>

                        {/* Expense Box */}
                        <div className="bar-graph-2-1 w-fit h-fit p-3 rounded-xl items-center border-1 flex justify-between px-4 bg-gray-200 mb-5">
                            <p className="text-xl">Expense</p>
                            <p className="text-lg font-semibold" style={{ color: "rgb(255, 0, 0)" }}>&#8377; {Spended}</p>
                        </div>

                        {/* Balance Box */}
                        <div className="bar-graph-2-1 w-fit h-fit p-3 rounded-xl items-center border-1 flex justify-between px-4 bg-gray-200">
                            <p className="text-xl">Balance</p>
                            <p className="text-lg font-semibold" style={{ color: "rgb(48, 161, 78)" }}>&#8377; {Balance}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/*  Monthly Pie Chart Section  */}
            <div className="c-monthlychart bg-white w-full mt-4 rounded-2xl p-5">
                <CurrPie />
            </div>

            {/*  Expense Category Breakdown List */}
            <CurrentMonthList />
        </>
    )
}
