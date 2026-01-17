type StatusBadgeProps = {
  status: "pending" | "delivered" | "cancelled";
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2 py-1 rounded font-medium text-sm ${colors[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
