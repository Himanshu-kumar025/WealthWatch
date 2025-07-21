export default function Block() {
    return (
        <>
            <div className="text-center">

                <div className="blocks text-center flex flex-row mx-auto mt-14 justify-evenly align-item-center text-center gap-12 my-auto mx-auto py-6 w-full flex-wrap">

                    {/* Bouncing CARD */}
                    <div id="home-block" className="text-center  w-58   h-48 p-2 text-2xl font-semibold  bg-sky-100 hover:scale-105 bounce-1s " style={{ borderRadius: "30px" }}>
                        <img src="/image//shield.png" alt="block Image" style={{ height: "65px", width: "80px", margin: "auto" }} />
                        <h3 className="mt-6">100%</h3>
                        <h3 className=""> Secured data</h3>
                    </div>

                    {/* Bouncing CARD */}
                    <div id="home-block" className="text-center w-58 h-48  text-2xl font-semibold p-4 bg-sky-100 hover:scale-105  bounce-2s" style={{ borderRadius: "30px" }}>
                        <img src="/image//savings-plan.png" alt="Block Image" style={{ height: "65px", width: "80px", margin: "auto" }} />
                        <h3 className="mt-10">Saving plan</h3>
                    </div>

                    {/* Bouncing CARD */}
                    <div id="home-block" className="text-center w-58  h-48  text-2xl font-semibold p-4 bg-sky-100 hover:scale-105 bounce-3s" style={{ borderRadius: "30px" }}>
                        <img src="/image//ai.png" alt="Block Image" style={{ height: "65px", width: "80px", margin: "auto" }} />
                        <h3 className="mt-6">Advance AI</h3>
                        <h3 className="">Tech</h3>
                    </div>




                </div>
            </div>
        </>
    )
}