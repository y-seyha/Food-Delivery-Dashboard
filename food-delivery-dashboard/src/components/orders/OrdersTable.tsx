import Table, { type Column } from "../common/Table";
import type { Order } from "../../types/order";
import StatusBadge from "../common/StatusBadge";

type OrdersTableProps = {
  orders: Order[];
};

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const columns: Column<Order>[] = [
    { header: "Order ID", accessor: "id" },
    { header: "User ID", accessor: "userId" },
    {
      header: "Items",
      accessor: (row) => row.items.length + " items",
    },
    {
      header: "Status",
      accessor: (row) => {
        let badgeStatus: "pending" | "delivered" | "cancelled";

        switch (row.status) {
          case "Pending":
            badgeStatus = "pending";
            break;
          case "Completed":
            badgeStatus = "delivered";
            break;
          case "Cancelled":
            badgeStatus = "cancelled";
            break;
          default:
            badgeStatus = "pending";
        }

        return <StatusBadge status={badgeStatus} />;
      },
    },
    { header: "Address", accessor: "address" },
    {
      header: "Created At",
      accessor: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleString() : "-",
    },
  ];

  return <Table columns={columns} data={orders} />;
};

export default OrdersTable;
