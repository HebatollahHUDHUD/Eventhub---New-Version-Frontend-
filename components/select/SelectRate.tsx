"use client";

import React from "react";
import SelectItem, { ValueType } from "./SelectItem";

const rateOptions = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 4, name: "4" },
  { id: 5, name: "5" },
];

const SelectRate = ({
  onChange,
  value,
  className,
  icon,
}: {
  onChange: (value: ValueType) => void;
  value: ValueType;
  className?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <SelectItem
      items={rateOptions}
      value={value}
      setValue={onChange}
      isLoading={false}
      className={className}
      icon={icon}
    />
  );
};

export default SelectRate;
