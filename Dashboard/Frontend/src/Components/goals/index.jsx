import { useState , useEffect} from "react";
import { goals as staticGoals } from "./goals.js";
import axios from "axios";


export default function GoalsPage() {
    
  const [GoalValue, setGoalValue] = useState({});
  const [savedGoals, setSavedGoals] = useState({});
  const [goals, setGoals] = useState([]); // Should be an array for mapping

 useEffect(() => {
  const fetchGoals = async () => {
    try {
      const response = await axios.get("http://localhost:8080/list/goals");
      console.log("Fetched goals:", response.data);
      // If response.data is an object, convert to array for mapping
      if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
        // Remove _id and userId fields, keep only goal fields
        const { _id, userId, __v, ...goalFields } = response.data;
        const goalsArr = Object.entries(goalFields).map(([name, value]) => ({ name, value }));
        setGoals(goalsArr);
      } else if (Array.isArray(response.data)) {
        setGoals(response.data);
      } else {
        setGoals([]);
      }
    } catch (error) {
      console.error("Error fetching goals:", error.message);
      setGoals([]);
    }
  };

  fetchGoals();
}, []);

console.log("Goals:", goals);
  
  useEffect(() => {
    const storedGoals = localStorage.getItem("savedGoals");
    const storedValues = localStorage.getItem("goalValues");
    
    if (storedGoals) {
      setSavedGoals(JSON.parse(storedGoals));
    }
    if (storedValues) {
      setGoalValue(JSON.parse(storedValues));
    }
  }, []);
  
  
  const handleInput = (name, value) => {
    setGoalValue((prev) => ({
      ...prev,
      [name]: value,
    }));
   
  };
  
  const handleSave = async(name) => {
    const value = parseFloat(GoalValue[name]);
    
    if (isNaN(value)) return;
    
    const totalValue = Object.entries(GoalValue).reduce((sum, [key, value]) => {
      const parsedValue = parseFloat(value);
      return sum + (isNaN(parsedValue) ? 0 : parsedValue);
    }, 0);
    
    if (totalValue > 1000) {
      alert("Total monthly expenses should not exceed ₹1000");
      return;
    }
    
    try {
      const respond = await axios.post( "http://localhost:8080/list/goals",
        { name, value },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 5000,
        }
      );
      
      if (respond.data) {
        console.log("Frontend response", respond.data);
    }

      const updatedSaved = { ...savedGoals, [name]: true };

      setSavedGoals(updatedSaved);
      localStorage.setItem("goalValues", JSON.stringify(GoalValue));
      localStorage.setItem("savedGoals", JSON.stringify(updatedSaved)); 

  } catch (error) {
    console.error("Error while saving goal:", error.message);
    alert("Failed to save goal. Please try again.");
  }
};

  const handleDelete = (name) => {
    setGoalValue((prev) => {
      const updated = { ...prev };
      delete updated[name];
      localStorage.setItem("goalValues", JSON.stringify(updated));
      return updated;
    });

    setSavedGoals((prev) => {
      const updated = { ...prev };
      delete updated[name];
      localStorage.setItem("savedGoals", JSON.stringify(updated));
      return updated;
    });
    console.log(`Delete goal value for ${name}! `);

  };

  

  return (
    <div className="flex">
      <div className="bg-[#B8D7DE8C] rounded-md mt-4 ml-64 h-[86.5vh] w-[60vw] grow">
        <h1 className="text-3xl text-emerald-900 font-bold ml-16 mt-6 mb-1.5">Goals</h1>
        <p className="ml-16">Set your monthly goals for different categories.</p>

        <section className="mt-7">
        {(goals.length > 0 ? goals : staticGoals).map((item) => (
          <div
            key={item.name}
            id={item.name}
            className="flex flex-row bg-white p-4 px-8 mx-auto mb-5 rounded-2xl justify-between"
            style={{ width: "90%" }}
          >
            <p className="text-2xl pt-1 font-medium">{item.name}</p>
            <div className="flex items-center mt-2">
              <span>&#8377;</span>
              {savedGoals[item.name] ? (
                <div className="ml-2">{GoalValue[item.name] ?? item.value ?? "N/A"}</div>
              ) : (
                <input
                  type="number"
                  placeholder="Enter Price"
                  className="pl-5 py-2 w-35 rounded-2xl ml-2"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                  value={GoalValue[item.name] ?? item.value ?? ""}
                  onChange={(e) => handleInput(item.name, e.target.value)}
                />
              )}

              {!savedGoals[item.name] && (
                <button
                  className="text-white px-8 py-2 rounded-3xl ml-6 cursor-pointer"
                  style={{ backgroundColor: "rgba(45, 83, 89, 1)" }}
                  onClick={() => handleSave(item.name)}
                >
                  Save
                </button>
              )}

              {savedGoals[item.name] && (
                <button
                  className="ml-3 cursor-pointer"
                  onClick={() => handleDelete(item.name)}
                >
                  <i className="fa-solid fa-trash text-[#2D5359]"></i>
                </button>
              )}
            </div>
          </div>
        ))}

        </section>
      </div>
    </div>
  );
}

