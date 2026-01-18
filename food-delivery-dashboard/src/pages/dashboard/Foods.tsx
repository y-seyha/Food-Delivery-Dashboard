import { useState, useMemo } from "react";
import { useFoods } from "../../hooks/useFoods";
import Loader from "../../components/common/Loader";
import FoodsTable from "../../components/foods/Foods.Table";
import FoodForm from "../../components/foods/FoodForm";
import FoodService from "../../services/food.service";

const FoodsPage = () => {
  const { foods, loading, error, refetch } = useFoods();

  const [search, setSearch] = useState("");
  const [modalFood, setModalFood] = useState<null | (typeof foods)[0]>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredFoods = useMemo(() => {
    if (!search) return foods;
    return foods.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [foods, search]);

  const handleAdd = () => {
    setModalFood(null);
    setShowModal(true);
  };

  const handleEdit = (food: (typeof foods)[0]) => {
    setModalFood(food);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this food?")) return;
    try {
      await FoodService.delete(id);
      refetch(); // reload foods
    } catch (err) {
      console.error(err);
      alert("Failed to delete food");
    }
  };

  const handleSubmit = async (data: Partial<(typeof foods)[0]>) => {
    try {
      if (modalFood) {
        await FoodService.update(modalFood._id, data);
      } else {
        await FoodService.add(data);
      }
      setShowModal(false);
      refetch();
    } catch (err) {
      console.error(err);
      alert("Failed to save food");
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
          {/* Header + Add button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold">Foods</h1>
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              + Add Food
            </button>
          </div>

          {/* Search */}
          <div className="flex justify-end">
            <input
              type="text"
              placeholder="Search food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Foods table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <FoodsTable
              foods={filteredFoods}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          {showModal && (
            <FoodForm
              food={modalFood || undefined}
              onSubmit={handleSubmit}
              onClose={() => setShowModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default FoodsPage;
