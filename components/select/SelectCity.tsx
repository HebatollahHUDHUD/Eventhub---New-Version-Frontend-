"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectCity = ({
  onChange,
  value,
  countryId,
}: {
  onChange: (value: ValueType) => void;
  value: ValueType;
  countryId: ValueType;
}) => {
  const endpoint = `/all-cities${countryId ? `/${countryId}` : ""}`;
  const { data, isLoading, isFetching } = useGetData<any>({
    endpoint,
    queryKey: ["Cities", endpoint],
  });

  const citiesData = data?.status === "success" ? data?.result : [];

  return (
    <SelectItem
      items={citiesData}
      value={value}
      setValue={onChange}
      isLoading={isLoading || isFetching}
    />
  );
};

export default SelectCity;
