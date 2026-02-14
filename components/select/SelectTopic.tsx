"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectTopic = ({
  onChange,
  value,
  isMultiple,
  queryParams,
}: {
  onChange: (value: ValueType) => void;
  value: ValueType;
  isMultiple?: boolean;
  queryParams?: any;
}) => {
  const endpoint = "/topics";
  const { data, isLoading, isFetching } = useGetData<any>({
    endpoint,
    queryKey: ["Topics", endpoint, queryParams],
    config: {
      queryParams,
    },
  });

  const topicsData = data?.status === "success" ? data?.result : [];

  return (
    <SelectItem
      items={topicsData}
      value={value}
      setValue={onChange}
      isLoading={isLoading || isFetching}
      isMultiple={isMultiple}
    />
  );
};

export default SelectTopic;
