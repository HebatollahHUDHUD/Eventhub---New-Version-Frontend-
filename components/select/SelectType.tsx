"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectType = ({
  onChange,
  value,
  isMultiple,
}: {
  onChange: (value: ValueType) => void;
  value: ValueType;
  isMultiple?: boolean;
}) => {
  const endpoint = "/event_types";
  const { data, isLoading, isFetching } = useGetData<any>({
    endpoint,
    queryKey: ["Types", endpoint],
  });

  const typesData = data?.status === "success" ? data?.result : [];

  return (
    <SelectItem
      items={typesData}
      value={value}
      setValue={onChange}
      isLoading={isLoading || isFetching}
      isMultiple={isMultiple}
    />
  );
};

export default SelectType;
