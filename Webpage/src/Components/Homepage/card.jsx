export default function Card() {
    return (
        <>
            <div className="px-12 py-4 max-[600px]:px-2 mx-auto my-8">

                {/* section-1 */}
                <div className="cards grid grid-cols-2 px-6 py-8 mx-4 my-8 max-[750px]:grid-cols-1 max-[750px]:text-center flex justify-center items-center gap-12">

                    <div className="text-center flex order-1 max-[750px]:order-2 flex justify-center items-center">

                        <img className="w-[20rem] pr-3 mr-4 justify-center flex align-center rounded-lg ml-16" src="/image/home1.png" alt="Home-1 Image" />
                    </div>

                    <div className="cards-text text-center order-2 flex max-[750px]:order-1 mt-2 max-[750px]:text-center flex flex-col justify-center items-center gap-8">
                        <h1 className="text-center max-[750px]:text-center text-4xl font-bold max-[840px]:text-3xl " style={{ color: "#023e8a" }}>Daily Bases Tracking</h1>
                        <p className="text-gray-600 px-15">Quickly record your daily transactions in just seconds. Easily sort them into clear categories like Food, Shopping, Salary, or Gifts.</p>
                    </div>

                </div>
               
                {/* section-2 */}
                <div className="cards grid grid-cols-2 px-6 py-8 mx-4 my-8 max-[750px]:grid-cols-1 max-[750px]:text-center flex justify-center items-center gap-12">

                    <div className="cards-text text-center order-1 flex max-[750px]:order-1 mt-2 max-[750px]:text-center flex flex-col justify-center items-center gap-8">
                        <h1 className="text-center max-[750px]:text-center text-4xl font-bold max-[965px]:text-[33px] max-[890px]:text-3xl " style={{ color: "#023e8a" }}>Everything in one view</h1>
                        <p className="text-gray-600 px-15">Get a full view of your spending in one easy-to-read report.Visual graphs help you understand where your money comes from and where it goes.</p>
                    </div>

                    <div className="text-center flex order-2 max-[750px]:order-2 flex justify-center items-center">
                        <img className="w-[20rem] pr-3 mr-4 justify-center flex align-center rounded-lg ml-16" src="/image/home2.png" alt="Home-2 Image" />
                    </div>

                </div>


                {/* section-3 */}
                
                <div className="cards grid grid-cols-2 px-6 py-8 mx-4 my-8 max-[750px]:grid-cols-1 max-[750px]:text-center flex justify-center items-center gap-12">

                    <div className="text-center flex order-1 max-[750px]:order-2 flex justify-center items-center">
                        <img className="w-[20rem] pr-3 mr-4 justify-center flex align-center rounded-lg ml-16" src="/image/home3.png" alt="Home-3 Image" />
                    </div>

                    <div className="cards-text text-center order-2 flex max-[750px]:order-1 mt-2 max-[750px]:text-center flex flex-col justify-center items-center gap-8">
                        <h1 className="text-center max-[750px]:text-center text-4xl font-bold max-[840px]:text-3xl " style={{ color: "#023e8a" }}>AI- Budget Recommendation</h1>
                        <p className="text-gray-600 px-20">We help you build a budget that fits your life. Based on how you spend, we suggest smart ways to manage your money and save more.</p>
                    </div>

                </div>
                
                {/* section-4 */}
                <div className="cards grid grid-cols-2 px-6 py-8 mx-4 my-8 max-[750px]:grid-cols-1 max-[750px]:text-center flex justify-center items-center gap-12">

                    <div className="cards-text text-center order-1 flex max-[750px]:order-1 mt-2 max-[750px]:text-center flex flex-col justify-center items-center gap-8">
                        <h1 className="text-center max-[750px]:text-center text-4xl font-bold max-[840px]:text-3xl " style={{ color: "#023e8a" }}>Anomaly  Detection</h1>
                        <p className="text-gray-600 px-15">We will alert you to expenses that are higher than your average or appear to be unusual, ensuring you stay informed about your financial activity.</p>
                    </div>

                    <div className="text-center flex order-2 max-[750px]:order-2 flex justify-center items-center">
                        <img className="w-[20rem] pr-3 mr-4 justify-center flex align-center rounded-lg ml-16" src="/image/home4.png" alt="Home-4 Image" />
                    </div>

                </div>


            </div>


        </>
    )
}