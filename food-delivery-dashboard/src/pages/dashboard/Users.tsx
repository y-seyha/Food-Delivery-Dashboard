import { useState, useMemo } from "react";
import Loader from "../../components/common/Loader";
import UsersTable from "../../components/users/UsersTable";
import UserForm from "../../components/users/UserForm";
import { useUsers } from "../../hooks/useUsers";
import UserService from "../../services/user.service";
import type { User } from "../../types/user";

const UsersPage = () => {
  const { users, loading, error, refetch } = useUsers();
  const [search, setSearch] = useState("");
  const [modalUser, setModalUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredUsers = useMemo(() => {
    if (!search) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  const handleEdit = (user: User) => {
    setModalUser(user);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await UserService.delete(id);
      refetch();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  const handleSubmit = async (data: Partial<User>) => {
    if (!modalUser) return;
    try {
      await UserService.update(modalUser._id, data);
      setShowModal(false);
      refetch();
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  };

  return (
    <div className="space-y-6 p-6">
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Loader size={60} />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center mt-6">{error}</p>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold">Users</h1>
          </div>

          <div className="flex justify-end">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <UsersTable
              users={filteredUsers}
              onDelete={handleDelete}
              onUpdate={handleEdit}
            />
          </div>

          {showModal && modalUser && (
            <UserForm
              user={modalUser}
              onSubmit={handleSubmit}
              onClose={() => setShowModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UsersPage;
