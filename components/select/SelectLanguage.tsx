"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectLanguage = ({
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
  const endpoint = "/system-lookups?type=language";
  const { data, isLoading, isFetching } = useGetData<any>({
    endpoint,
    queryKey: ["SystemLookups", "language"],
  });

  const languagesData = data?.status === "success" ? data?.result?.system_lookups || [] : [];

  return (
    <SelectItem
      items={languagesData}
      value={value || []}
      setValue={onChange}
      isLoading={isLoading || isFetching}
      isMultiple={isMultiple}
      className={className}
    />
  );
};

export default SelectLanguage;
