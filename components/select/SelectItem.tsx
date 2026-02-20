import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popoverDialog";
import { CheckIcon, ChevronsUpDownIcon, LoaderIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

export type ValueType = any;

type SelectItemProps = {
  items: any[];
  value: ValueType;
  setValue?: (value: ValueType) => void;
  labelKey?: "name" | "ecri_no" | "tender_no" | "tender_name" | "no";
  getItem?: (value: any | any[]) => void; // NEW PROP
  isLoading?: boolean;
  className?: string;
  clearable?: boolean;
  isMultiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
  size?: "sm" | "lg" | "default";
  onSearchChange?: (value: string) => void;
  icon?: React.ReactNode; // Icon to display in the PopoverTrigger button
};

const SelectItem = ({
  items,
  value,
  setValue = () => { },
  getItem,
  isLoading,
  className,
  clearable = true,
  isMultiple,
  placeholder,
  disabled,
  size = "default",
  onSearchChange,
  icon,
}: SelectItemProps) => {
  const [open, setOpen] = useState(false);
  const language = useLocale()
  const t = useTranslations("common");

  const getLabel = (item: any) => {
    if (!item) return "";

    if (typeof item.name === "string") {
      return item.name;
    } else {
      return item.name?.[language] || item.name?.en || item.name?.ar || "";
    }

  };

  const hasSingleValue = value !== undefined && value !== null && value !== "" && value !== 0;
  const hasMultipleValue = Array.isArray(value) && (value as any[])?.length > 0;
  const hasValue = isMultiple ? hasMultipleValue : hasSingleValue;

  const handleSelect = (val: number | string) => {
    const selectedItem = items.find((i) => i.id == val);

    // Multi Select
    if (isMultiple) {
      let newValues: any[] = [];

      if (!(value as any[])?.includes(val)) {
        newValues = [...(value as any[]), val];
      } else {
        newValues = (value as any[]).filter((v) => v != val);
      }

      setValue(newValues);

      // Return array of selected item objects
      const selectedItemsData = items.filter((i) => newValues.includes(i.id));
      getItem?.(selectedItemsData);

      return;
    }

    // Single Select
    setValue(val);

    // Return selected item object
    getItem?.(selectedItem || null);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size={size}
          variant="outline"
          role="combobox"
          className={cn(
            "bg-background! justify-between w-full overflow-hidden rounded-lg border-primary/50 focus-visible:border-primary px-4 h-12",
            !hasValue && "text-[#5F5F5F]",
            isMultiple &&
            "hover:bg-muted/35 h-auto min-h-12 px-2 flex-wrap justify-start gap-1",
            className
          )}
          disabled={disabled !== undefined ? disabled : !items.length}
        >
          {/* Icon in trigger button */}
          {icon && <span className="shrink-0 me-2">{icon}</span>}

          {/* MULTI SELECT */}
          {isMultiple && value?.length
            ? value?.map((id: any) => {
              const selectedItem = items.find((i) => i.id == id);

              if (selectedItem)
                return (
                  <div
                    key={selectedItem.id}
                    className="bg-muted text-xs text-foreground px-1.5 py-1 rounded-md flex items-center gap-1.5"
                  >
                    <span>{getLabel(selectedItem)}</span>

                    <span
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(selectedItem.id);
                      }}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <XIcon className="size-4!" />
                    </span>
                  </div>
                );
            })
            : isMultiple && !value?.length
              ? placeholder || t("select-item")
              : null}

          {/* SINGLE SELECT */}
          {!isMultiple &&
            (hasSingleValue ? (
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {(() => {
                  const selectedItem = items.find((item) => item.id == value);
                  return selectedItem?.label || getLabel(selectedItem);
                })()}
              </span>
            ) : (
              placeholder || t("select-item")
            ))}

          <div className="flex items-center gap-2 ms-auto">
            {isLoading ? (
              <LoaderIcon className="h-4 w-4 shrink-0 animate-spin" />
            ) : hasSingleValue && clearable && !isMultiple ? (
              <span
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setValue("");
                  getItem?.(null);
                }}
                className="text-muted-foreground hover:text-destructive"
              >
                <XIcon className="h-4 w-4" />
              </span>
            ) : (isMultiple && !(value as any[])?.length) || !value ? (
              <ChevronsUpDownIcon className="h-4 w-4 shrink-0 opacity-50" />
            ) : null}
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            placeholder={t("search-for-items")}
            onValueChange={onSearchChange}
          />

          <CommandList>
            <CommandEmpty>{t("no-item-found")}</CommandEmpty>
            <CommandGroup>
              {items?.map((item: any) => (
                <CommandItem
                  value={`${item.id}-${getLabel(item)}`}
                  key={item.id}
                  disabled={item.disabled}
                  onSelect={() => {
                    handleSelect(item.id);
                    if (!isMultiple) setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "me-2 h-4 w-4",
                      item.id == value ||
                        (isMultiple && (value as any[])?.includes(item.id))
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />

                  {
                    item.label ? item.label : getLabel(item)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectItem;
