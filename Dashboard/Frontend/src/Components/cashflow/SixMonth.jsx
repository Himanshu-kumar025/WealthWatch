import CurrPie from "./pie/CurrentMonthpie"
import SecondPie from "./pie/SecondMonthpie"
import ThirdPie from "./pie/thirdMonthpie"
import ForthPie from "./pie/ForthMonthpie"
import FifthPie from "./pie/FifthMonthpie"
import SixthPie from "./pie/SixthMonthpie"

export default function SixMonth() {

  return (
    <>

      <div className="sixmonth grid grid-cols-2 gap-3 mt-8 w-full h-fit mb-[200px]">

        <CurrPie />

        <SecondPie />

        <ThirdPie />

        <ForthPie />

        <FifthPie />

        <SixthPie />

      </div>


    </>
  )
}
