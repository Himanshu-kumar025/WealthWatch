import { useNavigate } from 'react-router-dom';

export default function NotFound() {

    const navigate = useNavigate();

    const handleclick = () => {
        navigate("/");
    }

    return(
        <>
            <div className=" ">
                
                <button className="max-[1030px]:hidden text-center m-4 px-5 max-[500px]:px-3 bg-[#2D5359] mb-17 py-2 font-bold font-sm text-white rounded-md hover:scale-105 cursor-pointer"
                     onClick={handleclick}>
                    <i className="fa-solid fa-arrow-left" style={{ color: "#fff" }}></i> &nbsp;
                    Dashboard
                </button>
            <div className="text-center px-10 max-[1030px]:mt-[120px] max-[500px]:px-5 flex flex-col items-center h-[50vh] justify-center ">
                <h1 className='mb-5 text-6xl max-[700px]:text-5xl font-medium max-[500px]:text-4xl text-emerald-900'>404 Not Found!</h1>
                <p className='text-xl max-[700px]:text-lg max-[500px]:text-md text-gray-500'>Sorry, The page you’re looking for doesn’t exist. Try going back to the Dashboard.</p>
            </div>
            </div>
        </>
    )

}