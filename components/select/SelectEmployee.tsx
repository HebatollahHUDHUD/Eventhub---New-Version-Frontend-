"use client";

import { useGetData } from "@/hooks/useFetch";
import SelectItem, { ValueType } from "./SelectItem";
import { EmployeesResponse } from "@/schemas/types";

const SelectEmployee = ({
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
  const { data, isLoading, } = useGetData<EmployeesResponse>({
    endpoint: "/profile/employees",
    queryKey: ["confirmed-employees", "employees"],
    config: {
      queryParams: {
        company_verification_status: "confirmed",
      },
    }
  });

  const usersData = data?.status === "success" ? data?.result?.employees || [] : [];

  return (
    <SelectItem
      items={usersData?.map((employee) => employee.user) || []}
      value={value}
      setValue={onChange}
      isLoading={isLoading}
      className={className}
      isMultiple={isMultiple}
      getItem={getItem}
    />
  );
};

export default SelectEmployee;
