"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectCompany = ({
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
  const endpoint = "/users?user_type=company";
  const { data, isLoading, isFetching } = useGetData<any>({
    endpoint,
    queryKey: ["company"],
  });

  const companiesData = data?.status === "success" ? data?.result?.users || [] : [];

  return (
    <SelectItem
      items={companiesData}
      value={value || []}
      setValue={onChange}
      isLoading={isLoading || isFetching}
      isMultiple={isMultiple}
      className={className}
    />
  );
};

export default SelectCompany;
