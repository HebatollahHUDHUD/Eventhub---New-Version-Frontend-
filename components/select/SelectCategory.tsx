"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectCategory = ({
  onChange,
  value,
  className,
  icon,
  disabled,
}: {
  onChange: (value: ValueType) => void;
  value: ValueType;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}) => {
  const endpoint = "/system-lookups?type=job_ad_category";
  const { data, isLoading } = useGetData<any>({
    endpoint,
    queryKey: ["job_ad_category"],
  });

  const categoriesData = data?.status === "success" ? data?.result?.system_lookups || [] : [];

  return (
    <SelectItem
      items={categoriesData}
      value={value}
      setValue={onChange}
      isLoading={isLoading}
      className={className}
      icon={icon}
      disabled={disabled}
    />
  );
};

export default SelectCategory;
