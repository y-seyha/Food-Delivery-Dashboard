import Table, { type Column } from "../common/Table";
import type { Order } from "../../types/order";

type OrdersTableProps = {
  orders: Order[];
};

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const columns: Column<Order>[] = [
    {
      header: "Order ID",
      accessor: (row) => row._id,
    },
    {
      header: "User",
      accessor: (row) =>
        typeof row.user === "string" ? row.user : (row.user?.name ?? "-"),
    },
    {
      header: "Status",
      accessor: "status",
    },
    {
      header: "Created At",
      accessor: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
    },
  ];

  return <Table columns={columns} data={orders} />;
};

export default OrdersTable;
