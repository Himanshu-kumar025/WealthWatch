import { useState, useEffect } from "react";
import PieChart from "./pieChart.jsx";
import { CurrentFoodExpence, CurrentTransportExpence, CurrentPersonalExpence, CurrentHousingExpence, CurrentSavingExpence } from "../../data/CalCurrentMonthExpence.js";
import { fetchMonthlyData } from "../../data/InputData.js";
import { useNavigate } from "react-router-dom";
export default function CurrPie() {

    const navigate = useNavigate();
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
            const food = await CurrentFoodExpence();
            const transport = await CurrentTransportExpence();
            const personal = await CurrentPersonalExpence();
            const saving = await CurrentSavingExpence();
            const housing = await CurrentHousingExpence();

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




    const [MonthName, setMonthName] = useState([]);

    useEffect(() => {
        const loadAllData = async () => {
            const promises = Array.from({ length: 6 }, (_, i) => fetchMonthlyData(i));
            const results = await Promise.all(promises);
            const name = Array.from({ length: 6 }, (_, i) => results[i].monthName.toUpperCase());
            setMonthName(name);
        };

        loadAllData();
    }, []);


    const handleClick = () => {
        navigate(`/cashflow/SixMonth/${MonthName[5]}`)
    }

    const labels = ['Food', 'Housing', 'Personal expenses', 'Transport', 'Saving'];
    const data = {
        labels,
        datasets: [{
            label: 'My First Dataset',
            data: [FoodExpences, HousingExpences, PersonalExpences, TransportExpences, SavingExpences],
            backgroundColor: [
                'rgb(59, 192, 95)',
                'rgb(66, 133, 244)',
                'rgb(116, 180, 228)',
                'rgb(251, 188, 5)',
                'rgb(11, 209, 235)',

            ],
            hoverOffset: 3
        }]
    };

    const allZero =
        FoodExpences == 0 &&
        TransportExpences == 0 &&
        SavingExpences == 0 &&
        HousingExpences == 0 &&
        PersonalExpences == 0;

    if (allZero) {
        return <div className="text-center mt-20"><div className="hidden"></div></div>;
    }


    return (
        <>
            <div className={`bg-white w-full h-fit rounded-2xl px-5 py-6 `}>
                <div className="font-medium text-xl sm:text-start mb-2 hover:cursor-pointer" >
                    {MonthName[5]}
                </div>

                <div className="flex justify-between c-monthchart-1 w-full text-center mb-5">
                    <div className="w-[40%] flex c-monthchart-1-2 ">
                        <PieChart key={JSON.stringify(data)} data={data} />
                    </div>

                    <div className=" c-monthchart-1-2 w-[50%] flex items-center pr-2 mb-5">
                        <ul className="w-full">
                            <li className="flex justify-between">
                                <div className="flex flex-row items-center gap-3 ">
                                    <div className="rounded-full h-[12px] w-[12px] " style={{ backgroundColor: 'rgb(66, 133, 244)' }}></div>
                                    <h1>Housing</h1>
                                </div>

                                <div>
                                    {Housing_percentage}%
                                </div>

                            </li>
                            <li className="flex justify-between">
                                <div className="flex flex-row items-center gap-3 ">
                                    <div className="rounded-full h-[12px] w-[12px] " style={{ backgroundColor: 'rgb(59, 192, 95)' }}></div>
                                    <h1>Food</h1>
                                </div>

                                <div>
                                    {Foodpercentage}%
                                </div>
                            </li>
                            <li className="flex justify-between ">
                                <div className="flex flex-row items-center gap-3 ">

                                    <div className="rounded-full h-[12px] w-[12px] " style={{ backgroundColor: 'rgb(251, 188, 5)' }}></div>
                                    <h1>Transport</h1>
                                </div>
                                <div>
                                    {TransportPercentage}%
                                </div>
                            </li>
                            <li className="flex justify-between ">
                                <div className="flex flex-row items-center gap-3 ">

                                    <div className="rounded-full h-[12px] w-[12px] " style={{ backgroundColor: 'rgb(116, 180, 228)' }}></div>
                                    <h1>Personal expence</h1>
                                </div>
                                <div>
                                    {Personal_percentage}%
                                </div>

                            </li>
                            <li className="flex justify-between">
                                <div className="flex flex-row items-center gap-3 ">

                                    <div className="rounded-full h-[12px] w-[12px] " style={{ backgroundColor: 'rgb(11, 209, 235)' }}></div>
                                    <h1>Saving</h1>
                                </div>
                                <div>
                                    {Saving_percentage}%
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>

                {location.pathname === "/cashflow/SixMonth" && <div className="h-fit ">
                    <button className="bg-[#2D5359] flex flex-row justify-center items-center h-fit text-white text-center text-[20px] font-medium rounded-lg py-1 px-3" onClick={handleClick}>Detail &nbsp;<i className="fa-solid fa-arrow-right"></i></button>
                </div>}

            </div>
        </>
    )
}