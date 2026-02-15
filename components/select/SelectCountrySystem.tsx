"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectCountrySystem = ({
  onChange,
  value,
  className,
}: {
  onChange: (value: ValueType) => void;
  value: ValueType;
  className?: string;
}) => {
  const endpoint = "/system-lookups?type=country";
  const { data, isLoading } = useGetData<any>({
    endpoint,
    queryKey: ["SystemLookups", "country"],
  });

  const countriesData = data?.status === "success" ? data?.result?.system_lookups || [] : [];

  return (
    <SelectItem
      items={countriesData}
      value={value}
      setValue={onChange}
      isLoading={isLoading}
      className={className}
    />
  );
};

export default SelectCountrySystem;
