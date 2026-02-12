"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectLanguage = ({
  onChange,
  value,
  isMultiple,
}: {
  onChange: (value: ValueType) => void;
  value: ValueType;
  isMultiple?: boolean;
}) => {
  const endpoint = "/languages";
  const { data, isLoading, isFetching } = useGetData<any>({
    endpoint,
    queryKey: ["Languages", endpoint],
  });

  const languagesData = data?.status === "success" ? data?.result : [];

  return (
    <SelectItem
      items={languagesData}
      value={value || []}
      setValue={onChange}
      isLoading={isLoading || isFetching}
      isMultiple={isMultiple}
    />
  );
};

export default SelectLanguage;
