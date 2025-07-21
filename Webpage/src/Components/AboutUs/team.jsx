export default function Team() {
    return (
        <>
            <div >
                <h1 className='team-heading text-center text-5xl mx-20 mb-10 font-medium' style={{ color: "rgb(2, 62, 138)" }}>The Minds Behind This Magic</h1>

                <div className="team-box mx-60 flex">
                    <div className="flex-4  justify-items-center p-5" >
                        <div className="team justify-items-center p-5 rounded-lg">
                            <img src="/image/himanshu.png" alt="Himanshu Image" className='w-76 h-76 rounded-lg' style={{ borderRadius: "50%" }}></img>
                            <h3 className='text-2xl pt-5'>Himanshu Kumar</h3>
                            <p>Full Stack Web Developer</p>

                            <div className="icons mt-5 flex">
                                <a href="https://www.linkedin.com/in/himanshu-kumar-425aba292" target="_blank"><img src="/image/linkedin-icon.png" alt="linked-icon Image" className='w-6 mr-3 cursor-pointer' /></a>
                                <a href="https://github.com/Himanshu-kumar025" target="_blank"><img src="/image/github-icon.png" alt="github-icon Image" className='w-6 mr-3 cursor-pointer' /></a>
                                <a href="mailto:hk1832141@gmail.com" target="_blank"><img src="/image/gmail-icon.png" alt="gmail-icon Image" className='w-8 cursor-pointer' /></a>
                            </div>
                        </div>
                    </div>

                    <div className='team-btn-space flex-2'></div>

                    <div className="flex-4  justify-items-center p-5">
                        <div className="team justify-items-center p-5 rounded-lg">
                            <img src="/image/sudhanshu.png" alt="Sudhanshu Image" className='w-76 h-76 rounded-lg' style={{ borderRadius: "50%" }} />
                            <h3 className='text-2xl pt-5'>Sudhanshu Saini</h3>
                            <p>Full Stack Web Developer</p>

                            <div className="icons mt-5 flex">
                                <a href="https://www.linkedin.com/in/sudhanshusaini24" target="_blank"><img src="/image/linkedin-icon.png" alt="linked-icon Image" className='w-6 mr-3 cursor-pointer' /></a>
                                <a href="https://github.com/Sudhanshu248" target="_blank"><img src="/image/github-icon.png" alt="github-icon Image" className='w-6 mr-3 cursor-pointer' /></a>
                                <a href="mailto:sainisudhanshu389@gmail.com" target="_blank"><img src="/image/gmail-icon.png" alt="gmail-icon Image" className='w-8 cursor-pointer' /></a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}