import StatisticsCard from "./_component/StatisticsCard";
import Chart from "./_component/Chart";
import { FaUsers, FaDollarSign, FaChartLine } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatisticsCard
        title="Tổng số người dùng"
        value="1,000"
        icon={<FaUsers />}
      />
      <StatisticsCard
        title="Doanh thu"
        value="$5,000"
        icon={<FaDollarSign />}
      />
      <StatisticsCard title="Tăng trưởng" value="15%" icon={<FaChartLine />} />

      <Chart />
    </div>
  );
};

export default Dashboard;
