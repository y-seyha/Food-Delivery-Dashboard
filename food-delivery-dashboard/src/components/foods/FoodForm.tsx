// src/components/foods/FoodForm.tsx
import { useState } from "react";
import type { Food } from "../../types/food";

type FoodFormProps = {
  food?: Food;
  onSubmit: (data: Partial<Food>) => void;
  onClose: () => void;
};

const FoodForm = ({ food, onSubmit, onClose }: FoodFormProps) => {
  const [name, setName] = useState(food?.name || "");
  const [price, setPrice] = useState(food?.price || 0);
  const [description, setDescription] = useState(food?.description || "");
  const [category, setCategory] = useState(food?.category || "");
  const [image, setImage] = useState(food?.image || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, price, description, category, image });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">{food ? "Edit Food" : "Add Food"}</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 w-full rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border px-3 py-2 w-full rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border px-3 py-2 w-full rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-3 py-2 w-full rounded"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            {food ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodForm;
