import React from "react";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <h1 className="text-center text-3xl font-bold mb-12">Dashboard</h1>
      <div className="grid grid-cols-2 gap-12">
        {/* Digital City */}
        <div className="bg-white shadow-lg p-8 rounded-xl min-h-[300px] flex flex-col justify-between">
          <h2 className="text-2xl font-bold mb-6">The Digital City 🏙️</h2>
          <div className="h-48 bg-gray-200 rounded-lg mb-6"></div>
          <ul className="text-lg space-y-2">
            <li>📊 Normal Services</li>
            <li>🔒 Traffic Flow</li>
            <li>⚠️ Anomalous Activity</li>
          </ul>
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
