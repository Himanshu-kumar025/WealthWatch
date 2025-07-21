import { DASHBOARD_URL } from '../../../../backend/axiosConfig';
import './style.css';
import { Link } from "react-router-dom";

export default function PhoneBar() {
return (
        <>

                {/* <div className="phone-bar flex flex-row justify-evenly items-center text-white text-[20px] w-full h-full"> */}
                <div className="phone-bar flex flex-row pt-4 justify-evenly items-center text-white py-3 text-[15px] max-[450px]:text-[13px] w-full h-full">
                    <Link
                        to={`${DASHBOARD_URL}/dashboard`}
                    >
                        <div className="flex flex-col items-center justify-between">
                            <i className="fa-solid fa-house-user"></i>
                            <span>Home</span>
                        </div>
                    </Link>
                    <Link
                        to={`${DASHBOARD_URL}/cashflow`}
                    >
                        <div className="flex flex-col items-center justify-between">
                            <i className="fa-solid fa-money-bill"></i>
                            <span>Cashflow</span>
                        </div>
                    </Link>
                    <Link
                        to={`${DASHBOARD_URL}/goals`}
                    >
                        <div className="flex flex-col items-center justify-between">
                            <i className="fa-solid fa-bullseye"></i>
                            <span>Goals</span>
                        </div>
                    </Link>
                    <Link
                        to={`${DASHBOARD_URL}/historys`}
                    >
                        <div className="flex flex-col items-center justify-between">
                            <i className="fa-solid fa-clock-rotate-left"></i>
                            <span>History</span>
                        </div>
                    </Link>
                    <Link
                        to={`${DASHBOARD_URL}/blogs`}
                    >
                        <div className="flex flex-col items-center justify-between">
                            <i className="fa-solid fa-blog"></i>
                            <span>Blogs</span>
                        </div>
                    </Link>
                </div>
                {/* </div> */}
        </>
    );
}
