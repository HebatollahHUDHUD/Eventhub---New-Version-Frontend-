"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectEventType = ({
  onChange,
  value,
  isMultiple,
  className,
}: {
  onChange: (value: ValueType) => void;
  value: ValueType;
  isMultiple?: boolean;
  className?: string;
}) => {
  const endpoint = "/system-lookups?type=event_type";
  const { data, isLoading, isFetching } = useGetData<any>({
    endpoint,
    queryKey: ["event_type"],
  });

  const eventTypeData = data?.status === "success" ? data?.result?.system_lookups || [] : [];

  return (
    <SelectItem
      items={eventTypeData}
      value={value || []}
      setValue={onChange}
      isLoading={isLoading || isFetching}
      isMultiple={isMultiple}
      className={className}
    />
  );
};

export default SelectEventType;
