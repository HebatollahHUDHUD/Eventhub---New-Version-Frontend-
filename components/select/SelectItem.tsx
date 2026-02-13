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
} from "@/components/ui/popover";
import { CheckIcon, ChevronsUpDownIcon, LoaderIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export type ValueType = number | string | string[] | number[] | undefined;

type SelectItemProps = {
  items: { id: number | string; name: string; alt_name?: string }[];
  value: ValueType;
  setValue: (value: ValueType) => void;
  isLoading?: boolean;
  className?: string;
  clearable?: boolean;
  isMultiple?: boolean;
};

const SelectItem = ({
  items,
  value,
  setValue,
  isLoading,
  className,
  clearable = true,
  isMultiple,
}: SelectItemProps) => {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("common");

  const handleSelect = (val: number | string) => {
    if (isMultiple && !(value as any[])?.includes(val)) {
      setValue([...(value as any[]), val]);
    } else if (isMultiple && (value as any[])?.includes(val)) {
      setValue((value as any[]).filter((item) => item !== val));
    } else {
      setValue(val);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "justify-between w-full h-12 rounded-lg",
            !value && "text-muted-foreground",
            isMultiple &&
            "hover:bg-muted/35 h-auto min-h-12 px-2 flex-wrap justify-start gap-1",
            className
          )}
          disabled={!items.length}
        >
          {isMultiple && (value as any[])?.length
            ? (value as any[])?.map((item) => {
              const selectedItem = items.find((i) => i.id == item);
              if (selectedItem)
                return (
                  <div
                    key={selectedItem?.id}
                    className="text-xs text-foreground bg-muted px-1.5 py-1 rounded-md flex items-center gap-1.5"
                  >
                    <span>{selectedItem?.name}</span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(selectedItem?.id);
                      }}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <XIcon className="!size-4" />
                    </button>
                  </div>
                );
            })
            : value && !isMultiple
              ? items.find((item) => item.id == value)?.name
              : t("select-item")}

          <div className="flex items-center gap-2 ms-auto">
            {isLoading ? (
              <LoaderIcon className="h-4 w-4 shrink-0 animate-spin" />
            ) : value && clearable && !isMultiple ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setValue("");
                }}
                className="text-muted-foreground hover:text-destructive"
              >
                <XIcon className="h-4 w-4" />
              </button>
            ) : (isMultiple && !(value as any[])?.length) || !value ? (
              <ChevronsUpDownIcon className="h-4 w-4 shrink-0 opacity-50" />
            ) : null}
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder={t("search-for-items")} />

          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>

            <CommandGroup>
              {items?.map((item) => (
                <CommandItem
                  value={
                    locale === "en" && item?.name
                      ? item.name
                      : item?.alt_name || item?.name || ""
                  }
                  key={item.id}
                  onSelect={() => {
                    handleSelect(item.id);
                    if (!isMultiple) {
                      setOpen(false);
                    }
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

                  {locale === "en"
                    ? item.name || item.alt_name
                    : item.alt_name || item.name}
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
