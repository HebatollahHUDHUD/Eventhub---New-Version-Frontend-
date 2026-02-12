"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectCategory = ({
  className,
  onChange,
  value,
  isMultiple,
}: {
  className?: string;
  onChange: (value: ValueType) => void;
  value: ValueType;
  isMultiple?: boolean;
}) => {
  const endpoint = `/categories`;
  const { data, isLoading, isFetching } = useGetData<any>({
    endpoint,
    queryKey: ["Categories", endpoint],
  });

  const categoriesData = data?.status === "success" ? data?.result : [];

  return (
    <SelectItem
      items={categoriesData}
      value={value}
      setValue={onChange}
      isLoading={isLoading || isFetching}
      className={className}
      isMultiple={isMultiple}
    />
  );
};

export default SelectCategory;
