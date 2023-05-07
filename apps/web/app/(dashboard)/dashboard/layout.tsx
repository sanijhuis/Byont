import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import HeaderDashboard from "@/components/header/header-dashboard";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <HeaderDashboard />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
