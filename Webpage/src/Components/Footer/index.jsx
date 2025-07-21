import "./style.css"
import { DASHBOARD_URL } from "../../../../../Dashboard/backend/axiosConfig";

export default function Footer() {

    return (
        <>
            <div>
                <div className="mt-5">
                    <footer className="text-center text-white" style={{ backgroundColor: "#4193ff" }}>
                        <div>
                            <section className="mt-5 text-center p-3">
                                <div id="links" className="pt-5 flex flex-row justify-center gap-10">
                                    <div className="col-md-2">
                                        <h6>
                                            <a href="/" className="text-white">Home</a>
                                        </h6>
                                    </div>
                                    <div className="col-md-2">
                                        <h6>
                                            <a href="/aboutus" className="text-white">About US</a>
                                        </h6>
                                    </div>
                                    <div className="col-md-2">
                                        <h6 >
                                            <a href="/support" className="text-white">Support</a>
                                        </h6>
                                    </div>
                                    <div className="col-md-2">
                                        <h6>
                                            <a href={`${DASHBOARD_URL}/signup`} className="text-white">Sign up</a>
                                        </h6>
                                    </div>
                                </div>
                            </section>

                            <hr className="my-5" />

                            <section className="mb-5 p-7">
                                <div>
                                    <div >
                                        <p id="footer-text" className="px-40">
                                            Take control of your financial future, today with WealthWatch – your trusted partner for smart spending, savvy saving, and achieving your money goals. Your journey to financial freedom starts here.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section id="icons" className="text-center mb-5 p-5">
                                <a href="https://t.me/aashu_025" target="_blank" className="text-white me-4">
                                    <i className="fa-brands fa-telegram fa-lg" style={{ color: "#fff" }}></i>
                                </a>
                                <a href="mailto:sainisudhanshu389@gmail.com " target="_blank" className="text-white me-4">
                                    <i className="fa-regular fa-envelope" style={{ color: "#fff" }}></i>
                                </a>
                                <a href="https://www.instagram.com/beast__ashu__/" target="_blank" className="text-white me-4">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/sudhanshusaini24" target="_blank" className="text-white me-4">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href="https://github.com/Himanshu-kumar025" target="_blank" className="text-white me-4">
                                    <i className="fab fa-github"></i>
                                </a>
                            </section>
                        </div>

                        <div
                            className="text-center p-5"
                            style={{ backgroundColor: "rgb(2, 62, 138)" }}
                        >
                            &copy; 2025 Copyright: &nbsp;
                            <a className="text-white" href="/" style={{ color: "#4193FF", fontWeight: "500" }}>
                                WealthWatch

                            </a>
                            &nbsp;
                            All Rights Reserved.
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}