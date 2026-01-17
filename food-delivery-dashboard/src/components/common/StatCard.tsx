import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: string;
};

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition w-full sm:w-auto">
      {icon && <div className={`text-2xl mr-4 ${color}`}>{icon}</div>}
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
