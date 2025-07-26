import { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../axiosConfig.js";
import { useNavigate } from "react-router-dom";

export default function BudgetRecommendation() {
  const navigate = useNavigate();
  
  const chatEndRef = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  // Auto-scroll to bottom when new response is added
  useEffect(() => {
      if (chatEndRef.current) {
          chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
  }, [response]);

  // Handles the "Back" button click and navigates to the dashboard
  const handleAction = () => {
      navigate('/dashboard');
  }

  // Handles sending the user's prompt to the backend and updating the response
  const handleQuery = async () => {
    // Prevent sending empty or whitespace-only prompts
    if (!prompt.trim()) return;

    setLoading(true);
    setPrompt("");

    // Add the user prompt to the response array with loading set to true
    setResponse((prev) => [
        ...prev,
        { prompt, response: null, loading: true }
    ]);

    try {
      // Send POST request to backend with prompt and token
      const res = await fetch(`${BASE_URL}/ask/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      // If response is successful, update the last item with the result
      if (res.ok) {
        setResponse((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            prompt,
            response: data.result,
            loading: false,
          };
          return updated;
        });
      } else {
        // If response failed, update the last item with a failure message
        setResponse((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            prompt,
            response: "Failed to connect to the server.",
            loading: false,
          };
          return updated;
        });
      }

    } catch (err) {
        // Catch network or unexpected errors and push a failure message
        setResponse((prev) => [
          ...prev,
          { prompt, response: "Failed to connect to the server." }
        ]);

    } finally {
        // End loading state
        setLoading(false);
    }
  };

  // JSX Return
  return (
    <div className="bg-[#B8D7DE8C] dashboaard-right mb-[80px] rounded-md mt-4 h-full w-[85vw] md:w-[300px] pt-6 px-5 dashboard"
      style={{ position: "fixed", right: 0, overflowY: "auto" }}
    >
      <div className=" mb-8">
        <button className="bg-[#2D5359] text-white text-[20px] font-medium  rounded-lg px-5 py-1 cursor-pointer" onClick={handleAction} ><i className="fa-solid fa-arrow-left"></i> &nbsp;Back</button>
      </div>

      <div className="ai-box bg-white rounded-2xl mb-6 overflow-y-auto" style={{ paddingBlock: "1.5rem", paddingInline: "0.2rem", fontFamily: "sans-serif", height: "55vh"}}>
        {response.map((item, index) => (
          <div key={index} className="mb-6 flex flex-col gap-4 mx-4">
            {/* User Prompt */}
            <div className="flex justify-end items-start gap-3">
              <div className="bg-emerald-100 text-gray-700 p-4 max-[500px]:px-2 rounded-xl max-w-[75%] shadow-md">
                <p className="text-[17px] max-[500px]:text-[15px] font-bold text-emerald-900 mb-2">You:</p>
                <p className="whitespace-pre-wrap max-[500px]:text-[14px]">{item.prompt}</p>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex justify-start items-start gap-4">
              <div className="bg-gray-100 text-gray-600 p-4 max-[500px]:px-2 rounded-xl max-w-[75%] shadow-md">
                <p className="text-[17px] max-[500px]:text-[15px] font-bold text-emerald-900 mb-4">AI:</p>
                {item.loading ? (
                  <div className="flex items-center gap-2">
                    <div className="bg-emerald-300 w-2 h-2 rounded-full animate-bounce [animation-delay:.1s]"></div>
                    <div className="bg-emerald-300 w-2 h-2 rounded-full animate-bounce [animation-delay:.3s]"></div>
                    <div className="bg-emerald-300 w-2 h-2 rounded-full animate-bounce [animation-delay:.5s]"></div>
                    <span className="ml-2 text-sm text-emerald-700">AI is thinking...</span>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap max-[500px]:text-[14px]">{item.response}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="flex flex-row gap-7 mb-[80px] max-[600px]:gap-4 max-[600px]:items-center">
        <textarea
          rows="2"
          placeholder="Ask Anything... Eg: Give me a budget plan for 10,000 INR per month."
          value={prompt}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
          className="bg-white rounded-full pl-8 pr-8 py-3 w-[90%] max-[600px]:rounded-xl max-[600px]:hidden"
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Full Text Button for larger screens */}
        <button
          onClick={handleQuery}
          disabled={loading}
          className="bg-[#2D5359] text-white text-[23px] font-medium rounded-lg px-4 py-[0.6rem] cursor-pointer w-[9rem] max-[600px]:hidden"
          style={{ margin: "auto" }}
        >
          Send &nbsp;
          <i className="fa-solid fa-arrow-right" style={{ color: "#fff" }}></i>
        </button>

        {/* Icon-Only Button for mobile (<=600px) */}
        <textarea
          rows="2"
          placeholder="Ask Anything..."
          value={prompt}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
          className="bg-white rounded-full pl-8 pr-8 py-3 w-[90%] max-[600px]:rounded-xl max-[600px]:block hidden"
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={handleQuery}
          disabled={loading}
          className="bg-[#2D5359] p-3 rounded-full max-[600px]:block hidden flex justify-center"
        >
          <img src="/image/sendIcon.png" alt="Send-icon Image" className="w-[30px] h-[30px]" />
        </button> 
      </div>
    </div>
  );
};