import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../backend/axiosConfig.js";

export default function AddDailyRecord() {
    const [category, setCategory] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleSave = async () => {
        try {
            // Retrieve the JWT token from local storage for authentication
            const token = localStorage.getItem("token");

            // If no token is found, notify the user and exit the function
            if (!token) {
                alert("Please login first.");
                return ;
            }

            // Send a POST request to save the daily record
            const response = await axios.post(`${BASE_URL}/dashboard`,
                {
                    category,
                    paymentMethod,
                    date,
                    name,
                    price
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token, // Attach the token to the Authorization header
                    },
                    timeout: 5000, // Set request timeout
                });

            // If the response is successful, reset input fields and show success message
            if (response.data) {
                setCategory("");
                setPaymentMethod("");
                setDate("");
                setName("");
                setPrice("");

                setSuccess(true);            // Show success message
                setTimeout(() => {
                    setSuccess(false);// Hide success message after 5 seconds
                }, 5000);
            }
        } catch (error) {
            setError(true);            // Show Error message
            setTimeout(() => {
                setError(false);// Hide Error message after 5 seconds
            }, 5000);
            alert("Failed to save daily record. Please try again.");
            return res.status(500).json({ message: error.message });
        }
    }


    const handleSuccess = () => {
        setSuccess(false)
    }
    const handleError = () => {
        setError(false)
    }

    return (
        <>


            {/* Add Daily  Record box */}

            <div className=" flex flex-col   h-fit  my-2">
                {/* Heading */}
                <div className=" mb-5">
                    <h1 className="text-[1.4rem] font-semibold text-start ">Add Daily Record</h1>
                </div>

                {/* Success Message */}
                {success && <div className="flex flex-row mb-1 w-1/2 justify-between" style={{
                    backgroundColor: "#d4edda",
                    border: "1px solid #c3e6cb",
                    color: "#155724",
                    padding: "5px",
                    borderRadius: "5px",
                    marginTop: "10px"
                }}>
                    <div> Daily Record Saved Successfully!</div>
                    <button onClick={handleSuccess}><i className="fa-solid fa-xmark"></i></button>
                </div>}

                {/* Error  Message */}
                {error && <div className="flex flex-row m-auto justify-between w-full" style={{
                    backgroundColor: "#efb0abff",
                    border: "1px solid #d48377ff",
                    color: "#c10000ff",
                    padding: "10px",
                    borderRadius: "5px",
                    marginTop: "10px"
                }}>
                    <div> Failed to save daily record. Please try again.</div>

                    <button onClick={handleError}><i className="fa-solid fa-xmark"></i></button>
                </div>}



                {/* block 1 */}
                <div className="add-daily-b-1 flex flex-row justify-between my-2 mb-4">
                    <input type="text" placeholder="Enter Product name" value={name} className="w-[40%] h-[30px] max-[600px]:px-[5px] max-[450px]:px-[24px] bg-gray-200 rounded-md p-6 add-b" onChange={(e) => setName(e.target.value)} />
                    <select
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-gray-200 text-gray-500 rounded-md w-[40%] h-[40px] p-2 add-b h-[40px]"
                        style={{ border: "none", outline: "none" }}
                    >
                        <option value="" disabled>Category</option>
                        <option value="food">Food</option>
                        <option value="transport">Transport</option>
                        <option value="personal">Personal</option>
                        <option value="housing">Housing</option>
                        <option value="saving">Saving</option>
                    </select>
                </div>

                {/* block 2 */}
                <div className="add-daily-b-2 flex flex-row justify-between my-2">
                    <input type="number" min={0} placeholder="Enter Price" value={price} className="w-[40%] h-[30px] max-[600px]:px-[5px] max-[450px]:px-[24px] bg-gray-200 rounded-md p-6 add-b" onChange={(e) => setPrice(e.target.value)} />
                    <input type="date" placeholder="Date" value={date} className="w-[40%] text-gray-500 h-[30px] bg-gray-200 rounded-md p-6 add-b" onChange={(e) => setDate(e.target.value)} />
                </div>

                {/* block 3 */}
                <div className="add-daily-b-3 flex flex-row  my-2 text-start">
                    <select
                        id="payment_method"
                        name="payment_method"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="bg-gray-200 text-gray-500 rounded-md w-[40%] h-[40px] p-2 add-b"
                        style={{ border: "none", outline: "none" }}
                    >
                        <option value="" disabled>Payment Method</option>
                        <option value="UPI">UPI</option>
                        <option value="Cash">Cash</option>
                        <option value="Card">CARD</option>
                    </select>
                </div>
                    {/* Saved Button */}
                    <div className=" my-2 text-end">
                        <button className="bg-[#2D5359] text-white text-[20px] font-medium rounded-lg px-5 py-1 cursor-pointer" onClick={handleSave} >&nbsp;Save</button>
                    </div>

            </div>

        </>
    )
}