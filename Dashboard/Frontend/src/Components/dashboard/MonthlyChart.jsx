import {
    CurrentFoodExpence,
    CurrentTransportExpence,
    CurrentPersonalExpence,
    CurrentHousingExpence,
    CurrentSavingExpence
} from "../data/CalCurrentMonthExpence"; // Import functions to calculate each type of expense
import { useState, useEffect } from "react";
import PieChart from "../cashflow/pie/pieChart"; // Import the reusable PieChart component


export default function MonthlyChart() {
    const [monthData, setMonthData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Color palette for each category in the pie chart
    const backgroundColors = [
        'rgb(59, 192, 95)',     // Food
        'rgb(66, 133, 244)',    // Transport
        'rgb(116, 180, 228)',   // Personal
        'rgb(251, 188, 5)',     // Housing
        'rgb(11, 209, 235)',    // Saving
    ];

    // Fetch current month's expenses when component mounts
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Fetch individual category expenses asynchronously
                const food = await CurrentFoodExpence();
                const transport = await CurrentTransportExpence();
                const personal = await CurrentPersonalExpence();
                const saving = await CurrentSavingExpence();
                const housing = await CurrentHousingExpence();

                // Format and store all data into state for rendering
                setMonthData([
                    { name: 'Food', value: food.foodExpence, percentage: food.Foodpercentage },
                    { name: 'Transport', value: transport.transportExpence, percentage: transport.TransportPercentage },
                    { name: 'Personal', value: personal.personalExpence, percentage: personal.Personal_percentage },
                    { name: 'Housing', value: housing.housingExpence, percentage: housing.Housing_percentage },
                    { name: 'Saving', value: saving.savingExpence, percentage: saving.Saving_percentage }
                ]);
            } catch (error) {
                console.error("Failed to load expense data:", error); // Log any fetch errors
                return res.status(500).json({ message: error.message });
            } finally {
                setLoading(false); // Hide loading indicator regardless of outcome
            }
        };

        loadData(); // Call the async function
    }, []); // Empty dependency array ensures this runs once when the component mounts

    // Extract just labels and values for use in the PieChart component
    const labels = monthData.map((item) => item.name);
    const values = monthData.map((item) => item.value);

    // Pie chart data format
    const data = {
        labels,
        datasets: [{
            label: 'Monthly Expenses',
            data: values,
            backgroundColor: backgroundColors,
            hoverOffset: 3
        }]
    };

    // Render section
    return (
        <div className="monthchart-1 bg-white text-center w-[24vw] max-[1200px]:w-[22.5vw] h-[72vh] max-[1215px]:px-[10px] rounded-2xl py-4 px-6">
            <h1 className="text-[1.5rem] font-semibold mb-2 p-2">Monthly Expense</h1>


            <div className="monthchart-2 ">

                <div className="piechart-1 w-[75%] h-[40vh] max-[1450px]:w-[100%]  max-[1215px]:w-[110%] max-[1108px]:h-[35vh]  justify-center  flex items-center m-auto">
                    <PieChart key={JSON.stringify(data)} data={data} />
                </div>

                {/* Show loading text while fetching data */}
                {loading ? (
                    <p className="text-center mt-20">Loading...</p>
                ) : (
                    <div className="text-start font-medium mt-5">
                        <ul>
                            {monthData.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex flex-row items-center gap-3 justify-between"
                                >
                                    <div className="flex flex-row items-center gap-3">
                                        {/* Color dot for each category */}
                                        <div
                                            className="rounded-full h-[12px] w-[12px]"
                                            style={{ backgroundColor: backgroundColors[index] }}
                                        ></div>
                                        <h1>{item.name}</h1>
                                    </div>
                                    {/* Display percentage value with 1 decimal place */}
                                    <div>{item.percentage.toFixed(1)}%</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
