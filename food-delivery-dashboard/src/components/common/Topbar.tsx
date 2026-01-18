import type { ReactNode } from "react";
import type { User } from "../../types/user";

type TopBarProps = {
  title?: string;
  children?: ReactNode;
  user?: User;
};

const TopBar = ({ title = "Dashboard", user, children }: TopBarProps) => {
  return (
    <header className="w-full h-16 flex items-center justify-between px-6 bg-white shadow-md sticky top-0 z-20">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>

      <div className="flex items-center gap-4">
        {children}

        {user && (
          <div className="flex items-center gap-2">
            <img
              src={user.profileImage || "/default-avatar.png"}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="hidden sm:block text-gray-700 font-medium">
              {user.name}
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
