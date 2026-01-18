import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: string; // Tailwind text color for icon
};

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition w-full sm:w-72 h-28">
      {icon && (
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 ${color} mr-4 text-xl sm:text-2xl`}
        >
          {icon}
        </div>
      )}
      <div className="flex flex-col justify-center">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl sm:text-3xl font-semibold mt-1">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
