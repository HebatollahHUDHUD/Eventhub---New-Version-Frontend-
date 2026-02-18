"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectSkills = ({
  onChange,
  value,
  className,
  isMultiple,
  icon,
}: {
  onChange: (value: ValueType) => void;
  value: ValueType;
  className?: string;
  isMultiple?: boolean;
  icon?: React.ReactNode;
}) => {
  const endpoint = "/system-lookups?type=skills";
  const { data, isLoading, isFetching } = useGetData<any>({
    endpoint,
    queryKey: ["Skills", endpoint],
  });

  const skillsData = data?.status === "success" ? data?.result?.system_lookups || [] : [];

  return (
    <SelectItem
      items={skillsData}
      value={value}
      setValue={onChange}
      isLoading={isLoading || isFetching}
      className={className}
      isMultiple={isMultiple}
      icon={icon}
    />
  );
};

export default SelectSkills;
