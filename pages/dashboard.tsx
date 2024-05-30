import React from 'react';
import Sidebar from '../components/Sidebar';
import TopCard from '../components/TopCard';
import PieChart from '../components/PieChart';
import BarChartComponent from '../components/BarChartComponent';
import UpcomingInvoices from '../components/UpcomingInvoices';

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <TopCard title="Total Revenue" endpoint="totalRevenue" />
          <TopCard title="Collections" endpoint="collections" />
          <TopCard title="Bounced Cheques" endpoint="bouncedCheques" />
          <TopCard title="Total Signups" endpoint="signups" nestedKey="total" />
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PieChart title="Zeraki Analytics Signups" endpoint="signups" dataKey="zerakiAnalytics" />
          <PieChart title="Zeraki Finance Signups" endpoint="signups" dataKey="zerakiFinance" />
          <PieChart title="Zeraki Timetable Signups" endpoint="signups" dataKey="zerakiTimetable" />
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <BarChartComponent title="Zeraki Analytics Signups by School Type" endpoint="schoolSignups" dataKey="zerakiAnalytics" />
          <BarChartComponent title="Zeraki Finance Signups by School Type" endpoint="schoolSignups" dataKey="zerakiFinance" />
          <BarChartComponent title="Zeraki Timetable Signups by School Type" endpoint="schoolSignups" dataKey="zerakiTimetable" />
        </div>
        <div className="mt-6">
          <UpcomingInvoices />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
