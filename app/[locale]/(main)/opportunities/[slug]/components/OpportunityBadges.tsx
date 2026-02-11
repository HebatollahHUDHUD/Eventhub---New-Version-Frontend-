type OpportunityBadgesProps = {
  badges: string[];
};

const OpportunityBadges = ({ badges }: OpportunityBadgesProps) => {
  if (!badges.length) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {badges.map((badge) => (
        <span
          key={badge}
          className="text-[9px] font-bold text-black bg-lightGray border rounded-full px-4 py-2"
        >
          {badge}
        </span>
      ))}
    </div>
  );
};

export default OpportunityBadges;
