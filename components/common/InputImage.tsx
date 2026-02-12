import { useState } from "react";
import { cn } from "@/lib/utils";
import { CameraIcon } from "lucide-react";

const InputImage = ({
  defValue = "/images/placeholder.png",
  className,
  onChange,
  iconClass,
  required = false,
  disabled = false,
}: {
  defValue?: string;
  className?: string;
  onChange?: (img: File) => void;
  iconClass?: string;
  required?: boolean;
  disabled?: boolean;
}) => {
  const [img, setImg] = useState<File | null>(null);

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files?.[0];
    if (targetFile) {
      setImg(targetFile);
    }

    onChange && onChange(targetFile as File);
  };

  return (
    <label
      htmlFor="image"
      className={cn(
        "shadow relative flex items-center justify-center w-64  bg-gray-200 rounded-lg cursor-pointer overflow-hidden",
        className
      )}
    >
      <input
        type="file"
        onChange={handelChange}
        accept="image/*"
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        name="image"
        required={required}
        disabled={disabled}
      />

      <img
        src={
          img ? URL.createObjectURL(img) : defValue
        }
        alt="image"
        className="w-full h-full object-cover rounded-lg"
      />

      <div
        className={
          cn("absolute pointer-events-none top-0 left-0 w-full h-full bg-black/20 rounded-lg flex items-center justify-center", img ? "opacity-0" : "opacity-100")}
      >
        <CameraIcon className={cn("w-12 h-12 text-white", iconClass)} />
      </div>
    </label >
  );
};

export default InputImage;
