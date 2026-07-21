import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Flower2 } from "lucide-react";

const menData = [
  { name: "Sherwanis", value: 35, color: "#9B5CF6" },
  { name: "Indo-Western", value: 25, color: "#3B82F6" },
  { name: "Suits", value: 20, color: "#F56C84" },
  { name: "Kurta", value: 20, color: "#FF7A3D" },
];

const womenData = [
  { name: "Lehengas", value: 40, color: "#9B5CF6" },
  { name: "Sarees", value: 30, color: "#3B82F6" },
  { name: "Gowns", value: 15, color: "#F56C84" },
  { name: "Anarkali", value: 15, color: "#FF7A3D" },
];

function DonutSection({ title, total, data }) {
  return (
    <div className="mb-8 last:mb-0">
      <h4 className="text-xs font-bold uppercase text-slate-400 mb-4">
        {title}
      </h4>

      <div className="flex items-center gap-6">
        {/* Donut */}

        <div className="relative w-28 h-28 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={30}
                outerRadius={50}
                stroke="none"
              >
                {data.map((item, index) => (
                  <Cell key={index} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[8px] font-semibold uppercase text-slate-400">
              TOTAL
            </p>

            <h3 className="text-lg font-bold">{total}</h3>

            <p className="text-[9px] text-slate-400">Requests</p>
          </div>
        </div>

        {/* Legend */}

        <div className="flex-1 space-y-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: item.color }}
                />

                <span className="text-sm text-slate-700">{item.name}</span>
              </div>

              <span className="text-sm font-semibold text-slate-700">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CategoryDonutChart() {
  return (
    <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-6">
      {/* Header */}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[16px] font-bold text-slate-800">
          Most Popular Categories
        </h2>

        <Flower2 size={18} className="text-slate-400" />
      </div>

      <DonutSection title="MEN'S WEAR" total={185} data={menData} />

      <DonutSection title="WOMEN'S WEAR" total={185} data={womenData} />
    </div>
  );
}
