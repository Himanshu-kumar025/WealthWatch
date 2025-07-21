import { useNavigate } from "react-router-dom";
import FifthMonth from "../MonthList/FifthMonth.jsx";

export default function FifthIndividual() {

    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/cashflow/SixMonth')
    }

    return (
        <>

            <div className='flex flex-row '>
                <div className="c-individual bg-[#B8D7DE8C] rounded-md mt-4 ml-64  h-fit w-[60vw]  grow px-12 py-8">

                    <div className=" mb-8">
                        <button className="bg-[#2D5359] text-white text-[20px] font-medium rounded-lg px-5 py-1" onClick={handleBack}><i className="fa-solid fa-arrow-left"></i> &nbsp;Back</button>
                    </div>

                    <div>
                        <FifthMonth />
                    </div>

                </div>
            </div>

        </>
    )
}