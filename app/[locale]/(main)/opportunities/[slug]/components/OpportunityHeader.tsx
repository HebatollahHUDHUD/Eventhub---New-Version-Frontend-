import Image from "@/components/common/image";

type OpportunityHeaderProps = {
  image?: string;
  companyName: string;
  category: string;
};

const OpportunityHeader = ({
  image,
  companyName,
  category,
}: OpportunityHeaderProps) => {
  return (
    <div className="flex gap-5">
      <div className="w-32 h-32 rounded-full overflow-hidden border shadow-sm shrink-0">
        <Image
          src={image}
          alt={companyName}
          width={128}
          height={128}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="pt-4">
        <h1 className="title-3 font-semibold">{companyName}</h1>
        <p className="text-sm text-muted-foreground">{category}</p>
      </div>
    </div>
  );
};

export default OpportunityHeader;
