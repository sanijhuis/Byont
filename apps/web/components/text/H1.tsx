import clsx from "clsx";

interface H1Props {
  children: React.ReactNode;
  className?: string;
}

const H1 = ({ children, className }: H1Props) => {
  return (
    <h1
      className={clsx(
        "text-normal text-40 font-bold uppercase leading-40 text-white sm:text-55 sm:leading-55 md:text-80 md:leading-80",
        className
      )}
    >
      {children}
    </h1>
  );
};
export default H1;
