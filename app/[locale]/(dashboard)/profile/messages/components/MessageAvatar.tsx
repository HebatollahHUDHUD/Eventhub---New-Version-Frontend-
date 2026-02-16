
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils";

const MessageAvatar = ({
  image,
  name,
  size = "md",
}: {
  image: string;
  name: string;
  size?: "sm" | "md" | "lg";
}) => {
  return (
    <Avatar className={cn(
      size === "sm" &&
      "size-10",
      size === "md" &&
      "size-12",
      size === "lg" &&
      "size-16",
    )}>
      <AvatarImage src={image || ""} />
      <AvatarFallback>
        {name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}

export default MessageAvatar