"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectEventType = ({
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
  const endpoint = "/event_types";
  const { data, isLoading, isFetching } = useGetData<any>({
    endpoint,
    queryKey: ["EventTypes", endpoint],
  });

  const eventTypesData = data?.status === "success" ? data?.result : [];

  return (
    <SelectItem
      items={eventTypesData}
      value={value}
      setValue={onChange}
      isLoading={isLoading || isFetching}
      className={className}
      isMultiple={isMultiple}
    />
  );
};

export default SelectEventType;
