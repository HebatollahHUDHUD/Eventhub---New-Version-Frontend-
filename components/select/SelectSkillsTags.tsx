"use client";

import { useGetData } from "@/hooks/useFetch";
import { Badge } from "../ui/badge";

const SelectSkillsTags = ({
  onChange,
  value,
}: {
  onChange: (value: number[]) => void;
  value: number[];
}) => {
  const endpoint = "/skills";
  const { data } = useGetData<any>({
    endpoint,
    queryKey: ["Skills", endpoint],
  });

  const skillsData = data?.status === "success" ? data?.result : [];

  if (!skillsData?.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skillsData?.map((skill: { id: number; name: string }) => (
        <Badge
          key={skill?.id}
          variant={value?.includes(skill?.id) ? "secondary" : "outline"}
          className="text-sm font-medium rounded-full py-2 px-4 cursor-pointer"
          onClick={() => {
            value.includes(skill?.id)
              ? onChange(value?.filter((id) => id !== skill?.id))
              : onChange([...value, skill?.id]);
          }}
        >
          {skill?.name}
        </Badge>
      ))}
    </div>
  );
};

export default SelectSkillsTags;
