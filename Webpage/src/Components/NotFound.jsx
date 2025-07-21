import { useNavigate } from 'react-router-dom';

export default function NotFound() {

    const navigate = useNavigate();

    const handleclick = () => {
        navigate("/");
    }

    return(
        <>
            <div className=" ">
                
                <button className="text-center m-4  px-5 max-[500px]:px-3 mb-17 py-2 font-bold font-sm text-white rounded-md hover:scale-105 cursor-pointer"
                    style={{ backgroundColor: "#023e8a" }} onClick={handleclick}>
                    <i className="fa-solid fa-arrow-left" style={{ color: "#fff" }}></i> &nbsp;
                    Home Page
                </button>
            <div className="text-center px-10 max-[500px]:px-5 flex flex-col items-center h-[50vh] justify-center ">
                <h1 className='mb-5 text-6xl font-medium max-[700px]:text-5xl  max-[500px]:text-4xl' style={{ color: "#023e8a" }}>404 Not Found!</h1>
                <p className='text-xl max-[700px]:text-lg max-[500px]:text-md text-gray-500'>Sorry, The page you’re looking for doesn’t exist. Try going back to the HomePage.</p>
            </div>
            </div>
        </>
    )

}