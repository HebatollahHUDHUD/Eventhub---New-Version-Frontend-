"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectPosition = ({
  onChange,
  value,
  className,
}: {
  onChange: (value: ValueType) => void;
  value: ValueType;
  className?: string;
}) => {
  const endpoint = "/system-lookups?type=position";
  const { data, isLoading } = useGetData<any>({
    endpoint,
    queryKey: ["SystemLookups", "position"],
  });

  const positionsData = data?.status === "success" ? data?.result?.system_lookups || [] : [];

  return (
    <SelectItem
      items={positionsData}
      value={value}
      setValue={onChange}
      isLoading={isLoading}
      className={className}
    />
  );
};

export default SelectPosition;
