import { useParams } from 'react-router-dom';
import { fetchMonthlyData } from '../../data/InputData';
import CurrentHistoryIndividual from './CurrentMonth_Data';
import SecondHistoryIndividual from './SecondMonth_Data'
import ThirdHistoryIndividual from './ThirdMonth_Data';
import ForthHistoryIndividual from './ForthMonth_Data';
import FifthtHistoryIndividual from './FifthMonth_Data';
import SixthHistoryIndividual from './SixthMonth_Data';
import { useState, useEffect } from 'react';

export default function HistoryIndividualRouter() {


    const [MonthName, setMonthName] = useState([]);
    const { month, urlId } = useParams();

    useEffect(() => {
        const loadAllData = async () => {
            const promises = Array.from({ length: 6 }, (_, i) => fetchMonthlyData(i));
            const results = await Promise.all(promises);
            const name = Array.from({ length: 6 }, (_, i) => results[i].monthName.toUpperCase());
            setMonthName(name);
        };

        loadAllData();
    }, []);


    switch (month) {
        case MonthName[0]:
            return <SixthHistoryIndividual urlId={urlId} />;
        case MonthName[1]:
            return <FifthtHistoryIndividual urlId={urlId} />;
        case MonthName[2]:
            return <ForthHistoryIndividual urlId={urlId} />;
        case MonthName[3]:
            return <ThirdHistoryIndividual urlId={urlId} />;
        case MonthName[4]:
            return <SecondHistoryIndividual urlId={urlId} />;
        case MonthName[5]:
            return <CurrentHistoryIndividual urlId={urlId} />;


        default:
            return <div>Not Found</div>;
    }
}
