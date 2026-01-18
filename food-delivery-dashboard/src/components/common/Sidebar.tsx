import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Utensils,
  ShoppingCart,
  Users,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Foods", path: "/dashboard/foods", icon: Utensils },
    { label: "Orders", path: "/dashboard/orders", icon: ShoppingCart },
    { label: "Users", path: "/dashboard/users", icon: Users },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === path;
    }

    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-xl shadow hover:bg-gray-100 transition"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen bg-white shadow-xl transform transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          md:static md:h-screen md:w-64 flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-lg font-bold text-gray-800">Admin Dashboard</h1>

          {/* Close button for mobile */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition
                  duration-200
                  ${active ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-700 hover:bg-gray-100"}
                `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Optional footer */}
        <div className="px-6 py-4 border-t text-sm text-gray-500 hidden md:block">
          © 2026 Admin Panel
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
