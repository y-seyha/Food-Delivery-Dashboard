import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import TopBar from "../components/common/Topbar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen z-50">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        {/* TopBar */}
        <div className="sticky top-0 z-30">
          <TopBar />
        </div>

        {/* Scrollable content */}
        <main className="p-4 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
