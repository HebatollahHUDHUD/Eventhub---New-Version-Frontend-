"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";

const SelectUser = ({
  onChange,
  value,
  className,
  isMultiple,
  getItem,
}: {
  onChange?: (value: ValueType) => void;
  value: ValueType;
  className?: string;
  isMultiple?: boolean;
  getItem?: (value: any) => void;
}) => {
  const endpoint = "/users";
  const { data, isLoading } = useGetData<any>({
    endpoint,
    queryKey: ["Users", endpoint],
  });

  const usersData = data?.status === "success" ? data?.result?.users || [] : [];

  return (
    <SelectItem
      items={usersData}
      value={value}
      setValue={onChange}
      isLoading={isLoading}
      className={className}
      isMultiple={isMultiple}
      getItem={getItem}
    />
  );
};

export default SelectUser;
