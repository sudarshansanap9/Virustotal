import React, { useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    Tooltip,
    XAxis, YAxis
} from "recharts";

const ChartComponent = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/amey.json");
      const jsonData = await response.json();
      processData(jsonData);
    } catch (error) {
      console.error("Error loading JSON data", error);
    }
  };

  const processData = (jsonData) => {
    if (!jsonData || !jsonData.audits) return;

    const performanceMetrics = [
      { name: "First Contentful Paint", value: jsonData.audits["first-contentful-paint"].numericValue },
      { name: "Largest Contentful Paint", value: jsonData.audits["largest-contentful-paint"].numericValue },
      { name: "Speed Index", value: jsonData.audits["speed-index"].numericValue },
    ];

    const auditScores = [
      { name: "Performance", value: jsonData.audits["first-contentful-paint"].score * 100 },
      { name: "SEO", value: jsonData.audits["is-on-https"].score * 100 },
      { name: "Accessibility", value: jsonData.audits["viewport"].score * 100 },
    ];

    const seoMetrics = [
      { name: "Mobile-Friendly", value: jsonData.audits["viewport"].score * 100 },
      { name: "HTTPS Secure", value: jsonData.audits["is-on-https"].score * 100 },
      { name: "Redirects", value: jsonData.audits["redirects-http"].score === null ? 0 : jsonData.audits["redirects-http"].score * 100 },
    ];

    const errorAnalysis = [
      { name: "Protocol Timeout", value: jsonData.runtimeError ? 1 : 0 },
      { name: "Redirect Warnings", value: jsonData.runWarnings.length },
    ];

    setData({ performanceMetrics, auditScores, seoMetrics, errorAnalysis });
  };

  return (
    <div>
      

      <button 
        className="btn btn-outline-success"
        onClick={fetchData}
      >
        Search
      </button>

      {data && (
        <div className="overflow-x-auto flex space-x-6 p-4 w-full">
          
          {/* Performance Metrics Bar Chart */}
          <div className="border p-4 shadow-lg rounded-lg bg-white min-w-[350px]">
            <h2 className="text-lg font-semibold mb-2">🚀 Performance Metrics (ms)</h2>
            <BarChart width={350} height={250} data={data.performanceMetrics}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4C9AFF" />
            </BarChart>
          </div>

          {/* Audit Scores Line Chart */}
          <div className="border p-4 shadow-lg rounded-lg bg-white min-w-[350px]">
            <h2 className="text-lg font-semibold mb-2">✅ Audit Scores (%)</h2>
            <LineChart width={350} height={250} data={data.auditScores}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid stroke="#ddd" />
              <Line type="monotone" dataKey="value" stroke="#FF8042" />
            </LineChart>
          </div>

          {/* SEO Metrics Pie Chart */}
          <div className="border p-4 shadow-lg rounded-lg bg-white min-w-[350px]">
            <h2 className="text-lg font-semibold mb-2">📈 SEO & Security</h2>
            <PieChart width={350} height={250}>
              <Pie data={data.seoMetrics} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} fill="#00C49F" label>
                {data.seoMetrics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#00C49F", "#FFBB28", "#FF8042"][index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* Error Analysis Pie Chart */}
          <div className="border p-4 shadow-lg rounded-lg bg-white min-w-[350px]">
            <h2 className="text-lg font-semibold mb-2">⚠️ Error Analysis</h2>
            <PieChart width={350} height={250}>
              <Pie data={data.errorAnalysis} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} fill="#FF3333" label>
                {data.errorAnalysis.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#FF3333", "#FFA500"][index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* Radar Chart for Performance Analysis */}
          <div className="border p-4 shadow-lg rounded-lg bg-white min-w-[350px]">
            <h2 className="text-lg font-semibold mb-2">📌 Radar Chart (Performance)</h2>
            <RadarChart outerRadius={80} width={350} height={250} data={data.performanceMetrics}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar name="Performance" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </div>

        </div>
      )}
    </div>
  );
};

export default ChartComponent;
