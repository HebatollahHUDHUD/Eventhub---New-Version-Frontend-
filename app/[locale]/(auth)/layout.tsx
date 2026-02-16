import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import { useTranslations } from "next-intl";
import { circlesToDownLeftSVG } from "@/public/SVGs";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("auth");

  return (
    <main className="overflow-hidden">
      <Navbar />


      <PageHeader
        title={t("auth-title")}
        className="pb-32!"
      />

      <div className="relative z-[1] -mt-16">
        <div className="container pb-12">
          {children}
        </div>

        <div className="absolute top-[-100px] right-[-180px] scale-75 z-[-1] rotate-60">
          {circlesToDownLeftSVG}
        </div>
      </div>


      <Footer />
    </main>
  );
};

export default MainLayout;
