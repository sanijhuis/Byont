import clsx from "clsx";

interface H2Props {
  children: React.ReactNode;
  className?: string;
  size: "sm" | "md" | "lg";
  color: "black" | "gray" | "white";
  fontWeight: "light" | "normal" | "medium";
}

const H2 = ({ children, className, color, size, fontWeight }: H2Props) => {
  return (
    <h2
      className={clsx("text-45 font-bold leading-45", className, {
        // Size
        "text-30": size === "sm",
        "text-37": size === "md",
        "text-45": size === "lg",
        // Color
        "text-black": color === "black",
        "text-gray": color === "gray",
        "text-white": color === "white",
        // Font weights
        "font-light": fontWeight === "light",
        "font-normal": fontWeight === "normal",
        "font-medium": fontWeight === "medium",
      })}
    >
      {children}
    </h2>
  );
};

export default H2;
