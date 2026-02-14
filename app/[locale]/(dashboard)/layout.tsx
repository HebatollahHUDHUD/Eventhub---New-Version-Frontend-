import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { createHeaders } from "@/lib/createHeaders";
import { getData } from "@/lib/request-server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const endpoint = "/profile"
  const cookieStore = await cookies();
  const headers = createHeaders(cookieStore);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["Profile", endpoint],
    queryFn: () => getData({ endpoint, config: { headers } }),
  });

  return (
    <main>
      <Navbar />

      <div className="flex">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Sidebar />
        </HydrationBoundary>

        <div className="flex-1 min-h-[calc(100vh-80px)] space-y-6 py-4 ps-4 pe-8">
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
