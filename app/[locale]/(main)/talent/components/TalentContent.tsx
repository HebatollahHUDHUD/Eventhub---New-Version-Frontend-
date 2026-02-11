import { getData } from '@/lib/request-server';

const TalentContent = async () => {
  const data = await getData<any>({
    endpoint: "/home",
    config: {
      next: {
        tags: ["talent"],
      },
    }
  });

  const talnt = data.status === "success" ? data?.result : null;



  return (
    <div>TalentContent</div>
  )
}

export default TalentContent