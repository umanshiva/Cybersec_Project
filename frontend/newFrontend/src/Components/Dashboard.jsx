import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import StackedBarGraph from "./StackedGraph";

const Dashboard = () => {
  const [logs, setLogs] = useState([]); // Store the last 5 POS logs
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Auto-hide after 3 seconds
  };

  // Fetch the last 5 POS logs when the component mounts
  const fetchLogs = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No authorization token found");
      return; // Early return if there's no token
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/get-last-pos-logs/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLogs(data); // Update logs with the response
      } else {
        console.error("Error fetching logs:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('access_token');
        console.log(token)
      try {
        const response = await fetch(`http://localhost:8000/verify-token/${token}`);

        if (!response.ok) {
          throw new Error('Token verification failed');
        }
        navigate('/dashboard')
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    verifyToken();


    fetchLogs(); // Fetch logs on component mount
  }, [navigate]);

  // Handle POS log submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.inputField.value; // Get input value

    const token = localStorage.getItem("access_token"); // Retrieve the stored token from localStorage

    // console.log(token)
    if (!token) {
      console.error("No authorization token found");
      return; // Early return if there's no token
    }

    try {
      console.log("VV", inputValue)
      const response = await fetch("http://127.0.0.1:8000/upload-pos-logs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({ new_pos: inputValue }), // Send the input data as JSON
      });

      if (response.ok) {
        const result = await response.json();
        console.log("POS log submitted:", result);
        console.log(result.is_anomalous)
        if(result.is_anomalous){
          alert("maa chud gayi")
          handleShowToast()
          console.log("ITS ANOMALOUS")
        }
        fetchLogs(); // Refetch the last 5 logs after submitting
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
          {showToast && (
            <div className="fixed bottom-4 right-4 bg-red-600 text-white text-sm sm:text-base px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-slide-in">
  <span>
    Something went wrong! Please check and try again. 
  </span>
  <button
    onClick={() => setShowToast(false)}
    className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded-full transition"
  >
    
    <svg fill="#ffffff" height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490 490" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "></polygon> </g></svg>
  </button>
</div>

      )}
      <h1 className="text-center text-3xl font-bold mb-12">Dashboard</h1>
      <div className="grid grid-cols-2 gap-12">
        {/* POS LOG Input */}
        <div className="bg-white shadow-lg p-8 rounded-xl min-h-[300px] flex flex-col justify-between">
          <h2 className="text-2xl font-bold mb-6">The Digital City 🏙️</h2>
          <div className="h-48 bg-gray-200 rounded-lg mb-6"></div>
          <StackedBarGraph />
          <div className="flex items-start gap-4">
            {/* Unordered List */}
            <ul className="text-lg space-y-2">
              <li>📊 Normal Services</li>
              <li>🔒 Traffic Flow</li>
              <li>⚠️ Anomalous Activity</li>
            </ul>

            {/* Input Field and Submit Button */}
            <form className="flex-1" onSubmit={handleSubmit}>
              <div className="relative w-full">
                <input
                  id="inputField"
                  name="inputField"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 border border-slate-200 rounded-md pl-3 pr-16 py-2 text-lg transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Enter String"
                />
                <button
                  className="absolute right-1 top-1 rounded bg-slate-800 py-1 px-4 border border-transparent text-center text-lg text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white shadow-lg p-8 rounded-xl min-h-[300px] flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">The Last 5 POS Logs 📊</h2>

        <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse rounded-lg overflow-hidden shadow-md">
              <thead className="bg-gray-100 text-sm font-semibold text-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left">Transaction ID</th>
                  <th className="px-6 py-3 text-left">Item Code</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr
                    key={log.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="px-6 py-4 text-gray-800">{log.transaction_id}</td>
                    <td className="px-6 py-4 text-gray-800">{log.item_code}</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">{log.amount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                          log.is_anomalous ? "bg-red-500" : "bg-green-500"
                        }`}
                      >
                        {log.is_anomalous ? "Anomalous" : "Normal"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* The remaining cards */}
      <div className="grid grid-cols-2 gap-12">
        <div className="bg-white shadow-lg p-8 rounded-xl min-h-[300px] flex flex-col justify-between">
          <h2 className="text-2xl font-bold mb-6">Daily Traffic Rhythms 📊</h2>
          <div className="h-48 bg-gray-200 rounded-lg mb-6"></div>
          <p className="text-lg">
            Morning Rush → Suspicious Spike → Evening Wind-down
          </p>
        </div>

        <div className="bg-white shadow-lg p-8 rounded-xl min-h-[300px] flex flex-col justify-between">
          <h2 className="text-2xl font-bold mb-6">Digital Behavior Patterns 🔍</h2>
          <div className="h-48 bg-gray-200 rounded-lg mb-6"></div>
          <ul className="text-lg space-y-2">
            <li>🟢 Human Browsing</li>
            <li>🔴 Bot Activity</li>
            <li>🟠 Data Exfiltration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
