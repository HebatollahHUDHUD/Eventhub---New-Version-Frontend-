"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectBadge = ({
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
  const endpoint = "/system-lookups?type=badge";
  const { data, isLoading, isFetching } = useGetData<any>({
    endpoint,
    queryKey: ["Badges", endpoint],
  });

  const badgesData = data?.status === "success" ? data?.result?.system_lookups || [] : [];

  return (
    <SelectItem
      items={badgesData}
      value={value}
      setValue={onChange}
      isLoading={isLoading || isFetching}
      className={className}
      isMultiple={isMultiple}
    />
  );
};

export default SelectBadge;
