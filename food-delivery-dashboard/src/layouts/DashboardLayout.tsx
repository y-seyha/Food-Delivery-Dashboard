import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar  */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex:col">
        SideBar
      </aside>

      {/* Main Content  */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="w-full bg-white shadow-md">Topbar</header>
      </div>

      {/* Content  */}
      <main className="flex-1 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
