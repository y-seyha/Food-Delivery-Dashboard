import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Foods", path: "/foods" },
    { name: "Orders", path: "/orders" },
    { name: "Users", path: "/users" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      <div
        className={`fixed md:static top-0 left-0 h-screen bg-white shadow-lg p-6 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 w-64 z-40`}
      >
        <h1 className="text-2xl font-bold mb-8">FoodDash</h1>
        <nav className="flex flex-col gap-4">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `p-2 rounded-lg hover:bg-blue-100 ${
                  isActive ? "bg-blue-200 font-semibold" : ""
                }`
              }
              onClick={() => setOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
