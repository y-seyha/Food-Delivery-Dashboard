import type { ReactNode } from "react";

type HeaderProps = {
  title: string;
  actions?: ReactNode; // cleaner than React.ReactNode
};
const Header = ({ title, actions }: HeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white shadow-md">
      <h2 className="text-xl font-semibold">{title}</h2>
      {actions && <div className="flex gap-2 mt-2 md:mt-0">{actions}</div>}
    </div>
  );
};

export default Header;
