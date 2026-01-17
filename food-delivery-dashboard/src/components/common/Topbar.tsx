import type { ReactNode } from "react";

type TopBarProps = {
  children?: ReactNode;
};

const TopBar = ({ children }: TopBarProps) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      {children}
    </div>
  );
};

export default TopBar;
