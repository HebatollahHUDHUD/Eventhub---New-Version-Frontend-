import Link from "next/link";
import Image from "@/components/common/image";
import PleaseLoginDialog from "@/components/common/PleaseLoginDialog";

import { ArrowUpRight } from "lucide-react";
import { getUserSession } from "@/lib/userSession";
import type { JobAdMain } from "../../../../../schemas/types";
import { USER_SESSION } from "@/constant";
import { cookies } from "next/headers";


type OpportunitiesCardProps = {
  jobAd: JobAdMain;
};

const OpportunitiesCard = async ({ jobAd }: OpportunitiesCardProps) => {
  const cookieStore = await cookies();
  const user = cookieStore.get(USER_SESSION)?.value
  const userData = user ? JSON.parse(user) : null;
  const isLoggedIn = !!userData

  if (!isLoggedIn) {
    return (
      <PleaseLoginDialog>
        <CardContent jobAd={jobAd} />
      </PleaseLoginDialog>
    );
  }

  return (
    <Link
      href={`/opportunities/${jobAd.id}`}
      className="h-full"
      role="listitem"
    >
      <CardContent jobAd={jobAd} />
    </Link>
  );
};

export default OpportunitiesCard;


const CardContent = ({ jobAd }: OpportunitiesCardProps) => {
  return (
    <div className="relative pt-16 h-full">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-32 h-32 rounded-full overflow-hidden border-5 border-lightBackground shadow-sm">
        <Image
          src={jobAd.user?.photo || ""}
          alt={jobAd.user?.name}
          width={128}
          height={128}
          className="w-full h-full object-cover"
        />
      </div>

      <article className="relative bg-background shadow-sm border rounded-2xl hover:shadow-md transition-all duration-300 pt-20 pb-4 px-4 min-h-49 flex flex-col ">
        <div className="space-y-1 flex-1">
          <h2 className="title-4 font-semibold">{jobAd.title}</h2>
          <p className="text-sm text-subtleText">{jobAd.user?.name}</p>
        </div>

        <div className="self-end">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accentPurple text-primary">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </span>
        </div>
      </article>
    </div>
  );
};