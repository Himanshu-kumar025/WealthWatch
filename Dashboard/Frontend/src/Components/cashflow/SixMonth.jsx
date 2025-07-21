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

        <div className={`bg-white w-full h-fit rounded-2xl px-5 py-6 `}>
          <CurrPie />
        </div>

        <div className={`bg-white w-full h-fit rounded-2xl px-5 py-6`}>
          <SecondPie />
        </div>

        <div className={`bg-white w-full h-fit rounded-2xl px-5 py-6`}>
          <ThirdPie />
        </div>

        <div className={`bg-white w-full h-fit rounded-2xl px-5 py-6`}>
          <ForthPie />
        </div>

        <div className={`bg-white w-full h-fit rounded-2xl px-5 py-6`}>
          <FifthPie />
        </div>

        <div className={`bg-white w-full h-fit rounded-2xl px-5 py-6`}>
          <SixthPie />
        </div>

      </div>


    </>
  )
}
