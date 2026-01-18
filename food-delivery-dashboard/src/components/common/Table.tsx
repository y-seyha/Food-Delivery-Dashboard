// src/components/common/Table.tsx
import type { ReactNode } from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
};

type TableProps<T> = {
  columns: Column<T>[]; // mapping columns to keys or functions
  data: T[]; // array of items
  noDataText?: string; // optional fallback text
};

const Table = <T,>({
  columns,
  data,
  noDataText = "No data found",
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="text-left p-3 border-b">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center p-3 border-b text-gray-500"
              >
                {noDataText}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((col, cidx) => (
                  <td key={cidx} className="p-3 border-b">
                    {typeof col.accessor === "function"
                      ? col.accessor(row)
                      : (row[col.accessor] as unknown as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
