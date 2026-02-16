"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectState = ({
  onChange,
  value,
  cityId,
}: {
  onChange: (value: ValueType) => void;
  value: ValueType;
  cityId: ValueType;
}) => {
  const endpoint = `/all-states${cityId ? `/${cityId}` : ""}`;
  const { data, isLoading, isFetching } = useGetData<any>({
    endpoint,
    queryKey: ["States", endpoint],
  });

  const statesData = data?.status === "success" ? data?.result : [];

  return (
    <SelectItem
      items={statesData}
      value={value}
      setValue={onChange}
      isLoading={isLoading || isFetching}
    />
  );
};

export default SelectState;
