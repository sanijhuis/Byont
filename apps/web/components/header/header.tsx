import IconLogo from "../../public/icons/logo-icon";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-6 items-center bg-black">
      <div className="container grid grid-cols-2">
        <div className="col-span-1">
          <Link href="/">
            <IconLogo />
          </Link>
        </div>
        <div className="col-span-1"></div>
      </div>
    </header>
  );
};

export default Header;
