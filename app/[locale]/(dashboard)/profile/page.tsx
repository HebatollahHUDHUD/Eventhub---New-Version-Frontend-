"use client";

import { useGetData } from "@/hooks/useFetch";
import ProfileForm from "./components/Form";
import LoadingPage from "@/components/common/LoadingPage";

const ProfilePage = () => {
  const { data, isLoading } = useGetData<any>({
    endpoint: "/profile",
    queryKey: ["profile"],
  });

  const profileInfo = data?.status === "success" ? data?.result?.profile : null;

  if (isLoading) return <LoadingPage />;

  return (
    <ProfileForm profileInfo={profileInfo} />
  )
}

export default ProfilePage