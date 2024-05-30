import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface SignupData {
  target: number;
  achieved: number;
}

interface PieChartComponentProps {
  title: string;
  endpoint: string;
  dataKey: string;
}

const COLORS = ['#00C49F', '#FFBB28'];

const PieChartComponent: React.FC<PieChartComponentProps> = ({ title, endpoint, dataKey }) => {
  const [data, setData] = useState<SignupData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/${endpoint}`);
        const result = await response.json();
        setData(result[dataKey]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [endpoint, dataKey]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = [
    { name: 'Achieved', value: data.achieved },
    { name: 'Remaining', value: data.target - data.achieved }
  ];

  return (
    <div className="bg-white p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
