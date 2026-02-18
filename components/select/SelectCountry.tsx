"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectCountry = ({
  onChange,
  value,
  className,
  icon,
}: {
  onChange: (value: ValueType) => void;
  value: ValueType;
  className?: string;
  icon?: React.ReactNode;
}) => {
  const endpoint = "/system-lookups?type=country";
  const { data, isLoading } = useGetData<any>({
    endpoint,
    queryKey: ["country"],
  });

  const countriesData = data?.status === "success" ? data?.result?.system_lookups || [] : [];

  return (
    <SelectItem
      items={countriesData}
      value={value}
      setValue={onChange}
      isLoading={isLoading}
      className={className}
      icon={icon}
    />
  );
};

export default SelectCountry;
