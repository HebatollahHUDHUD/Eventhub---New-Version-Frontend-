import Navbar from "@/components/layout/Navbar";


const MainLayout = async ({ children }: { children: React.ReactNode }) => {

  return (
    <main>
      <Navbar />

      {children}
    </main>
  );
};

export default MainLayout;
