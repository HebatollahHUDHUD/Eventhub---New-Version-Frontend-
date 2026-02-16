"use client";

import SelectItem, { ValueType } from "./SelectItem";

const genderOptions = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
  { id: "both", name: "Both" },
];

const SelectGender = ({
  onChange,
  value,
  className,
}: {
  onChange: (value: ValueType) => void;
  value: ValueType;
  className?: string;
}) => {
  return (
    <SelectItem
      items={genderOptions}
      value={value}
      setValue={onChange}
      isLoading={false}
      className={className}
    />
  );
};

export default SelectGender;
