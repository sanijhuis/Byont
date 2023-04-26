import clsx from "clsx";

interface CardOutlineProps {
  children: React.ReactNode;
  className?: string;
}

const CardOutline = ({ children, className }: CardOutlineProps) => {
  return (
    <article
      className={clsx(
        "cursor-pointer rounded-md border-[1px] border-green/20 bg-black hover:border-green hover:transition-all",
        className
      )}
    >
      {children}
    </article>
  );
};

export default CardOutline;
