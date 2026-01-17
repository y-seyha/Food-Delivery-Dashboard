type LoaderProps = {
  size?: number;
  color?: string;
};

const Loader = ({ size = 40, color = "#3B82F6" }: LoaderProps) => {
  return (
    <div
      className="animate-spin rounded-full border-t-4 border-b-4"
      style={{
        width: size,
        height: size,
        borderColor: `${color} transparent ${color} transparent`,
      }}
    />
  );
};

export default Loader;
