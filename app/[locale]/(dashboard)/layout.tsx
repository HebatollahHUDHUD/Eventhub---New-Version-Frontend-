import AdBanner from "@/components/common/AdBanner";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { USER_SESSION, UserType } from "@/constant";
import { createHeaders } from "@/lib/createHeaders";
import { getData } from "@/lib/request-server";
import { getUserType } from "@/lib/userSession";
import PusherProvider from "@/providers/PusherProvider";
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
  const user = cookieStore.get(USER_SESSION)?.value
  const userData = user ? JSON.parse(user) : null;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["Profile", endpoint],
    queryFn: () => getData({ endpoint, config: { headers } }),
  });

  const type = userData?.user_type as UserType;

  return (
    <main>
      <Navbar />

      <div className="flex flex-col lg:flex-row">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Sidebar />
        </HydrationBoundary>

        <div className="flex-1 space-y-6 p-4">
          {children}
        </div>

        <div className="h-fit sticky top-20 p-4">
          <AdBanner
            dir="Vertical"
            position={type === UserType.COMPANY ? "companies_profile" : "talents_profile"}
          />
        </div>
      </div>

      <PusherProvider />
    </main>
  );
};

export default DashboardLayout;
