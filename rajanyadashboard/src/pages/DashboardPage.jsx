import CategoryDonutChart from "../components/dashboard/CategoryDonutChart";
import RecentBookingsTable from "../components/dashboard/RecentBookingsTable";
import RecentTryOnTable from "../components/dashboard/RecentTryOnTable";
import RevenueChart from "../components/dashboard/RevenueChart";
import StatsCards from "../components/dashboard/StatsCards";

export default function DashboardPage() {
  return (
    <>
      <StatsCards />

      {/* Revenue + Category */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mt-3">
        <div className="lg:col-span-7">
          <RevenueChart />
        </div>

        <div className="lg:col-span-5">
          <CategoryDonutChart />
        </div>
      </div>

      {/* TryOn + Booking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mt-3">
        <div className="lg:col-span-6">
          <RecentTryOnTable />
        </div>

        <div className="lg:col-span-6">
          <RecentBookingsTable />
        </div>
      </div>
    </>
  );
}
