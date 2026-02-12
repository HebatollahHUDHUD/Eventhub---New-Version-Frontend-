import OpportunityHeader from "./components/OpportunityHeader";
import OpportunityBadges from "./components/OpportunityBadges";
import OpportunityAbout from "./components/OpportunityAbout";
import OpportunityJobDetails from "./components/OpportunityJobDetails";
import OpportunityAdBanner from "./components/OpportunityAdBanner";
import OpportunitySimilarJobs from "./components/OpportunitySimilarJobs";

type OpportunityContentProps = {
  slug: string;
};

const staticOpportunity = {
  image: "/images/placeholder.png",
  companyName: "Company Name",
  category: "Photographer",
  isActive: true,
  badges: [
    "Photography",
    "Image Editing",
    "Video Editing",
    "Montage",
    "Graphic Design",
  ],
  about:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel blandit purus, et efficitur lorem. Cras eleifend tortor ac sem auctor aliquam. Quisque ac mattis lectus. Maecenas porta lobortis vestibulum. Morbi convallis venenatis congue. Proin commodo enim id dapibus cursus. Praesent ante eros, condimentum venenatis dolor iaculis, venenatis elementum elit. Nam porttitor diam felis, at lacinia magna sagittis eu.\n\nSed lacinia nibh tellus, at mattis massa faucibus ac. Donec mattis vel libero vel imperdiet. Vivamus auctor, tortor in ornare sagittis, velit enim varius dui, luctus tincidunt metus neque at nulla. Vivamus ac scelerisque, fermentum nisl nec, feugiat nibh. In in leo euismod, gravida leo et, ultrices tellus. Vestibulum vitae pellentesque nulla. Donec sollicitudin eros vitae augue tincidunt, vel ullamcorper sem dignissim.\n\nQuisque nec tellus quam, ut aliquam massa. Sed blandit mollis sapien, eget malesuada ex sagittis ac. Morbi tempor justo vel vestibulum lacus. Phasellus tempor in dui a porta. Quisque rhoncus sit amet velit in condimentum. Nam nec viverra erat. Cras eget ex nibh. Donec placerat fermentum augue, ac dictum eros convallis sit amet.\n\nCras semper dolor a mauris finibus, quis aliquam nid lacoreet. Maecenas volutpat erat eu lectus tincidunt suscipit. Mauris nisi tristique nisl. Sed at hendrerit ligula, et lacinia tellus. Proin rhoncus et sem pretium fringilla. Donec porta varius neque sed ornare. In non malesuada metus. Aliquam non neque leo eleifend luctus tempus in mauris. Etiam a facilisis orci. Ut et elementum orci. Maecenas in facilisis turpis. Fusce augue turpis, cursus eget congue vel, lacinia sit.",
  jobDetails: [
    { label: "Gender", value: "Male" },
    { label: "Years of Experience", value: "4 Years" },
    { label: "Country", value: "Saudi Arabia" },
  ],
};

const OpportunityContent = ({ slug }: OpportunityContentProps) => {
  return (
    <div className="space-y-10 py-10">
      <section className="container px-6 xl:px-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Main content + Job Details */}
          <div className="flex-1 flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <OpportunityHeader
                image={staticOpportunity.image}
                companyName={staticOpportunity.companyName}
                category={staticOpportunity.category}

              />

              <OpportunityBadges badges={staticOpportunity.badges} />

              <OpportunityAbout content={staticOpportunity.about} />
            </div>

            <div className="w-full md:w-auto md:min-w-80 lg:min-w-96 shrink-0">
              <OpportunityJobDetails details={staticOpportunity.jobDetails} />
            </div>
          </div>

          {/* Right - Ad Banner (separate column) */}
          <div className="lg:w-91.75 shrink-0">
            <OpportunityAdBanner />
          </div>
        </div>
      </section>

      <section className="container-sm">
        <OpportunitySimilarJobs />
      </section>
    </div>
  );
};

export default OpportunityContent;
