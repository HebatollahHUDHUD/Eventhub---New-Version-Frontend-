"use client";

import { useGetData } from '@/hooks/useFetch';
import { TalentProfileResponse } from '@/schemas/types';
import LoadingPage from '@/components/common/LoadingPage';

import ExperienceForm from './components/ExperienceForm'
import EducationForm from './components/EducationForm'
import SkillsForm from './components/SkillsForm'


const page = () => {
  const endpoint = "/profile";

  const { data, isLoading, refetch } = useGetData<TalentProfileResponse>({
    endpoint,
    queryKey: ["Profile", endpoint],
  });

  const profile = data?.status === "success" ? data?.result?.profile : null;

  if (isLoading) return <LoadingPage />;

  if (!profile) return null;

  return (
    <div className="space-y-6">
      <SkillsForm profile={profile} refetch={refetch} />
      <EducationForm profile={profile} refetch={refetch} />
      <ExperienceForm profile={profile} refetch={refetch} />
    </div>
  )
}

export default page