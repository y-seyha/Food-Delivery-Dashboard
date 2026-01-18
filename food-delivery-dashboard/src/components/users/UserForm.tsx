import { useState, useEffect } from "react";
import type { User } from "../../types/user";

interface Props {
  user?: User; // undefined = create new user
  onSubmit: (data: Partial<User>) => void;
  onClose: () => void;
}

const UserForm = ({ user, onSubmit, onClose }: Props) => {
  const initialData: Partial<User> = user
    ? { ...user }
    : {
        name: "",
        email: "",
        phone: "",
        role: "user",
        address: { street: "", city: "" },
        profileImage: "",
      };

  const [formData, setFormData] = useState<Partial<User>>(initialData);

  // Update formData if user prop changes
  useEffect(() => {
    if (!user) return;

    // Use async update to avoid cascading render warning
    const timeout = setTimeout(() => setFormData({ ...user }), 0);
    return () => clearTimeout(timeout);
  }, [user]);

  // Update a field in formData
  const handleChange = (field: keyof User | "city", value: string) => {
    if (field === "city") {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          city: value || "",
          street: prev.address?.street || "",
        },
      }));
    } else if (field === "role") {
      setFormData((prev) => ({
        ...prev,
        role: value as "user" | "admin",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {user ? "Edit User" : "Create User"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-semibold">Phone</label>
            <input
              type="text"
              value={formData.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* City */}
          <div>
            <label className="block mb-1 font-semibold">City</label>
            <input
              type="text"
              value={formData.address?.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 font-semibold">Role</label>
            <select
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Profile Image */}
          <div>
            <label className="block mb-1 font-semibold">Profile Image URL</label>
            <input
              type="text"
              value={formData.profileImage || ""}
              onChange={(e) => handleChange("profileImage", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {user ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
