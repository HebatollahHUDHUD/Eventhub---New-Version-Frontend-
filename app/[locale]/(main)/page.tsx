import { getData } from "@/lib/request-server";

const page = async () => {

  const data = await getData<any>({
    endpoint: "/home",
    config: {
      next: {
        cache: "no-cache",
        tags: ["home"],
        revalidate: 0,
      },
    }
  });


  return (
    <div>
      <h1>Page</h1>
      <p>{data.message}</p>
    </div>
  )
}

export default page