import { useState, useEffect, useMemo } from "react";
import BarGraph from "./pie/barGraph.jsx";
import PieChart from "./pie/pieChart.jsx";
import {
  CurrentTotalExpence, CurrentFoodExpence, CurrentTransportExpence,
  CurrentPersonalExpence, CurrentHousingExpence, CurrentSavingExpence,
} from "../data/CalCurrentMonthExpence.js";
import {
  SecTotalExpence, SecondFoodExpence, SecondTransportExpence,
  SecondPersonalExpence, SecondHousingExpence, SecondSavingExpence,
} from "../data/CalSecondMonthExpence.js";
import { fetchMonthlyData } from "../data/InputData.js";
import CurrentMonthList from "./MonthList/CurrentMonthList.jsx";
import SecondMonthList from "./MonthList/SecondMonthList.jsx";

// Define color schemes for pie chart slices
const pieColors = {
  food: "rgb(59, 192, 95)",
  housing: "rgb(66, 133, 244)",
  personal: "rgb(116, 180, 228)",
  transport: "rgb(251, 188, 5)",
  saving: "rgb(11, 209, 235)",
};

const labelColors = [pieColors.food, pieColors.housing, pieColors.personal, pieColors.transport, pieColors.saving];
const labels = ["Food", "Housing", "Personal expenses", "Transport", "Saving"];

export default function CompareTwoMonth() {
  // State for month labels and expense data
  const [monthNames, setMonthNames] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [secondData, setSecondData] = useState(null);

  // Load available month names on initial render
  useEffect(() => {
    const loadMonthNames = async () => {
      const results = await Promise.all(Array.from({ length: 6 }, (_, i) => fetchMonthlyData(i)));
      setMonthNames(results.map((r) => r.monthName.toUpperCase()));
    };
    loadMonthNames();
  }, []);

  // Load current and second month expense data
  useEffect(() => {
    const fetchData = async () => {
      const [
        currFood, currTransport, currPersonal, currSaving, currHousing, currTotal,
        secFood, secTransport, secPersonal, secSaving, secHousing, secTotal,
      ] = await Promise.all([
        CurrentFoodExpence(), CurrentTransportExpence(), CurrentPersonalExpence(),
        CurrentSavingExpence(), CurrentHousingExpence(), CurrentTotalExpence(),
        SecondFoodExpence(), SecondTransportExpence(), SecondPersonalExpence(),
        SecondSavingExpence(), SecondHousingExpence(), SecTotalExpence(),
      ]);

      // Set current month data
      setCurrentData({
        percentages: [
          currFood?.Foodpercentage || 0,
          currHousing?.Housing_percentage || 0,
          currPersonal?.Personal_percentage || 0,
          currTransport?.TransportPercentage || 0,
          currSaving?.Saving_percentage || 0,
        ],
        expenses: [
          currFood?.foodExpence || 0,
          currHousing?.housingExpence || 0,
          currPersonal?.personalExpence || 0,
          currTransport?.transportExpence || 0,
          currSaving?.savingExpence || 0,
        ],
        spended: currTotal.Spended || 0,
        balance: (currTotal?.TotalBudget || 0) - (currTotal?.Spended || 0),
      });

      // Set second month data
      setSecondData({
        percentages: [
          secFood?.Foodpercentage || 0,
          secHousing?.Housing_percentage || 0,
          secPersonal?.Personal_percentage || 0,
          secTransport?.TransportPercentage || 0,
          secSaving?.Saving_percentage || 0,
        ],
        expenses: [
          secFood?.foodExpence || 0,
          secHousing?.housingExpence || 0,
          secPersonal?.personalExpence || 0,
          secTransport?.transportExpence || 0,
          secSaving?.savingExpence || 0,
        ],
        spended: secTotal?.Spended || 0,
        balance: (secTotal?.TotalBudget || 0) - (secTotal?.Spended || 0),
      });
    };

    fetchData(); // Fetch all necessary data
  }, []);

  // Prepare data for bar graph using useMemo for performance
  const barData = useMemo(() => {
    if (!currentData || !secondData) return null;

    return {
      labels,
      datasets: [
        {
          type: "bar",
          label: monthNames[5], // Current month name
          data: currentData.expenses,
          backgroundColor: "rgb(130, 231, 130)", // Green
        },
        {
          type: "bar",
          label: monthNames[4], // Second month name
          data: secondData.expenses,
          backgroundColor: "rgb(126, 209, 254)", // Blue
        },
      ],
    };
  }, [currentData, secondData, monthNames]);

  // Reusable function to render each pie chart card
  const renderPieCard = (title, pieData, percentages, spended, balance) => (
    <div className="compare-two-month-pieBox bg-white w-full h-fit rounded-2xl p-5">
      <div className="font-medium text-xl mb-2">{title}</div>
      <div className="compare-two-month-pieCard flex justify-between">
        <div className="compare-two-month-pie w-[50%] flex justify-center h-[40vh] max-[1200px]:w-[60%] max-[900px]:w-[75%] max-[750px]:w-[85%] max-[500px]:w-[80%]">
          <PieChart key={JSON.stringify(pieData)} data={pieData} />
        </div>

        {/* Pie legend with percentages */}
        <div className="compare-two-month-pielist w-fit flex items-center mb-4">
          <ul className="w-full">
            {labels.map((label, idx) => (
              <li key={label} className="flex items-center gap-3 justify-between">
                <div className="flex flex-row items-center gap-3">
                  <div className="rounded-full h-[12px] w-[12px]" style={{ backgroundColor: labelColors[idx] }}></div>
                  <h1>{label}</h1>
                </div>
                <div>{percentages[idx].toFixed(1)}%</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Expense summary boxes below pie */}
      <div className="compare-two-month-expBox flex flex-row mt-5 gap-7 justify-center">
        <div className="compare-two-month-expBox-1 w-full py-3 rounded-xl border-1 flex px-4 justify-between bg-gray-200">
          <p className="text-xl">Expenses</p>
          <p className="text-lg font-semibold text-red-600">&#8377;{spended}</p>
        </div>

        <div className="compare-two-month-expBox-1 w-full py-3 rounded-xl border-1 flex px-4 justify-between bg-gray-200">
          <p className="text-xl">Balance</p>
          <p className="text-lg font-semibold text-green-600">&#8377;{balance}</p>
        </div>
      </div>
    </div>
  );

  
  // Show loading state if data hasn't loaded yet
  if (!currentData || !secondData || !barData) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  const isCurrentEmpty = currentData.expenses.every((val) => val === 0);
  const isSecondEmpty = secondData.expenses.every((val) => val === 0);

  if (isCurrentEmpty && isSecondEmpty) {
    return (
      <div className="bg-white w-full h-fit rounded-2xl p-10 text-center mt-20 text-gray-600 text-xl">
        No expense data available for the selected months.
      </div>
    );
  }

  // Pie chart configurations
  const currPieData = {
    labels,
    datasets: [
      {
        label: "Current Month",
        data: currentData.expenses,
        backgroundColor: labelColors,
        hoverOffset: 3,
      },
    ],
  };

  const secondPieData = {
    labels,
    datasets: [
      {
        label: "Second Month",
        data: secondData.expenses,
        backgroundColor: labelColors,
        hoverOffset: 3,
      },
    ],
  };

  return (
    <div className="mt-6">
      {/*  Bar Chart for Comparing Two Months  */}
      <div className="compare-two-month-bar bg-white w-full h-[61%] mt-4 rounded-2xl p-5">
        <div className="font-medium text-xl mb-7">Monthly Expenses</div>
        <div className="compare-two-month-bargraph w-[60%] h-full">
          <BarGraph data={barData} />
        </div>
      </div>

      {/*  Two Pie Charts for Visualizing Each Month  */}
      <div className="compare-two-month-piecontainer flex flex-row gap-4 mt-6 mb-6">
        {renderPieCard(monthNames[5], currPieData, currentData.percentages, currentData.spended, currentData.balance)}
        {
          secondData.expenses.every((val) => val === 0) ? (
            <div className="compare-two-month-pieBox bg-white w-full h-[470px] rounded-2xl p-5 flex items-center justify-center text-gray-600 text-lg">
              No expense data available for last month.
            </div>
          ) : (
            renderPieCard(monthNames[4], secondPieData, secondData.percentages, secondData.spended, secondData.balance)
          )
        }
      </div>

      <div className="compare-two-month-list flex flex-row gap-4 mt-6 mb-[200px]">
        <CurrentMonthList />
        {
          secondData.expenses.every((val) => val === 0) ? (
            <div className="bg-white w-full  h-[470px] rounded-2xl p-5 flex items-center justify-center text-gray-600 text-lg">
              No detailed expense data available for last month.
            </div>
          ) : (
            <SecondMonthList />
          )
        }

      </div>
    </div>
  );
}
