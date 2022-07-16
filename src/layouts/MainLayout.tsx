import { Toaster } from "react-hot-toast";
import Header from "~/components/Header";
import RefreshProvider from "~/contexts/RefreshContext";

type LayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <RefreshProvider>
      <div className="h-screen overflow-y-scroll bg-slate-200 scrollbar-hide">
        <Toaster />
        <Header />
        {children}
      </div>
    </RefreshProvider>
  );
};

export default MainLayout;
