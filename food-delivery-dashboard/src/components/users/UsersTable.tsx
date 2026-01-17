import Table, { type Column } from "../common/Table";
import type { User } from "../../types/user";

type UsersTableProps = {
  users: User[];
};

const UsersTable = ({ users }: UsersTableProps) => {
  const columns: Column<User>[] = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: (row) => row.role }, // "user" | "admin"
    { header: "Phone", accessor: "phone" },
    {
      header: "Address",
      accessor: (row) => `${row.address.street}, ${row.address.city}`,
    },
    {
      header: "Created At",
      accessor: (row) =>
        row.createAt ? new Date(row.createAt).toLocaleDateString() : "-",
    },
  ];

  return <Table columns={columns} data={users} />;
};

export default UsersTable;
