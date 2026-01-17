import Table, { type Column } from "../common/Table";
import type { Food } from "../../types/food";


type FoodsTableProps = {
  foods: Food[];
};

const FoodsTable = ({ foods }: FoodsTableProps) => {
  const columns: Column<Food>[] = [
    { header: "Name", accessor: "name" },
    { header: "Price", accessor: (row) => `$${row.price.toFixed(2)}` },
    { header: "Category", accessor: (row) => row.category ?? "-" },
    { header: "Created At", accessor: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-"
    },
  ];

  return <Table columns={columns} data={foods} />;
};

export default FoodsTable;
