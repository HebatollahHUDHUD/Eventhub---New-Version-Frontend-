"use client";

import { useGetData } from '@/hooks/useFetch';
import EmployeesCard from './EmployeesCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { Employee, EmployeesResponse } from '@/schemas/types';

const NewEmployees = () => {
  const t = useTranslations("dashboard.employees");
  const { data } = useGetData<EmployeesResponse>({
    endpoint: "/profile/employees",
    queryKey: ["pending-employees", "employees"],
    config: {
      queryParams: {
        company_verification_status: "pending",
      },
    }
  });

  const employees: Employee[] = data?.status === "success" && data?.result
    ? data.result.employees || []
    : [];

  if (!employees.length) return;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("new-employees")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {employees.map((employee) => (
            <EmployeesCard key={employee.id} employee={employee} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewEmployees;