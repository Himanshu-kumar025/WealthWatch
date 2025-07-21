import { CategoryScale, Chart as ChartJS, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarGraph({ data }) {
    return <Bar data={data} />;
}