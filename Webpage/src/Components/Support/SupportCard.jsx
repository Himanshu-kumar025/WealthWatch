import "./style.css"
export default function SupportCard() {
    return (
        <>
            <h1 id="support-heading" className="text-center text-4xl font-semibold px-5 mt-18" style={{ color: "#023e8a" }}>Tips and Answer</h1>

            {/* Flips Card */}
            <div className="text-center flex flex-row flex-wrap align-item-center justify-center-safe px-8 mt-6 mb-12 gap-16">

                {/* Flip card 1 */}
                <div  className="flip-card  ">

                    <div className="flip-card-inner p-4">
                        <div id="card-one" className="flip-card-front flex flex-col py-8 px-2">
                            <img src="/image/ai.png" style={{ margin: "auto", height: "110px", width: "125px" }} alt="AI_image" />

                            <h1 className="font-semibold text-2xl text-blue-900 mt-4 text-shadow-lg">Budget Recommendation </h1>
                            <h1 className="font-semibold text-2xl text-blue-900 mt-4 text-shadow-lg">AI</h1>

                        </div>
                        <div className="flip-card-back">
                            <p className="text-white px-4">Smart AI analyzes your spending habits and recommends personalized monthly budgets to help you stay on track.</p>
                        </div>

                    </div>

                </div>

                {/* Flip card 2 */}
                <div className="flip-card  ">

                    <div className="flip-card-inner p-4">
                        <div className="flip-card-front flex flex-col py-8 px-2">
                            <img src="/image/statistics.png" style={{ margin: "auto", height: "110px", width: "125px" }} alt="static_image" />

                            <h1 className="font-semibold text-2xl text-blue-900 mt-4 text-shadow-lg">Track Cash Flow</h1>

                        </div>
                        <div className="flip-card-back">
                            <p className="text-white px-4">Monitor your income and expenses in real time to understand where your money goes and how it comes in.</p>
                        </div>

                    </div>

                </div>
                {/* Flip card 3 */}
                <div className="flip-card  ">

                    <div className="flip-card-inner p-4">
                        <div className="flip-card-front flex flex-col py-8 px-2">
                            <img src="/image/pie-chart.png" style={{ margin: "auto", height: "110px", width: "125px" }} alt="pie_image" />

                            <h1 className="font-semibold text-2xl text-blue-900 mt-4 text-shadow-lg">Expense Categorization</h1>

                        </div>
                        <div className="flip-card-back">
                            <p className="text-white px-4">Automatically categorize transactions to help you identify spending patterns and cut unnecessary costs.</p>
                        </div>

                    </div>

                </div>
                {/* Flip card 4 */}
                <div className="flip-card  ">

                    <div className="flip-card-inner p-4">
                        <div className="flip-card-front flex flex-col py-8 px-2">
                            <img src="/image/notification.png" style={{ margin: "auto", height: "110px", width: "125px" }} alt="notification_image" />

                            <h1 className="font-semibold text-2xl text-blue-900 mt-4 text-shadow-lg">Reminder & Alert</h1>

                        </div>
                        <div className="flip-card-back">
                            <p className="text-white px-4">Stay ahead with bill reminders, overspending alerts, and custom notifications tailored to your budget.</p>
                        </div>

                    </div>

                </div>
                {/* Flip card 5 */}
                <div className="flip-card  ">

                    <div className="flip-card-inner p-4">
                        <div className="flip-card-front flex flex-col py-8 px-2">
                            <img src="/image/shield.png" style={{ margin: "auto", height: "110px", width: "125px" }} alt="security_image" />

                            <h1 className="font-semibold text-2xl text-blue-900 mt-4 text-shadow-lg">Privacy & Security</h1>

                        </div>
                        <div className="flip-card-back">
                            <p className="text-white px-4">Your financial data is protected with bank-level encryption and secure cloud storage.
                                We never share or sell your information—privacy and safety come first.</p>
                        </div>

                    </div>

                </div>

                {/* Flip card 6 */}
                <div className="flip-card  ">

                    <div className="flip-card-inner p-4">
                        <div className="flip-card-front flex flex-col py-8 px-2">
                            <img src="/image/savings-plan.png" style={{ margin: "auto", height: "110px", width: "125px" }} alt="saving_plan_image" />

                            <h1 className="font-semibold text-2xl text-blue-900 mt-4 text-shadow-lg">Savings Plans</h1>

                        </div>
                        <div className="flip-card-back">
                            <p className="text-white px-4">Set savings goals and let the app guide you with automated plans and progress tracking.

                            </p>
                        </div>

                    </div>

                </div>



            </div>
        </>
    )
}