import clsx from "clsx";

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
  size: "sm" | "md" | "lg";
  color: "black" | "gray" | "white";
  fontWeight: "light" | "normal" | "medium";
}

const Paragraph = ({
  children,
  className,
  size,
  color,
  fontWeight,
}: ParagraphProps) => {
  return (
    <p
      className={clsx("", className, {
        // Size
        "text-14 leading-24": size === "sm",
        "text-16 leading-16 md:text-18": size === "md",
        "text-21 leading-28": size === "lg",
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
    </p>
  );
};
export default Paragraph;
