import clsx from "clsx";
import Link from "next/link";

interface BasicLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  props?: any;
}

const BasicLink = ({ children, href, className, props }: BasicLinkProps) => {
  return (
    <Link
      {...props}
      href={href}
      className={clsx(
        "rounded-md bg-white px-2 py-1 font-medium text-black hover:opacity-80 hover:transition-opacity",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default BasicLink;
