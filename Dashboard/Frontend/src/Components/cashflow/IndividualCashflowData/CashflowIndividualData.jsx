import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CurrentIndividualData from './CurrentIndividualData';
import SecondIndividualData from './SecondIndividualData';
import ThirdIndividualData from './ThirdIndividualData';
import FifthIndividualData from './FifthIndividualData';
import SixthIndividualData from './SixthIndividualData';
import ForthIndividualData from './ForthIndividualData';

import { fetchMonthlyData } from '../../data/InputData';

export default function CashflowIndividualData() {

    // Get month and urlId from URL parameters
    const { month, urlId } = useParams();

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

    // Render appropriate component based on month name
    switch (month) {
        case MonthName[0]:
            return <SixthIndividualData urlId={urlId} />;
        case MonthName[1]:
            return <FifthIndividualData urlId={urlId} />;
        case MonthName[2]:
            return <ForthIndividualData urlId={urlId} />;
        case MonthName[3]:
            return <ThirdIndividualData urlId={urlId} />;
        case MonthName[4]:
            return <SecondIndividualData urlId={urlId} />;
        case MonthName[5]:
            return <CurrentIndividualData urlId={urlId} />;
        default:
            return <div>Not Found</div>; // Fallback if month doesn't match
    }
}
