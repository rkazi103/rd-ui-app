import { Toaster } from "react-hot-toast";
import Header from "~/components/Header";

type LayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen overflow-y-scroll bg-slate-200 scrollbar-hide">
      <Toaster />
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
