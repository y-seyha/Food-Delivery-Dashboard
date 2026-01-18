import type { User } from "../../types/user";

interface Props {
  users: User[];
  onDelete: (id: string) => void;
  onUpdate: (user: User) => void; // now passes full user
}

const UsersTable = ({ users, onDelete, onUpdate }: Props) => {
  return (
    <table className="w-full table-auto border-collapse">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 border">Name</th>
          <th className="px-4 py-2 border">Email</th>
          <th className="px-4 py-2 border">Phone</th>
          <th className="px-4 py-2 border">City</th>
          <th className="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border">{user.name}</td>
            <td className="px-4 py-2 border">{user.email}</td>
            <td className="px-4 py-2 border">{user.phone || "-"}</td>
            <td className="px-4 py-2 border">{user.address?.city || "-"}</td>
            <td className="px-4 py-2 border space-x-2">
              <button
                onClick={() => onDelete(user._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>

              <button
                onClick={() => onUpdate(user)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}

        {users.length === 0 && (
          <tr>
            <td colSpan={5} className="text-center py-4 text-gray-500">
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UsersTable;
