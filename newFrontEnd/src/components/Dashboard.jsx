import React from "react";

const Dashboard = () => {
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const inputValue = e.target.elements.inputField.value;

    // Send input value to FastAPI backend
    try {
      const response = await fetch("http://127.0.0.1:8000/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: inputValue }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <h1 className="text-center text-3xl font-bold mb-12">Dashboard</h1>
      <div className="grid grid-cols-2 gap-12">
        {/* Digital City */}
        <div className="bg-white shadow-lg p-8 rounded-xl min-h-[300px] flex flex-col justify-between">
          <h2 className="text-2xl font-bold mb-6">The Digital City 🏙️</h2>
          <div className="h-48 bg-gray-200 rounded-lg mb-6"></div>
          <div className="flex items-start gap-4">
            {/* Unordered List */}
            <ul className="text-lg space-y-2">
              <li>📊 Normal Services</li>
              <li>🔒 Traffic Flow</li>
              <li>⚠️ Anomalous Activity</li>
            </ul>

            {/* Input Field and Submit Button */}
            <form
              className="flex-1"
              onSubmit={handleSubmit} // Pass the function directly
            >
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

        {/* Daily Traffic Rhythms */}
        <div className="bg-white shadow-lg p-8 rounded-xl min-h-[300px] flex flex-col justify-between">
          <h2 className="text-2xl font-bold mb-6">Daily Traffic Rhythms 📊</h2>
          <div className="h-48 bg-gray-200 rounded-lg mb-6"></div>
          <p className="text-lg">
            Morning Rush → Suspicious Spike → Evening Wind-down
          </p>
        </div>

        {/* Digital Behavior Patterns */}
        <div className="bg-white shadow-lg p-8 rounded-xl min-h-[300px] flex flex-col justify-between">
          <h2 className="text-2xl font-bold mb-6">Digital Behavior Patterns 🔍</h2>
          <div className="h-48 bg-gray-200 rounded-lg mb-6"></div>
          <ul className="text-lg space-y-2">
            <li>🟢 Human Browsing</li>
            <li>🔴 Bot Activity</li>
            <li>🟠 Data Exfiltration</li>
          </ul>
        </div>

        {/* Detective Tools */}
        <div className="bg-white shadow-lg p-8 rounded-xl min-h-[300px] flex flex-col justify-between">
          <h2 className="text-2xl font-bold mb-6">Your Detective Tools 🕵️‍♂️</h2>
          <ul className="text-lg space-y-3">
            <li>🔍 <strong>Flow Analyzer:</strong> Your Digital Microscope</li>
            <li>📄 <strong>Pattern Matcher:</strong> Your Fingerprint Scanner</li>
            <li>🕷️ <strong>Anomaly Detector:</strong> Your Spidey Sense</li>
            <li>📊 <strong>Visualizer:</strong> Your Crime Board</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
