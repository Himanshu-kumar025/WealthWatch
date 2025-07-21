import CurrentIndividual from "./CurrentIndividual.jsx";
import SixthIndividual from "./SixthIndividual.jsx";
import FifthIndividual from "./FifthIndividual.jsx";
import ForthIndividual from "./ForthIndividual.jsx";
import ThirdIndividual from "./ThirdIndividual.jsx";
import SecondIndividual from "./SecondIndividual.jsx";
import { useState, useEffect } from "react";
import { fetchMonthlyData } from "../../data/InputData.js";

export default function CashflowIndividual() {
   // Store names of the last 6 months
   const [MonthName, setMonthName] = useState([]);

   useEffect(() => {
      // Fetch data for the last 6 months on component mount
      const loadAllData = async () => {
         const promises = Array.from({ length: 6 }, (_, i) => fetchMonthlyData(i));
         const results = await Promise.all(promises);
         const name = Array.from({ length: 6 }, (_, i) => results[i].monthName.toUpperCase());
         setMonthName(name);
      };

      loadAllData();
   }, []);

   return (
      <>
         {/* Render current month component based on dynamic route */}
         {
            location.pathname == `/cashflow/SixMonth/${MonthName[5]}` &&
            <CurrentIndividual />
         }

         {/* Render second most recent month */}
         {
            location.pathname == `/cashflow/SixMonth/${MonthName[4]}` &&
            <SecondIndividual />
         }

         {/* Render third most recent month */}
         {
            location.pathname == `/cashflow/SixMonth/${MonthName[3]}` &&
            <ThirdIndividual />
         }

         {/* Render fourth most recent month */}
         {
            location.pathname == `/cashflow/SixMonth/${MonthName[2]}` &&
            <ForthIndividual />
         }

         {/* Render fifth most recent month */}
         {
            location.pathname == `/cashflow/SixMonth/${MonthName[1]}` &&
            <FifthIndividual />
         }

         {/* Render sixth most recent month */}
       {
         location.pathname == `/cashflow/SixMonth/${MonthName[0]}` &&
         <SixthIndividual />
       }
      </>
   )
}
