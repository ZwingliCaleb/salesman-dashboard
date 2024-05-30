import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SchoolTypeData {
  Primary: number;
  Secondary: number;
  IGCSE: number;
}

interface BarChartComponentProps {
  title: string;
  endpoint: string;
  dataKey: string;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ title, endpoint, dataKey }) => {
  const [data, setData] = useState<SchoolTypeData | null>(null);

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
    { name: 'Primary', value: data.Primary },
    { name: 'Secondary', value: data.Secondary },
    { name: 'IGCSE', value: data.IGCSE },
  ];

  return (
    <div className="bg-white p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" onClick={(data) => console.log('Clicked on:', data)} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
