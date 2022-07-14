import { Toaster } from "react-hot-toast";
import Header from "~/components/Header";
import RedditProvider from "~/contexts/RedditContext";

type LayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <RedditProvider>
      <div className="h-screen overflow-y-scroll bg-slate-200 scrollbar-hide">
        <Toaster />
        <Header />
        {children}
      </div>
    </RedditProvider>
  );
};

export default MainLayout;
