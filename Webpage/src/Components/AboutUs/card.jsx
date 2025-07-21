export default function Card() {
    return (
        <>
            <h2 className='card-heading text-center text-5xl my-14 font-medium' style={{color: "rgb(2, 62, 138)"}}>Why We Are?</h2>
            <div className='card flex gap-40 mx-72 mb-28'>
                <div className='card-img flex-5'>
                    <img src="/image/about1.png" alt="About-1 Image" className='w-100 h-95 rounded-lg' />
                </div>

                <div className="card-text flex-5  justify-center">
                    <p>
                        We're are here to make financial well-being accessible to everyone. Our application is designed to be intuitive, secure, and packed with features that genuinely help you reach your financial goals, whether you're saving for something big, paying down debt, or just aiming for better daily budgeting.
                    </p>
                </div>
            </div>
        </>
    );
}