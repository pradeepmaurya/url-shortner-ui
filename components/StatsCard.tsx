interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

export default function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  const isPositiveTrend = trend.startsWith('+');

  return (
    <div className="neumorphic neumorphic-hover rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="neumorphic-inset rounded-lg p-3">
          <div className="text-blue-600">
            {icon}
          </div>
        </div>
        <div className={`text-sm font-semibold px-2 py-1 rounded-full ${
          isPositiveTrend 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {trend}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-1">{value}</h3>
        <p className="text-slate-600 text-sm">{title}</p>
      </div>
    </div>
  );
}