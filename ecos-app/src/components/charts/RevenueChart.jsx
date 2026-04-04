// FILE: src/components/charts/RevenueChart.jsx
// Animated Revenue vs Ad Spend chart — Week 1 data

import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ReferenceLine,
} from "recharts";

const FULL_DATA = [
  { day: "Day 1", revenue: 312,  adSpend: 330, profit: -18,  roas: 0.9 },
  { day: "Day 2", revenue: 588,  adSpend: 330, profit: 258,  roas: 1.8 },
  { day: "Day 3", revenue: 931,  adSpend: 330, profit: 601,  roas: 2.8 },
  { day: "Day 4", revenue: 1204, adSpend: 355, profit: 849,  roas: 3.4 },
  { day: "Day 5", revenue: 1480, adSpend: 355, profit: 1125, roas: 4.2 },
  { day: "Day 6", revenue: 1318, adSpend: 355, profit: 963,  roas: 3.7 },
  { day: "Day 7", revenue: 1559, adSpend: 355, profit: 1204, roas: 4.4 },
];

// Custom tooltip
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0A0F1A] border border-[#1E3A5F] rounded-xl px-4 py-3 shadow-xl text-xs font-['Sora',sans-serif]">
      <p className="text-[#3B82F6] font-bold mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex justify-between gap-6 mb-1">
          <span style={{ color: p.color }}>{p.name}</span>
          <span className="text-white font-bold">£{p.value.toLocaleString()}</span>
        </div>
      ))}
      {payload[0] && payload[1] && (
        <div className="mt-2 pt-2 border-t border-[#1E293B] flex justify-between">
          <span className="text-[#475569]">ROAS</span>
          <span className={`font-bold ${(payload[0].value / payload[1].value) >= 2.5 ? "text-[#4ADE80]" : "text-[#F87171]"}`}>
            {(payload[0].value / payload[1].value).toFixed(1)}x
          </span>
        </div>
      )}
    </div>
  );
}

export default function RevenueChart() {
  const [visibleData, setVisibleData] = useState([]);
  const [animDone,    setAnimDone]    = useState(false);

  // Animate data points appearing one by one
  useEffect(() => {
    setVisibleData([]);
    FULL_DATA.forEach((point, i) => {
      setTimeout(() => {
        setVisibleData(prev => [...prev, point]);
        if (i === FULL_DATA.length - 1) setAnimDone(true);
      }, i * 180);
    });
  }, []);

  const totalRevenue = FULL_DATA.reduce((a, d) => a + d.revenue, 0);
  const totalSpend   = FULL_DATA.reduce((a, d) => a + d.adSpend, 0);
  const totalProfit  = FULL_DATA.reduce((a, d) => a + d.profit, 0);
  const avgROAS      = (totalRevenue / totalSpend).toFixed(1);

  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 font-['Sora',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');`}</style>

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-[10px] font-bold text-[#475569] uppercase tracking-widest mb-1">
            📈 Revenue vs Ad Spend — Week 1
          </p>
          <p className="text-xs text-[#64748B]">
            Daily performance · Break-even at 2.5x ROAS shown
          </p>
        </div>
        {/* Live KPI pills */}
        <div className="flex gap-2">
          {[
            { label: "Revenue",   value: `£${(totalRevenue/1000).toFixed(1)}k`, color: "text-[#4ADE80]", bg: "bg-[#052E16] border-[#16A34A]" },
            { label: "Ad Spend",  value: `£${(totalSpend/1000).toFixed(1)}k`,   color: "text-[#F59E0B]", bg: "bg-[#1C1200] border-[#92400E]" },
            { label: "Avg ROAS",  value: `${avgROAS}x`,                          color: "text-[#38BDF8]", bg: "bg-[#0C2337] border-[#0369A1]" },
          ].map(p => (
            <div key={p.label} className={`${p.bg} border rounded-xl px-3 py-2 text-center`}>
              <p className={`text-sm font-black ${p.color}`}>{p.value}</p>
              <p className="text-[9px] text-[#475569] uppercase tracking-widest">{p.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={visibleData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#4ADE80" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#4ADE80" stopOpacity={0}    />
              </linearGradient>
              <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#F59E0B" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#0F172A" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false}
              tickFormatter={v => `£${v}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "11px", color: "#64748B", paddingTop: "12px" }} />
            {/* Break-even line */}
            <ReferenceLine
              y={totalSpend / 7 * 2.5}
              stroke="#6366F1"
              strokeDasharray="4 4"
              label={{ value: "Break-even", fill: "#6366F1", fontSize: 9, position: "insideTopRight" }}
            />
            <Area type="monotone" dataKey="revenue"  name="Revenue"  stroke="#4ADE80" strokeWidth={2.5}
              fill="url(#revGrad)"   dot={{ fill: "#4ADE80", r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#4ADE80" }} isAnimationActive={true} animationDuration={400} />
            <Area type="monotone" dataKey="adSpend"  name="Ad Spend" stroke="#F59E0B" strokeWidth={2}
              fill="url(#spendGrad)" dot={{ fill: "#F59E0B", r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#F59E0B" }} isAnimationActive={true} animationDuration={400} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Insight bar */}
      {animDone && (
        <div className="mt-4 flex gap-3 items-start bg-[#052E16] border border-[#16A34A] rounded-xl px-4 py-3">
          <span className="text-lg shrink-0">💡</span>
          <p className="text-xs text-[#86EFAC] leading-relaxed">
            <span className="font-bold text-[#4ADE80]">Day 1 dip is normal</span> — Meta's learning phase costs efficiency in the first 24–48 hours. By Day 3 the algorithm found your best audience and ROAS crossed break-even. Total Week 1 profit: <span className="font-bold text-[#4ADE80]">£{totalProfit.toLocaleString()}</span>.
          </p>
        </div>
      )}
    </div>
  );
}