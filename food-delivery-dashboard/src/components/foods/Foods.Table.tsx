import type { Food } from "../../types/food";

type FoodsTableProps = {
  foods: Food[];
  onEdit?: (food: Food) => void;
  onDelete?: (id: string) => void;
};

const FoodsTable = ({ foods, onEdit, onDelete }: FoodsTableProps) => {
  return (
    <table className="min-w-full text-left">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 border-b">Name</th>
          <th className="p-3 border-b">Price</th>
          <th className="p-3 border-b">Category</th>
          <th className="p-3 border-b">Created At</th>
          {(onEdit || onDelete) && <th className="p-3 border-b">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {foods.map((f) => (
          <tr key={f._id} className="hover:bg-gray-50">
            <td className="p-3 border-b">{f.name}</td>
            <td className="p-3 border-b">${f.price.toFixed(2)}</td>
            <td className="p-3 border-b">{f.category ?? "-"}</td>
            <td className="p-3 border-b">
              {f.createdAt ? new Date(f.createdAt).toLocaleDateString() : "-"}
            </td>
            {(onEdit || onDelete) && (
              <td className="p-3 border-b flex gap-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(f)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(f._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FoodsTable;
