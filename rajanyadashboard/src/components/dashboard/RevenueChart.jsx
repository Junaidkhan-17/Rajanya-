import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const monthName = new Date().toLocaleString("default", {
  month: "short",
});

const revenueData = [
  { date: `1 ${monthName}`, revenue: 0 },
  { date: `5 ${monthName}`, revenue: 2300 },
  { date: `10 ${monthName}`, revenue: 3500 },
  { date: `15 ${monthName}`, revenue: 4300 },
  { date: `20 ${monthName}`, revenue: 6200 },
  { date: `25 ${monthName}`, revenue: 3500 },
  { date: `30 ${monthName}`, revenue: 4800 },
  { date: `31 ${monthName}`, revenue: 8400 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#15143A] text-white px-3 py-2 rounded-xl shadow-lg">
      <p className="text-xs">{label}</p>
      <p className="text-lg font-bold">₹{payload[0].value.toLocaleString()}</p>
    </div>
  );
}

export default function RevenueChart() {
  const [period, setPeriod] = useState("Monthly");
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col h-[420px]">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-4">
        {/* Title */}
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Virtual Try-On Revenue
          </h2>

          <p className="text-sm text-slate-500">Revenue Overview</p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
          {/* Period Filter */}
          <div className="bg-slate-100 rounded-xl p-1 flex flex-wrap lg:flex-nowrap items-center gap-1 w-full lg:w-auto">
            {["Daily", "Weekly", "Monthly", "Yearly"].map((item) => (
              <button
                key={item}
                onClick={() => setPeriod(item)}
                className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                  period === item
                    ? "bg-[#15143A] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Calendar */}
          <div className="relative w-full lg:w-[170px]">
            <Calendar
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10"
            />

            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd MMM yyyy"
              className="
                w-full
                h-10
                pl-10
                pr-3
                rounded-xl
                border
                border-slate-200
                text-sm
                outline-none
                focus:border-violet-500
              "
            />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="purpleFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="#E5E7EB" />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#94A3B8",
              }}
            />

            <YAxis
              width={35}
              axisLine={false}
              tickLine={false}
              domain={[0, 10000]}
              ticks={[0, 2000, 4000, 6000, 8000, 10000]}
              tick={{
                fontSize: 11,
                fill: "#94A3B8",
              }}
              tickFormatter={(value) =>
                value === 0 ? "₹0" : `₹${value / 1000}K`
              }
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#7C3AED"
              strokeWidth={3}
              fill="url(#purpleFill)"
              dot={{
                r: 4,
                fill: "#fff",
                stroke: "#7C3AED",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 5,
                fill: "#fff",
                stroke: "#7C3AED",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
