"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectCountry = ({
  onChange,
  value,
  className,
}: {
  onChange: (value: ValueType) => void;
  value: ValueType;
  className?: string;
}) => {
  const endpoint = "/all-countries";
  const { data, isLoading } = useGetData<any>({
    endpoint,
    queryKey: ["Countries", endpoint],
  });

  const countriesData = data?.status === "success" ? data?.result : [];

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

export default SelectCountry;
