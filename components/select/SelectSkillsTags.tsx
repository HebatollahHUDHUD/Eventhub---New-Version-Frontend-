"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectSkills = ({
  onChange,
  value,
  className,
  isMultiple,
}: {
  onChange: (value: ValueType) => void;
  value: ValueType;
  className?: string;
  isMultiple?: boolean;
}) => {
  const endpoint = "/skills";
  const { data, isLoading } = useGetData<any>({
    endpoint,
    queryKey: ["Skills", endpoint],
  });

  const skillsData = data?.status === "success" ? data?.result : [];

  return (
    <SelectItem
      items={skillsData}
      value={value}
      setValue={onChange}
      isLoading={isLoading}
      className={className}
      isMultiple={isMultiple}
    />
  );
};

export default SelectSkills;
