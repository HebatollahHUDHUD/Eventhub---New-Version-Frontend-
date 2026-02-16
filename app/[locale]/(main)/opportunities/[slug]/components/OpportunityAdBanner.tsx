import Image from "@/components/common/image";

const OpportunityAdBanner = () => {
  return (
    <div className="rounded-2xl overflow-hidden h-64 w-full lg:h-full lg:w-auto">
      <Image
        src="/images/placeholder.png"
        alt="Advertisement banner"
        width={871}
        height={367}
        className="w-full h-full object-fill lg:hidden"
      />
      <Image
        src="/images/placeholder.png"
        alt="Advertisement banner"
        width={367}
        height={871}
        className="w-full h-full object-fill hidden lg:block"
      />
    </div>
  );
};

export default OpportunityAdBanner;
